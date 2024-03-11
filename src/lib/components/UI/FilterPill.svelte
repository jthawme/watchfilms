<script>
	import { createEventDispatcher } from 'svelte';

	export let disabled = false;

	const dispatch = createEventDispatcher();

	/** @type {number[]} */
	export let selected = [];

	function onClear() {
		selected = [];
	}

	function onStart() {
		dispatch('start');
	}
</script>

<div class="pill-wrapper">
	<div class="pill">
		<div class="pill-left">
			<span class="accent">{selected.length} Selected</span>
			<button class="btn-reset light clear" on:click={onClear} />
		</div>

		<button {disabled} class:disabled class="pill-right btn-reset" on:click={onStart}>
			Find a film →
		</button>
	</div>
</div>

<style lang="scss">
	.pill-wrapper {
		position: fixed;

		left: 0;
		bottom: 0;

		width: 100%;

		z-index: 3;

		padding: 10px;

		@include tablet {
			position: sticky;

			bottom: var(--outer-padding);
			margin-top: 100px;
		}
	}

	.pill {
		border: 1px solid var(--color-accent);
		border-radius: 50px;

		display: grid;

		grid-template-columns: 1fr;

		background-color: var(--color-bg);

		isolation: isolate;
		overflow: hidden;

		@include tablet {
			position: absolute;

			left: 50%;
			bottom: 0;

			transform: translateX(-50%);

			border: 1px solid var(--color-accent);
			border-radius: 50px;

			width: max-content;

			display: grid;

			grid-template-columns: 180px 1fr;

			background-color: var(--color-bg);

			isolation: isolate;
			overflow: hidden;
		}
	}

	.pill-left {
		display: flex;

		flex-direction: column;

		border-bottom: 1px solid var(--color-accent);

		padding: 10px;

		justify-content: center;
		align-items: center;
		text-align: center;

		@include tablet {
			padding: 10px 20px 10px 25px;
			border-right: 1px solid var(--color-accent);
			border-bottom: none;
			align-items: flex-start;
			text-align: left;
		}
	}

	.clear {
		text-align: left;

		&:after {
			content: 'Click the names';
		}

		@include hover {
			&:after {
				content: 'Clear selected';
			}
		}
	}

	.pill-right {
		font-family: var(--font-family-body-alt);
		font-weight: var(--font-weight-body-alt);
		font-size: var(--font-size-large);

		padding: 10px 20px;

		transition: {
			duration: 0.15s;
			property: background-color, color;
		}

		&[disabled] {
			color: var(--color-light);
		}

		@include hover {
			color: var(--color-bg);
			background-color: var(--color-accent);
		}
	}
</style>
