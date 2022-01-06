<script context="module">
	export async function load({fetch}) {
    const res = await fetch('/api/random');
		const data = await res.json();
		return {
			status: 302,
			redirect: `/match/${data.slug}`
		};
	}
</script>
