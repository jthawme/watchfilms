<script>
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import Head from '$lib/components/Head.svelte';
	import { getPersistedValue, persistValue, timer } from '$lib/utils.js';

	let mount = false;

	beforeNavigate(() => {
		mount = false;
	});

	afterNavigate(() => {
		mount = true;
	});

	async function onLastWordEnd() {
		await timer(1000);

		const last = getPersistedValue('last', 0, (val) => parseInt(val));

		persistValue('last', Date.now().toString());

		if (Date.now() - last > 1000 * 60 * 60 * 24 * 14) {
			goto('/intro');
		} else {
			goto('/filter');
		}
	}
</script>

<Head title="" />

<div class="page" class:mount>
	<div class="row row-one">
		<div class="word">
			<span class="headline">Watch</span>
		</div>
	</div>
	<div class="row row-two">
		<div class="word">
			<span class="headline">Better</span>
		</div>
	</div>
	<div class="row row-three">
		<div class="word">
			<span class="headline" on:transitionend={onLastWordEnd}>Films</span>
		</div>
	</div>
</div>

<style lang="scss">
	.page {
		width: 100%;

		display: flex;

		flex-direction: column;

		padding: var(--outer-padding);
	}

	.row {
		display: flex;

		flex-grow: 1;

		text-transform: uppercase;
		font-size: Min(25vh, 20vw);

		&-one {
			justify-content: flex-start;
		}

		&-two {
			justify-content: flex-end;
			align-items: center;
		}

		&-three {
			justify-content: center;
			align-items: flex-end;
		}
	}

	.word {
		overflow: hidden;

		span {
			display: block;

			transform: translate3d(0, 100%, 0);

			transition: {
				duration: 0.75s;
				timing-function: cubic-bezier(0.77, 0, 0.18, 1);
				property: transform;
			}

			.mount & {
				transform: translate3d(0, 0, 0);
			}
		}
	}

	.row-one .word span {
		transition-delay: 0.5s;
	}
	.row-two .word span {
		transition-delay: 0.6s;
	}
	.row-three .word span {
		transition-delay: 0.7s;
	}
</style>
