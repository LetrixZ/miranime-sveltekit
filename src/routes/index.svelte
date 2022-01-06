<script context="module">
	export async function load({ url, params, fetch }) {
		const data = await fetch(`/api`);
		const items = await data.json();
		const jkRes = await fetch(`/api/jk/home`);
		let jkData = await jkRes.json();
		const recentEpisodes = jkData.recent_episodes.filter(
			(v, i, a) => a.findIndex((t) => t.slug === v.slug) === i
		);
		const recentAdded = jkData.new_additions;
		return {
			props: {
				items,
				recentEpisodes,
				recentAdded
			}
		};
	}
</script>

<script lang="ts">
	import { prefetch } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import Popup from '$lib/Popup.svelte';
	import Swiper from '$lib/components/Swiper.svelte';
	import type Anime from '$lib/models/Anime';
	import ModalOld from '$lib/components/ModalOld.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';

	export let items: Anime[];
	export let recentEpisodes: Anime[];
	export let recentAdded: Anime[];
	let page = 1;
	let max = 20;
	$: list = items.slice(max * (page - 1), max * page);

	let props;

	onMount(() => {
		window.onpopstate = function (event) {
			if (document.location.pathname === '/modal') {
				props = null;
			} else {
				const regex = /\/anime\/([\w-]+)/;
				if (regex.test(document.location.pathname)) {
					handlePrefetch(document.location.pathname);
				}
			}
		};

		return () => {
			window.onpopstate = null;
		};
	});

	function handleClick(e: CustomEvent) {
		const event = e.detail.event;
		event.preventDefault();
		const clickedHref = event.currentTarget.href;
		if (clickedHref === location.href) return;

		const pathname = clickedHref.replace(location.origin, '');
		history.pushState(null, '', pathname);
		handlePrefetch(pathname);
	}

	async function handlePrefetch(url) {
		const res = await prefetch(url);
		props = res.props.props_1.item;
	}

	function handleItemClick(e: CustomEvent) {
		const slug = e.detail.item;
		handlePrefetch('anime/' + slug);
	}
</script>

<svelte:head>
	<title>sinAnime</title>
</svelte:head>

<div class="mt-4">
	<Swiper list={recentEpisodes} title="Nuevos episodios" on:itemClick={handleClick} />
	<Swiper list={recentAdded} title="Recientemente agregados" on:itemClick={handleClick} />
	<Swiper {list} title="Aleatorio" on:itemClick={handleClick} />
</div>
{#if props}
	<ModalOld
		on:close={() => {
			props = null;
			history.pushState(null, '', '/');
		}}
	>
		<main class="flex flex-col justify-center items-center mt-4">
			<img class="w-[60%] rounded-sm" src={props.picture} alt={props.title} />
			<h2 class="my-2 text-2xl font-light">{props.title}</h2>
		</main>
	</ModalOld>
{/if}

<!-- {#if props}
	<button on:click={handleClose}>close</button>
	<Popup item={props} />
{/if} -->
