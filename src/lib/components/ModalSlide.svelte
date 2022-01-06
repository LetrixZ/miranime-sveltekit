<script lang="ts">
</script>

<main class="modal animate-bottom">
	<div class="content">Test</div>
</main>

<style lang="postcss">
	.modal {
		@apply w-screen h-screen absolute inset-0 z-10;
	}

	.content {
		@apply bg-red-500 h-full p-2;
	}

	.animate-bottom {
		animation: animatebottom 0.4s;
	}

	@keyframes animatebottom {
		from {
			bottom: 300px;
			opacity: 0;
		}

		to {
			bottom: 0;
			opacity: 1;
		}
	}
</style>
