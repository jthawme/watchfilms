<script>
	import { TYPE } from '$lib/constants.js';
	import { timer } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const STEP = {
		ONE: 'one',
		TWO: 'two',
		CHOICE: 'choice'
	};

	let step = STEP.ONE;
	let mounted = false;

	async function onStep() {
		if (step === STEP.ONE) {
			await timer(2000);
			step = STEP.TWO;
		} else if (step === STEP.TWO) {
			await timer(3000);
			step = STEP.CHOICE;
		}
	}

	onMount(() => {
		mounted = true;
	});
</script>

<div class="page">
	{#if mounted && step === STEP.ONE}
		<div in:fade={{ delay: 500 }} out:fade on:introend={onStep} class="explainer explainer-one">
			Set your preferences, find some films
		</div>
	{/if}

	{#if mounted && step === STEP.TWO}
		<div in:fade={{ delay: 500 }} out:fade on:introend={onStep} class="explainer explainer-two">
			3 spins, <em>No redos</em>
		</div>
	{/if}

	{#if mounted && step === STEP.CHOICE}
		<div in:fade={{ delay: 500 }} out:fade class="choice">
			<span class="choice-title">Choose by</span>

			<div class="choices">
				<a class="choices-item headline" href={`/filter?type=${TYPE.GENRE}`}>Genre</a>

				<span class="choices-line" />

				<a class="choices-item headline" href={`/filter?type=${TYPE.DIRECTOR}`}>Director</a>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.page {
		width: 100%;

		display: grid;

		align-items: center;
		justify-content: center;

		> * {
			grid-column: 1/2;
			grid-row: 1/2;
		}
	}

	.explainer {
		font-family: var(--font-family-body-alt);
		font-size: var(--font-size-medium);

		text-align: center;

		em {
			font-style: normal;

			border-bottom: 1px solid currentColor;
		}
	}

	.choice {
		width: 60vw;

		&-title {
			display: block;

			text-align: center;

			margin-bottom: 2em;
		}
	}

	.choices {
		display: grid;

		grid-template-columns: 1fr auto 1fr;

		gap: 10px;

		&-line {
			width: 1px;

			background-color: var(--color-x-light);
		}

		&-item {
			aspect-ratio: 1/1;

			display: flex;

			align-items: center;
			justify-content: center;

			text-decoration: none;

			font-size: clamp(var(--font-size-large), 6vw, var(--font-size-x-large));

			color: var(--color-text);

			border-radius: 20px;

			transition: {
				duration: 0.15s;
				property: background-color, color;
			}

			@include hover {
				background-color: var(--color-accent);
			}
		}
	}
</style>
