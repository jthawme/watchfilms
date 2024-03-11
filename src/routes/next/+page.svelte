<script>
	import { goto } from '$app/navigation';
	import Head from '$lib/components/Head.svelte';
	import { FILMS_LENGTH } from '$lib/constants.js';
	import { store as Journey } from '$lib/store/journey.js';
	import { store as Messages } from '$lib/store/messages.js';
	import { pageTitle, timer } from '$lib/utils.js';
	import { onMount } from 'svelte';

	let mounted = false;

	async function getFilm() {
		const { film } = await fetch('/.netlify/functions/random', {
			method: 'POST',
			headers: {
				accept: 'application/json'
			},
			body: JSON.stringify({
				genres: $Journey.genres,
				people: $Journey.people,
				avoid: [...$Journey.avoid.map((item) => item.id), ...$Journey.films.map((item) => item.id)]
			})
		}).then((resp) => resp.json());
		mounted = true;

		await timer(1500);

		if (film.count === 0) {
			if ($Journey.films.length === 0) {
				Messages.add("No films in these categories - you've seen them all", {
					delay: 2000
				});

				goto(`/filter`, {
					replaceState: true
				});
			} else {
				Messages.add('No more films in these categories', {
					delay: 2000
				});

				goto(`/results`, {
					replaceState: true
				});
			}
		} else {
			goto(`/film/${film.id}`, {
				replaceState: true
			});
		}
	}

	onMount(() => {
		if (!$Journey.started) {
			goto('/');
			return;
		}

		if ($Journey.films.length >= FILMS_LENGTH) {
			goto('/results');
		} else {
			getFilm();
		}
	});
</script>

<svelte:head>
	<title>{pageTitle('')}</title>
</svelte:head>

<div class="page" class:mounted>
	<div class="numbers">
		{#each { length: FILMS_LENGTH } as num, idx}
			<span
				class="number"
				class:past={mounted && idx < $Journey.films.length - 1}
				class:current={mounted && idx === $Journey.films.length - 1}
			>
				{idx + 1}
			</span>
		{/each}
	</div>
</div>

<style lang="scss">
	.page {
		width: 100%;

		display: flex;

		align-items: center;
		justify-content: center;
	}

	.numbers {
		display: flex;

		gap: 1em;

		opacity: 0;

		transition: {
			property: opacity;
			duration: 0.25s;
		}

		.mounted & {
			opacity: 1;
		}
	}

	.number {
		position: relative;

		font-size: var(--font-size-large);
		font-family: var(--font-family-body-alt);
		font-weight: var(--font-weight-body-alt);

		&:after {
			position: absolute;

			top: 50%;
			left: 50%;

			transform: translate3d(-50%, -50%, 0) rotate(45deg) scaleY(0);

			height: 110%;
			width: 1px;

			background-color: var(--color-accent);

			content: '';
		}

		&.past:after,
		&.current:after {
			transform: translate3d(-50%, -50%, 0) rotate(45deg) scaleY(1);
		}

		&.current:after {
			transition: {
				property: transform;
				delay: 0.5s;
				duration: 0.5s;
			}
		}
	}
</style>
