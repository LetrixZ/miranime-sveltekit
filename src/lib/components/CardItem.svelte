<script lang="ts">
	import type Anime from '$lib/models/Anime';

	import { createEventDispatcher } from 'svelte';
	export let item: Anime;

	const dispatch = createEventDispatcher();

	const handleClick = (event) => {
		dispatch('itemClick', {
			event
		});
	};
</script>

<a href="/anime/{item.slug}" on:click|preventDefault={handleClick} class="bg-red-500">
	<li
		class:square={item.episode}
		class=" cursor-pointer select-none w-full lg:w-[20vw] 2xl:w-[10vw] lg:h-[22rem] flex lg:flex-col lg:items-center lg:text-center px-2 gap-x-2 lg:scale-95 lg:hover:scale-100 lg:hover:bg-neutral-50 lg:hover:bg-opacity-10 rounded transition-all py-4"
	>
		<div class="flex-[1] ml-2 lg:ml-0 lg:h-[70%] img">
			<img class="rounded-sm lg:max-h-full lg:object-contain" alt={item.title} src={item.picture} />
		</div>
		<div class="flex-[2] lg:w-auto lg:py-2 lg:h-[30%] info">
			<h2>{item.title}</h2>
			{#if item.episode}
				<h3>Episodio {item.episode}</h3>
			{:else}
				<h3>{item.synonyms[0]}</h3>
				<h5>{item.type} | {item.status}</h5>
			{/if}
		</div>
	</li>
</a>

<style lang="postcss">
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
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	@media only screen and (min-width: 1024px) {
		h2 {
			-webkit-line-clamp: 2;
			line-clamp: 2;
		}
		h3 {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			line-clamp: 1;
			-webkit-box-orient: vertical;
		}
	}

	h3 {
		@apply font-light text-sm text-neutral-200;
	}

	h5 {
		@apply font-medium text-xs;
	}
	.square {
		@apply lg:w-[15vw] 2xl:w-[15vw] lg:h-[15vw] 2xl:h-[15vw] p-0; 
	}
	.square .img {
		@apply lg:m-0 flex w-full h-full;
	}
	.square .img img {
		@apply object-cover h-full w-full;
	}
	.square .info {
		@apply absolute 2xl:h-[35%] bg-black bg-opacity-95 bottom-0 inset-x-0 m-auto justify-center flex flex-col px-4;
	}
</style>
