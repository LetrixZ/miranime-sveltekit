<script lang="ts">
	import type Anime from '$lib/models/Anime';

	import Fa from 'svelte-fa/src/fa.svelte';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';

	export let list: Anime[];
	let width, ul;
	$: itemList = [null, ...list, null];
	let currentFocus = 1;
	let relScroll = 1;
	let isScrolling = false;
	let manual = false;

	const next = () => {
		if (currentFocus <= itemList.length - 3) {
			manual = true;
			currentFocus += 1;
		}
	};

	const prev = () => {
		if (currentFocus >= 2) {
			manual = true;
			currentFocus -= 1;
		}
	};

	$: {
		if (ul) {
			const scroll = (width / 2.5) * (currentFocus + 0.25 * (currentFocus - 1));
			ul.scroll({
				behavior: 'smooth',
				left: scroll
			});
		}
	}

	let scrollingTimer;

	$: {
		if (!isScrolling && ul && manual) {
			currentFocus = relScroll;
		}
	}

	const onScroll = (e) => {
		isScrolling = true;
		if (scrollingTimer) clearTimeout(scrollingTimer);
		relScroll = Math.round((e.target.scrollLeft / width) * 2);
		console.log((e.target.scrollLeft / width) * 2, itemList.length);

		scrollingTimer = setTimeout(() => {
			if (relScroll < 1) {
				const scroll = (width / 2.5) * (1 + 0.25 * (1 - 1));
				ul.scroll({
					behavior: 'smooth',
					left: scroll
				});
			} else if ((e.target.scrollLeft / width) * 2 >= itemList.length - 2) {
				const scroll = (width / 2.5) * (itemList.length - 2.5 + 0.25 * (itemList.length - 2.5 - 1));
				ul.scroll({
					behavior: 'smooth',
					left: scroll
				});
			}
			isScrolling = false;
		}, 50);
	};
</script>

<main class="relative">
	<ul
		class="flex overflow-x-scroll overflow-y-hidden h-[25rem] items-center"
		bind:this={ul}
		bind:clientWidth={width}
		on:scroll={onScroll}
		on:pointerdown={() => {
			manual = false;
		}}
	>
		{#each itemList as item, idx (idx)}
			<li
				class="flex flex-shrink-0 flex-col w-[50%] lg:w-1/3 h-[20rem] lg:h-80 px-2 2xl:px-32 transition-all"
				class:focused={idx == currentFocus && manual}
			>
				{#if item != null}
					<img class="object-contain h-4/5" src={item.picture} alt={item.title} />
					<h2 class="text-center mt-2">{item.title}</h2>
				{/if}
			</li>
		{/each}
	</ul>
	<div
		class="flex text-2xl font-extralight justify-center items-end md:items-center align-middle md:absolute inset-x-0  bottom-0 pointer-events-none"
	>
		<button
			class="bg-indigo-300 px-2 py-3 ml-4 mr-2 mt-2 rounded-lg w-[40%] md:my-0 md:mx-2 md:p-4 md:rounded  md:opacity-80 active:bg-indigo-400 transition-all pointer-events-auto active:scale-105"
			on:click={prev}
		>
			<Fa icon={faChevronLeft} />
		</button>
		<button
			class="bg-indigo-300 px-2 py-3 mr-4 ml-2 mt-2 rounded-lg w-[40%] md:my-0 md:mx-2 md:p-4 md:rounded md:opacity-80 active:bg-indigo-400 transition-all pointer-events-auto flex justify-end active:scale-105"
			on:click={next}
		>
			<Fa icon={faChevronRight} />
		</button>
	</div>
</main>

<style lang="postcss">
	.focused {
		@apply w-[80%] h-[22rem] lg:h-[28rem];
	}
	ul::-webkit-scrollbar {
		display: none;
	}
</style>
