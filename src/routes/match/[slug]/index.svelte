<script context="module">
	export async function load({ page, fetch }) {
		const data = await fetch(`/api/${page.params.slug}`);
		const item = await data.json();
		return {
			props: {
				item
			}
		};
	}
</script>

<script lang="ts">

	import NProgress from 'nprogress';
	export let item;
	let result;
	let focus = false;

	let itemOpts = { special: false, notes: null };

	const parseType = (it) => {
		switch (it) {
			case 'Anime':
				return 'TV';
			case 'Pelicula':
				return 'Movie';
			default:
				return it;
		}
	};

	const handleClick = (_match, idx) => {
		if (selected == idx) selected = -1;
		else selected = idx;
	};

	const save = async () => {
		NProgress.start();
		if (selected == -9) {
			const body = {
				slug: item.slug,
				match: result,
				special: itemOpts.special,
				notes: itemOpts.notes
			};
			const res = await fetch(`/api/${item.slug}`, { method: 'POST', body: JSON.stringify(body) });
			if (res.ok) {
				saved = selected;
			}
			selected = -1;
		} else if (selected != -1) {
			const selectedMatch = item.matches[selected];
			const body = {
				slug: item.slug,
				match: selectedMatch,
				special: itemOpts.special,
				notes: itemOpts.notes
			};
			const res = await fetch(`/api/${item.slug}`, { method: 'POST', body: JSON.stringify(body) });
			if (res.ok) {
				saved = selected;
			}
			selected = -1;
		} else {
			alert('No selection');
		}
		NProgress.done();
	};

	let selected = -1;
	let saved = -1;

	function compare(o1, o2) {
		return JSON.stringify(o1) === JSON.stringify(o2);
	}

	function myIndexOf(arr, o) {
		for (var i = 0; i < arr.length; i++) {
			if (compare(arr[i], o)) {
				return i;
			}
		}
		return -1;
	}

	import { goto } from '$app/navigation';
	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';

	let searchTerm = '';

	import { stats } from '../../../stores.js';

	const getStats = async () => {
		const res = await fetch('/api/stats');
		$stats = await res.json();
	};

	async function random() {
		goto('/random');
		selected = -1;
		saved = -1;
		result = null;
		itemOpts = { notes: null, special: false };
		searchTerm = '';
		await getStats();
	}

	onMount(async () => {
		if (item?.match) {
			saved = myIndexOf(item.matches, item.match);
			itemOpts = { notes: item.notes, special: item.special };
		}
	});

	function handleKey(e) {
		if (focus) return;
		if (e.key == 's') {
			save();
		}
		if (e.key == 'a') {
			const fullRatio = item.matches.filter((it) => it.ratio == 100);
			if (fullRatio.length > 0) {
				const idx = item.matches.indexOf(fullRatio[0]);
				selected = idx;
			}
		}
		if (e.key == 'r') {
			random();
		}
	}

	async function search() {
		result = null;
		const res = await fetch(`/api/mal/${searchTerm}`);
		const data = await res.json();
		result = data;
	}
</script>

<svelte:window on:keydown={handleKey} />

<main>
	{#if item}
		<div class="flex items-center flex-col mt-4 rounded">
			<div class="bg-neutral-800 flex flex-col items-center gap-y-2 p-4">
				<div class="flex justify-start gap-x-4 w-full">
					<img src={item.poster} class="rounded-sm max-h-[250px]" alt="Img cover" />
					<div class="flex flex-col">
						<h1 class="text-4xl">{item.title}</h1>
						<span class="text-neutral-300 font-medium"
							><a href="https://jkanime.net/{item.slug}" target="_blank">{item.slug}</a></span
						>
						<span>{parseType(item.type)} | {item.status}</span>
						<span>Episodes: {item.episodes}</span>
						<span class="w-96 synopsis">{item.synopsis}</span>
						<label class="flex gap-x-2 items-center">
							<input type="checkbox" bind:checked={itemOpts.special} /> Special entry
						</label>
						<label>
							<input
								class="my-2 p-1 rounded w-full text-black"
								bind:value={itemOpts.notes}
								on:focus={() => (focus = true)}
								on:blur={() => (focus = false)}
							/>
						</label>
					</div>
				</div>
				<div>
					<input class="text-lg p-1 rounded w-20 text-center" bind:value={searchTerm} />
					<button class="bg-neutral-600" on:click={search}>Search</button>
				</div>
				<div>
					<button class="p-2 bg-red-500 rounded font-medium mt-2" on:click={save}>Save</button>
					<button class="p-2 bg-indigo-600 rounded font-medium mt-2" on:click={random}
						>Random</button
					>
				</div>
				{#if result}
					<li
						class:saved={saved == -9}
						class:selected={selected == -9}
						class="flex flex-col w-[200px] p-2 text-center items-center hover:scale-105 rounded my-2"
						on:click={() => handleClick(result, -9)}
					>
						<span
							class="bg-red-500 rounded w-8 font-medium m-2"
							class:bg-green-500={result.ratio == 100}
						>
							{result.ratio}
						</span>
						{#each result.sources as source, idx (idx)}
							<span class="font-medium">{source.slug} | {source.source}</span>
						{/each}
						<span class="font-medium"
							>{result.episodes} episodes | {result.anime_season.season} - {result.anime_season
								.year}</span
						>
						<span class="font-medium flex flex-col items-center justify-center h-18"
							>{result.title}</span
						>

						<img src={result.picture} class="rounded-sm max-h-[240px]" alt="Img cover" />
					</li>
				{/if}
				<ul class="flex flex-wrap flex-row gap-4 mt-4">
					{#each item.matches as match, idx (`${match.title}_${idx}`)}
						<li
							class:saved={saved == idx}
							class:selected={selected == idx}
							class="flex flex-col w-[220px] p-2 text-center items-center hover:scale-105 rounded"
							on:click={() => handleClick(match, idx)}
						>
							<span
								class="bg-red-500 rounded w-8 font-medium m-2"
								class:bg-green-500={match.ratio == 100}
							>
								{match.ratio}
							</span>
							{#each match.sources as source, idx (idx)}
								<span class="font-medium">{source.slug} | {source.source}</span>
							{/each}
							<span class="font-medium"
								>{match.episodes} episodes | {match.anime_season.season} - {match.anime_season
									.year}</span
							>
							<span class="font-medium my-2 flex flex-col items-center justify-center h-16"
								>{match.title}</span
							>

							<img src={match.picture} class="rounded-sm max-h-[240px]" alt="Img cover" />
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</main>

<style lang="postcss">
	li {
		@apply cursor-pointer transition-all;
	}
	.saved {
		@apply bg-green-600;
	}
	.selected {
		@apply bg-indigo-600 scale-[1.07];
	}
	button {
		@apply p-2 rounded font-medium;
	}
	.synopsis {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		line-clamp: 4;
		-webkit-box-orient: vertical;
	}
</style>
