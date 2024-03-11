<script>
	/** @type {null | string} */
	export let to = null;

	$: el = to ? 'a' : 'button';

	$: props = to
		? {
				href: to
			}
		: {};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element this={el} {...props} class="pill btn-reset" on:click>
	<slot />
</svelte:element>

<style lang="scss">
	.pill {
		border: 1px solid var(--color-text);
		color: var(--color-text);

		background-color: var(--color-bg);

		border-radius: 1em;
		padding: 0.25em 0.9em;

		text-decoration: none;

		transition: {
			duration: 0.15s;
			property: background-color, color;
		}

		@include hover {
			background-color: var(--color-text);
			color: var(--color-bg);
		}
	}
</style>
