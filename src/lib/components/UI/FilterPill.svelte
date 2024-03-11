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
			<span>{selected.length} Selected</span>
			<button class="btn-reset clear" on:click={onClear} />
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

		@include large-mobile {
			position: sticky;

			bottom: var(--outer-padding);
			margin-top: 100px;
		}
	}

	.pill {
		display: grid;

		grid-template-columns: 1fr;

		isolation: isolate;
		overflow: hidden;
		border: 1px solid var(--color-accent);
		border-radius: 10px;
		background-color: var(--color-accent);

		@include large-mobile {
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

			border: 1px solid var(--color-accent);
			border-radius: 50px;

			background-color: var(--color-bg);
		}
	}

	.pill-left {
		display: flex;

		padding: 8px 10px 10px;

		align-items: center;
		text-align: center;

		justify-content: space-between;

		span {
			color: var(--color-bg);
		}

		button {
			color: var(--color-text);
		}

		@include large-mobile {
			flex-direction: column;
			justify-content: center;

			padding: 10px 20px 10px 25px;
			border-right: 1px solid var(--color-accent);
			border-bottom: none;
			align-items: flex-start;
			text-align: left;

			span {
				color: var(--color-accent);
			}

			button {
				color: var(--color-light);
			}
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

		border-radius: 10px;

		background-color: var(--color-bg);

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

		@include large-mobile {
			border-radius: 0;
		}
	}
</style>
