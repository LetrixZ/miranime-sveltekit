<script lang="ts">
	import type Anime from '$lib/models/Anime';
	import ListItem from '$lib/components/ListItem.svelte';

	export let list: Anime[];
</script>

{#if list}
	<ul class="flex flex-wrap gap-4 justify-center">
		{#each list as item, idx (idx)}
			<ListItem {item} />
		{/each}
	</ul>
{/if}
