<script lang="ts">
	import type Anime from '$lib/models/Anime';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

	export let item: Anime;

	onMount(async () => {
		if (!item) {
			const res = await fetch('/api/anime/mahoutsukai-no-yome');
			const data = await res.json();
			item = data;
		}
	});
</script>

{#if item}
	<div class="card group">
		<div class="img-container relative ">
			<img alt={item.title} src={item.picture} />
			{#if item.episode}
				<div
					class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 bg-opacity-50 bg-black justify-center items-center transition-all duration-75"
				>
					<div class="h-full w-full justify-center m-auto flex items-center text-4xl opacity-100">
						<Fa icon={faPlayCircle} />
					</div>
				</div>
			{/if}
			{#if item.episode}
				<div
					class="absolute inset-x-0 top-0 mx-auto text-center bg-black bg-opacity-50 group-hover:bg-opacity-0 w-full z-10 transition-all duration-75"
				>
					{#if item.episode === 1 && item.type === 'MOVIE' && item.uploadedEpisodes === 1}
						<h2>Película Completa</h2>
					{:else}
						<h2>Episodio {item.episode}</h2>
					{/if}
				</div>
			{/if}
		</div>
		<div class="info-container">
			<h1>{item.title}</h1>
			<h3>{item.synonyms[0]}</h3>
			<h5>{item.type} | {item.status}</h5>
		</div>
	</div>
{/if}

<style lang="postcss">
	.card {
		@apply cursor-pointer inline-flex flex-col items-center gap-x-2 rounded-sm w-[12rem] h-[18rem] md:h-[22rem];
	}
	.img-container {
		@apply h-[75%] md:h-[65%];
	}
	.info-container {
		@apply h-[25%] md:h-[35%] py-1 px-2 text-center flex flex-col items-center;
	}
	h2 {
		@apply my-2 font-medium;
	}
	.info-container h1 {
		@apply font-normal;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.info-container h3 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		@apply text-xs font-normal text-neutral-200 hidden md:block;
	}
	.info-container h5 {
		@apply text-xs font-semibold text-neutral-100;
	}
	img {
		@apply rounded-sm h-full object-center object-cover;
	}
</style>
