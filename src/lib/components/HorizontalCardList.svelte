<script lang="ts">
	import type Anime from '$lib/models/Anime';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { Swipe, SwipeItem } from 'svelte-swipe';

	const swipeConfig = {
		autoplay: false,
		delay: 2000,
		showIndicators: true,
		transitionDuration: 1000,
		defaultIndex: 0
	};

	export let list: Anime[];
	let ul,
		width,
		current = 0;
	$: if (ul) {
		// ul.scrollLeft = 375 * 16;
	}

	let SwipeComp;

	const next = () => {
		// SwipeComp.nextItem();
		current++;
	};
	const prev = () => {
		// SwipeComp.prevItem();
		current--;
	};

	$: {
		ul?.scroll({ behavior: 'smooth', left: width * current });
	}

	let swipe_holder_height = 0;

	function heightChanged({ detail }) {
		swipe_holder_height = detail.height;
	}
</script>

<main>
	<ul
		bind:this={ul}
		bind:clientWidth={width}
	>
		{#each list as item, i}
			<li class="w-full flex px-2 gap-x-2">
				<div class="flex-[1] ml-2">
					<img class="rounded-sm" alt={item.title} src={item.picture} />
				</div>
				<div class="flex-[2]">
					<h2>{item.title}</h2>
					<h3>{item.synonyms[0]}</h3>
					<h5>{item.type} | {item.status}</h5>
				</div>
			</li>
		{/each}
	</ul>
	{#if false}
		<div style="height:{swipe_holder_height}px">
			<Swipe bind:this={SwipeComp}>
				{#each list as item, i}
					<SwipeItem
						active={current == i}
						allow_dynamic_height={true}
						on:swipe_item_height_change={heightChanged}
					>
						<li class="flex px-2 gap-x-2">
							<div class="flex-[1] ml-2">
								<img
									class="rounded-sm h-full object-top object-contain"
									alt={item.title}
									src={item.picture}
								/>
							</div>
							<div class="flex-[2]">
								<h2>{item.title}</h2>
								<h3>{item.synonyms[0]}</h3>
								<h5>{item.type} | {item.status}</h5>
							</div>
						</li>
					</SwipeItem>
				{/each}
			</Swipe>
		</div>
	{/if}
	<div
		class="flex text-2xl font-extralight justify-between items-end md:mb-12 md:items-center align-middle md:absolute inset-0 pointer-events-none"
	>
		<button
			class="bg-indigo-300 px-2 py-2 ml-4 mr-2 mt-2 rounded-lg w-[30%] md:my-0 md:mx-2 md:p-4 md:w-auto md:rounded  md:opacity-80 active:bg-indigo-400 transition-all pointer-events-auto active:scale-105"
			on:click={prev}
		>
			<Fa icon={faChevronLeft} />
		</button>
		<button
			class="bg-indigo-300 px-2 py-2 mr-4 ml-2 mt-2 rounded-lg w-[30%] md:my-0 md:mx-2 md:p-4 md:w-auto md:rounded md:opacity-80 active:bg-indigo-400 transition-all pointer-events-auto flex justify-end active:scale-105"
			on:click={next}
		>
			<Fa icon={faChevronRight} />
		</button>
	</div>
</main>

<style lang="postcss">
	ul {
		@apply flex overflow-x-scroll overflow-y-hidden;
	}
	li {
		@apply flex-shrink-0;
	}
	h2 {
		@apply text-xl;
	}

	h2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3; /* number of lines to show */
		line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	h3 {
		@apply font-light text-sm text-neutral-200;
	}

	h5 {
		@apply font-medium text-xs;
	}
</style>
