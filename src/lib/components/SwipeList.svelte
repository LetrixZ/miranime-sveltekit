<script lang="ts">
	import type Anime from '$lib/models/Anime';
	import { onMount } from 'svelte';
	import CardItem from './CardItem.svelte';

	export let list: Anime[];
	let current = 0;

	function detectSwipe(id, func, deltaMin = 90) {
		const swipe_det = {
			sX: 0,
			sY: 0,
			eX: 0,
			eY: 0
		};
		// Directions enumeration
		const directions = Object.freeze({
			UP: 'up',
			DOWN: 'down',
			RIGHT: 'right',
			LEFT: 'left'
		});
		let direction = null;
		const el = document.getElementById(id);
		el.addEventListener(
			'touchstart',
			function (e) {
				const t = e.touches[0];
				swipe_det.sX = t.screenX;
				swipe_det.sY = t.screenY;
			},
			false
		);
		el.addEventListener(
			'touchmove',
			function (e) {
				// Prevent default will stop user from scrolling, use with care
				// e.preventDefault();
				const t = e.touches[0];
				swipe_det.eX = t.screenX;
				swipe_det.eY = t.screenY;
			},
			false
		);
		el.addEventListener(
			'touchend',
			function (e) {
				const deltaX = swipe_det.eX - swipe_det.sX;
				const deltaY = swipe_det.eY - swipe_det.sY;
				// Min swipe distance, you could use absolute value rather
				// than square. It just felt better for personnal use
				if (deltaX ** 2 + deltaY ** 2 < deltaMin ** 2) return;
				// horizontal
				if (deltaY === 0 || Math.abs(deltaX / deltaY) > 1)
					direction = deltaX > 0 ? directions.RIGHT : directions.LEFT;
				// vertical
				else direction = deltaY > 0 ? directions.UP : directions.DOWN;

				if (direction && typeof func === 'function') func(el, direction);

				direction = null;
			},
			false
		);
	}
	onMount(() =>
		detectSwipe('swipeme', (el, dir) => {
			switch (dir) {
				case 'left':
					next();
					break;
				case 'right':
					prev();
					break;
			}
		})
	);
	function next() {
		current++;
		console.log('next', current);
	}
	function prev() {
    if (current > 0) current--;
    console.log('prev', current);
	}

	let ul, width;

	$: {
		if (ul) {
      console.log(ul, width);      
			ul.scroll({ behavior: 'smooth', left: width * current });
		}
	}
</script>

<ul id="swipeme" class="flex overflow-x-scroll" bind:this={ul} bind:clientWidth={width}>
	{#each list as item}
		<CardItem {item} />
	{/each}
</ul>

<style>
	#swipeme {
		background-color: orange;
		color: black;
		text-align: center;
		padding-top: 20%;
		padding-bottom: 20%;
	}
</style>
