<script lang="ts">
	import type Anime from '$lib/models/Anime';

	import Fa from 'svelte-fa/src/fa.svelte';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';

	export let list: Anime[];
	let width, ul;
	$: itemList = [null, ...list, null];
	let currentFocus = 1;
	let relScroll = 0;
	let isScrolling = false;

	const next = () => {
		if (currentFocus <= itemList.length - 3) {
			currentFocus += 1;
		}
	};

	const prev = () => {
		if (currentFocus >= 2) {
			currentFocus -= 1;
		}
	};

	$: {
		if (ul) ul.scroll({ behavior: 'smooth', left: (width / 3) * (currentFocus - 1) });
	}

	let scrollingTimer;

	$: {
		if (!isScrolling && ul) {
			currentFocus = relScroll + 1;
			// ul.scroll({ behavior: 'smooth', left: (width / 3) * relScroll });
		}
	}

	const onScroll = (e) => {
		isScrolling = true;
		if (scrollingTimer) clearTimeout(scrollingTimer);
		relScroll = Math.round((e.target.scrollLeft / width) * 3);
		scrollingTimer = setTimeout(() => {
			isScrolling = false;
		}, 50);
	};
</script>

<main class="relative">
	<ul
		class="flex overflow-x-scroll overflow-y-hidden h-[30rem]"
		bind:this={ul}
		bind:clientWidth={width}
		on:scroll={onScroll}
	>
		{#each itemList as item, idx (idx)}
			<li
				class="flex flex-shrink-0 flex-col w-1/3 h-80 2xl:px-32 transition-all"
				class:focused={idx == currentFocus}
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
		@apply lg:h-[28rem];
	}
	ul::-webkit-scrollbar {
		display: none;
	}
</style>
