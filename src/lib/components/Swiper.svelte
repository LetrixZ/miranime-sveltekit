<script lang="ts">
	import type Anime from '$lib/models/Anime';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import 'swiper/css';
	import { onMount } from 'svelte';
	import ItemCard from './ItemCard.svelte';
	import 'swiper/css/free-mode';
	import 'swiper/css/pagination';
	import 'swiper/css/navigation';
	import 'swiper/css/effect-fade';

	import SwiperCore, { FreeMode, Navigation, Thumbs, Mousewheel } from 'swiper';

	SwiperCore.use([FreeMode, Navigation, Thumbs, Mousewheel]);

	export let list: Anime[];
	export let title = null;
	let showList = [];
	let large = false;
	if (list.length >= 25) {
		showList = list.slice(0, 24);
		large = true;
	} else {
		showList = list;
	}
	let swiper;
	let showButtons = false;

	onMount(() => {
		swiper = swiper.swiper();
	});

	let thumbsSwiper = null;
	const setThumbsSwiper = (e) => {
		const [swiper] = e.detail;
		// set Thumbs swiper instance
		setTimeout(() => {
			thumbsSwiper = swiper;
		});
	};
</script>

<div class="relative">
	{#if title}
		<div class="list-title inline-flex gap-x-2 items-end">
			<h1>{title}</h1>
			<div class="inline-flex items-center gap-x-2 cursor-pointer">
				<span class="font-medium">Ver mas</span>
				<Fa class="text-lg" icon={faChevronRight} />
			</div>
		</div>
	{/if}
	<div class="mt-4">
		<Swiper
			slidesPerView={1}
			bind:this={swiper}
			grabCursor={true}
			mousewheel={true}
			freeMode={{ enabled: true, sticky: true }}
			navigation={{ prevEl: '.prev-b', nextEl: '.next-b' }}
			thumbs={{ swiper: thumbsSwiper }}
			breakpoints={{
				325: {
					slidesPerView: 2
				},
				475: {
					slidesPerView: 3
				},
				768: {
					slidesPerView: 4
				},
				1024: {
					slidesPerView: 5
				},
				1280: {
					slidesPerView: 6
				},
				1536: {
					slidesPerView: 8
				},
				1920: {
					slidesPerView: 10
				}
			}}
		>
			{#each showList as item, idx (idx)}
				<SwiperSlide>
					<ItemCard {item} on:itemClick />
				</SwiperSlide>
			{/each}
			<!-- {#if large}
				<SwiperSlide>
					<div class="flex ml-2 h-[16rem] cursor-pointer group items-center">
						<div
							class="group-hover:bg-black items-center gap-x-1 py-2 px-2 text-2xl group-hover:bg-opacity-100 transition-all rounded-lg flex align-middle justify-center text-center uppercase"
						>
							<Fa icon={faChevronRight} />Ver todo<Fa icon={faChevronLeft} />
						</div>
					</div>
				</SwiperSlide>
			{/if} -->
		</Swiper>
	</div>
	{#if false}
		<div>
			<Swiper
				on:swiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				class="mySwiper"
			>
				{#each list as item, idx (idx)}
					<SwiperSlide>
						<div class="h-[2rem]">
							<img
								src={item.picture}
								class="h-full w-full object-cover rounded-sm brightness-50"
								alt={item.title}
							/>
						</div>
					</SwiperSlide>
				{/each}
			</Swiper>
		</div>
	{/if}
	{#if showButtons}
		<div
			class="z-10 flex text-2xl font-extralight justify-between items-end md:mb-12 md:items-center align-middle md:absolute inset-0 pointer-events-none"
		>
			<button class="prev-b ml-4 mr-2  active:scale-105">
				<Fa icon={faChevronLeft} />
			</button>
			<button class="next-b  mr-4 ml-2 flex justify-end active:scale-105">
				<Fa icon={faChevronRight} />
			</button>
		</div>
	{/if}
</div>

<style lang="postcss">
	button {
		@apply disabled:opacity-20 bg-indigo-300 px-2 py-2 md:my-0 md:mx-2 md:py-4 md:w-auto md:rounded md:opacity-95 active:bg-indigo-400 transition-all pointer-events-auto mt-2 rounded-lg w-[30%];
	}
	.list-title {
		@apply py-1 px-3;
	}
	.list-title h1 {
		@apply text-xl font-light;
	}
</style>
