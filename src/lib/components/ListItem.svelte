<script lang="ts">
	import type Anime from '$lib/models/Anime';

	export let item: Anime;
</script>

<li class="flex flex-shrink-0 flex-col justify-center items-center w-[250px] h-[340px] hover:scale-105 p-2">
	<div class="flex items-center justify-center h-[80%]">
		<img class="rounded-sm object-contain max-h-full" src={item.picture} alt={item.title} />
	</div>
	<div class="flex items-center justify-center w-full h-[20%]">
		<h2>{item.title}</h2>
	</div>
</li>

<!-- 
  <li
	class="w-[250px] h-[420px] flex flex-col justify-center items-center hover:scale-105 transition-all cursor-pointer"
>
	<div class="p-4 h-[340px] flex items-center justify-center">
		<img class="h-full object-contain rounded-sm" src={item.picture} alt={item.title} />
	</div>
	<div class="flex items-center justify-center h-[60px]">
		<h2>{item.title}</h2>
	</div>
	 <div class="h-[20px] flex flex-row justify-center items-center gap-x-2">
  {#if item.match.sources.filter((it) => it.source == 'MAL').length > 0}
    <a href="https://myanimelist.net/anime/{item.match.sources.filter((it) => it.source == 'MAL')[0].slug}" target="_blank">
      <img class="w-6" src="/assets/myanimelist_icon.svg" alt="MyAnimeList" />
    </a>
  {/if}
  {#if item.match.sources.filter((it) => it.source == 'AL').length > 0}
    <a href="https://anilist.co/anime/{item.match.sources.filter((it) => it.source == 'AL')[0].slug}" target="_blank">
      <img class="w-6" src="/assets/anilist_icon.svg" alt="AniList" />
    </a>
  {/if}
</div>
</li>
 -->
<style lang="postcss">
	li {
		@apply flex flex-col justify-center items-center lg:hover:scale-105 transition-all cursor-pointer;
	}
	h2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* number of lines to show */
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	h2 {
		@apply text-center;
	}
</style>
