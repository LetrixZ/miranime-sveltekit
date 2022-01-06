<script lang="ts">
	import type Anime from '$lib/models/Anime';
	import { Swipe, SwipeItem } from 'svelte-swipe';
	import CardItem from './CardItem.svelte';

	const swipeConfig = {
		autoplay: false,
		delay: 2000,
		showIndicators: true,
		transitionDuration: 1000,
		defaultIndex: 0
	};

	export let list: Anime[];
</script>

<div class="swipe-holder">
	<Swipe {...swipeConfig}>
		{#each list as item}
			<SwipeItem>
				<CardItem {item} />
			</SwipeItem>
		{/each}
	</Swipe>
</div>

<style lang="postcss">
	.swipe-holder {
		@apply h-[20rem];
	}
</style>
