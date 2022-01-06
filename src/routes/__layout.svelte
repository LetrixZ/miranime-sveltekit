<script>
	import { navigating } from '$app/stores';

	import '../app.css';
	import { stats } from '../stores.js';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16
	});

	$: {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	}
</script>

<nav class="bg-neutral-800 text-white p-1">
	{#if $stats}
		<span class="font-semibold">Matched: {$stats.matched}</span>
		<span>Remaining: {$stats.remaining}</span>
		<span>Total: {$stats.total}</span>
	{/if}
</nav>
<slot />
