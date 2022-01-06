<script>
	export let item = {};
</script>

{#if item}
	<pre>
		{JSON.stringify(item, null, 2)}
	</pre>
{/if}
