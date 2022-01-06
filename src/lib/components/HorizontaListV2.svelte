<script lang="ts">
	import type Anime from '$lib/models/Anime';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

	export let list: Anime[];

	let width, ul;
	let scrollPosition = 0;

	// $: console.log(scrollPosition);

	let scrollTimer = null;
	const onScroll = (e) => {
		if (width < 1024) scrollPosition = Math.round((e.target.scrollLeft / width) * 4) / 2;
		else scrollPosition = Math.round((e.target.scrollLeft / width) * 8) / 4;
		if (scrollTimer) clearTimeout(scrollTimer);
		scrollTimer = setTimeout(() => {
			// ul.scroll({ left: (width / 2) * scrollPosition, behavior: 'smooth' });
		}, 150);
	};

	const next = () => {
		const scroll = (width / 2) * (scrollPosition + 1);
		ul.scroll({ left: scroll, behavior: 'smooth' });
	};

	const prev = () => {
		const scroll = -width + (width / 2) * (scrollPosition + 1);
		ul.scroll({ left: scroll, behavior: 'smooth' });
	};

	const keyDown = (e) => {
		if (e.key == 'ArrowRight') {
			next();
		}
		if (e.key == 'ArrowLeft') {
			prev();
		}
	};
</script>

<svelte:window on:keyup={keyDown} />

<div class="relative">
	<!-- {scrollPosition} -->
	<ul bind:clientWidth={width} on:scroll={onScroll} bind:this={ul}>
		{#each list as item, idx (idx)}
			<li class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-[12.5%] 3xl:w-[15%] ">
				<div class="flex items-center justify-center h-[80%]">
					<img class="rounded-sm object-contain max-h-full" src={item.picture} alt={item.title} />
				</div>
				<div class="flex items-center justify-center w-full h-[20%]">
					<h2 class="text-center text-lg font-light font-sans">{item.title}</h2>
				</div>
			</li>
		{/each}
	</ul>
	<div
		class="flex text-2xl font-extralight justify-between items-end md:mb-12 md:items-center align-middle md:absolute inset-0 pointer-events-none"
	>
		<button
			class="bg-indigo-300 px-2 py-3 ml-4 mr-2 mt-2 rounded-lg w-[40%] md:my-0 md:mx-2 md:p-4 md:w-auto md:rounded  md:opacity-80 active:bg-indigo-400 transition-all pointer-events-auto active:scale-105"
			on:click={prev}
		>
			<Fa icon={faChevronLeft} />
		</button>
		<button
			class="bg-indigo-300 px-2 py-3 mr-4 ml-2 mt-2 rounded-lg w-[40%] md:my-0 md:mx-2 md:p-4 md:w-auto md:rounded md:opacity-80 active:bg-indigo-400 transition-all pointer-events-auto flex justify-end active:scale-105"
			on:click={next}
		>
			<Fa icon={faChevronRight} />
		</button>
	</div>
</div>

<style lang="postcss">
	ul {
		@apply flex overflow-x-scroll overflow-y-hidden;
	}
	li {
		@apply flex flex-shrink-0 flex-col justify-center items-center p-4;
	}
	h2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* number of lines to show */
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	ul::-webkit-scrollbar {
		display: none;
	}
</style>
