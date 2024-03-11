<script>
	import { page } from '$app/stores';
	import Pill from '$lib/components/UI/Pill.svelte';
</script>

<div class="page">
	<h1 class="headline headline-top">{$page.error.message}</h1>

	<img src="/error.webp" alt="" />

	<Pill to="/">Find a film →</Pill>

	<h1 class="headline headline-bottom">{$page.error.message}</h1>
</div>

<style lang="scss">
	.page {
		position: relative;

		width: 100%;
		height: 100dvh;

		overflow: hidden;

		display: flex;

		align-items: center;
		justify-content: center;

		padding: var(--inner-padding);

		flex-direction: column;

		gap: 10px;
	}

	.headline {
		position: absolute;

		left: 50%;

		display: block;

		line-height: 1;

		font-size: 8vw;

		text-transform: uppercase;

		margin: 0;

		text-align: center;

		&-top {
			top: 0;
			transform: translate3d(-50%, -45%, 0);
		}

		&-bottom {
			bottom: 0;
			transform: translate3d(-50%, 45%, 0);
		}
	}
</style>
