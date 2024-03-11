<script>
	import { registerExits } from '$lib/utils.js';
	import { createEventDispatcher } from 'svelte';

	export let show = false;

	const dispatch = createEventDispatcher();

	/** @type {null | (() => void)}*/
	let unlisten = null;

	let mount = false;

	$: if (show) {
		mount = true;
		unlisten = registerExits(() => {
			dispatch('close');
		});
	} else if (unlisten) {
		unlisten();
		unlisten = null;
	}

	function onTransitionEnd() {
		if (!show) {
			mount = false;
		}
	}
</script>

<div class="overlay" class:show on:transitionend={onTransitionEnd}>
	{#if mount}
		<slot />
	{/if}
</div>

<style lang="scss">
	.overlay {
		position: absolute;

		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		background-color: var(--color-bg-opacity);

		backdrop-filter: blur(10px);

		z-index: 10;

		overflow: auto;

		transition: {
			duration: 0.25s;
			property: opacity, visibility;
		}

		display: flex;

		visibility: hidden;
		opacity: 0;

		&.show {
			opacity: 1;
			visibility: visible;
		}
	}
</style>
