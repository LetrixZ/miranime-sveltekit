<script context="module">
	export async function load({ url, params, fetch }) {
		const res = await fetch(`/api/anime/${params.slug}`);
		const item = await res.json();
		if (res.ok)
			return {
				props: {
					item
				}
			};
		return {
			props: {
				item: null
			}
		};
	}
</script>

<script lang="ts">
	import type Anime from '$lib/models/Anime';
	export let item: Anime;
</script>

<main class="flex flex-col justify-center items-center mt-4">
	<img class="w-[60%] rounded-sm" src={item.picture} alt={item.title} />
	<h2 class="my-2 text-2xl font-light">{item.title}</h2>
</main>
