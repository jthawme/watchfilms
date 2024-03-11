<script>
	import { fade } from 'svelte/transition';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	/** @type {string} */
	export let id;

	/** @type {string} */
	export let text;

	/** @type {string} */
	export let type = 'standard';

	/** @type {number | null} */
	export let delay = null;

	/** @type {(() => void) | null} */
	export let action = null;

	$: tag = !!action ? 'button' : 'span';

	/** @type {ReturnType<setTimeout>} */
	let timer;

	const dispatch = createEventDispatcher();

	/**
	 * @param {number} time
	 */
	function setupTimer(time) {
		timer = setTimeout(() => {
			dispatch('remove', id);
		}, time);
	}

	onMount(() => {
		if (delay) {
			setupTimer(delay);
		}

		return () => clearTimeout(timer);
	});

	function onClick() {
		if (action) {
			action();
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element this={tag} in:fade out:fade class={`item btn-reset std ${type}`} on:click={onClick}>
	{text}
</svelte:element>

<style>
	.item {
		padding: 10px;

		background-color: var(--color-accent);

		text-align: center;

		color: var(--color-bg);

		width: 100%;
		display: block;
	}
</style>
