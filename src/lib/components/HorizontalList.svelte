<script lang="ts">
	import type Anime from '$lib/models/Anime';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

	export let list: Anime[];

	let ul;
	let width;
	let showItems = 2;
	let page = 1.0;
	let relScroll = 1;
	let scrolling = false;
	$: maxPage = Math.ceil(list.length / showItems);
	let showPage = 1;

	$: {
		if (ul) {
			if (!scrolling) {
				const scroll = width * (page - 1);
				ul.scroll({ left: scroll, behavior: 'smooth' });
			} else page = Math.round(relScroll * showItems) / showItems;
		}
	}

	let scrollTimer = null;

	const onScroll = (e) => {
		scrolling = true;
		relScroll = ((ul.scrollLeft / width) * maxPage) / Math.ceil(list.length / showItems) + 1;
		if (scrollTimer) clearTimeout(scrollTimer);
		scrollTimer = setTimeout(() => {
			scrolling = false;
		}, 150);
	};

	$: showPage = Math.round(relScroll);

	const scrollTo = (newPage) => {
		page = newPage;
		// ul.scroll({ left: width * (page - 1), behavior: 'smooth' });
	};

	$: {
		if (width >= 1536) {
			showItems = 10;
		} else if (width >= 1280) {
			showItems = 5;
		} else if (width >= 768) {
			showItems = 4;
		} else {
			showItems = 4;
		}
	}
</script>

{#if list}
	<div class="relative mb-4">
		<ul
			class="flex overflow-x-scroll overflow-y-hidden transition-all duration-200"
			bind:this={ul}
			bind:clientWidth={width}
			on:scroll={onScroll}
		>
			{#each list as item, idx (idx)}
				<li
					class="flex flex-shrink-0 flex-col justify-center items-center w-[50%] md:w-[25%] xl:w-[20%] 2xl:w-[10%] h-[340px] p-2"
				>
					<div class="flex items-center justify-center h-[80%]">
						<img class="rounded-sm object-contain max-h-full" src={item.picture} alt={item.title} />
					</div>
					<div class="flex items-center justify-center w-full h-[20%]">
						<h2 class="text-center">{item.title}</h2>
					</div>
				</li>
			{/each}
		</ul>
		<div
			class="flex text-2xl font-extralight justify-between items-end md:mb-12 md:items-center align-middle md:absolute inset-0 pointer-events-none"
		>
			<button
				class="bg-indigo-300 px-2 py-3 ml-4 mr-2 mt-2 rounded-lg w-[40%] md:my-0 md:mx-2 md:p-4 md:w-auto md:rounded  md:opacity-80 hover:bg-indigo-400 transition-all pointer-events-auto"
				disabled={page == 1}
				on:click={() => {
					scrollTo(Math.ceil(page) - 1);
				}}
			>
				<Fa icon={faChevronLeft} />
			</button>
			<!-- {showPage} -->
			<button
				class="bg-indigo-300 px-2 py-3 mr-4 ml-2 mt-2 rounded-lg w-[40%] md:my-0 md:mx-2 md:p-4 md:w-auto md:rounded md:opacity-80 hover:bg-indigo-400 transition-all pointer-events-auto flex justify-end"
				disabled={page >= maxPage}
				on:click={() => {
					scrollTo(Math.floor(page) + 1);
				}}
			>
				<Fa icon={faChevronRight} />
			</button>
		</div>
	</div>
{/if}

<style lang="postcss">
	html {
		scroll-behavior: smooth;
	}
	ul::-webkit-scrollbar {
		display: none;
	}
	button:disabled {
		@apply bg-neutral-300;
	}
</style>
