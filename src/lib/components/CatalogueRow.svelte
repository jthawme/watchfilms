<script>
	import MovieTiles from './UI/MovieTiles.svelte';
	import { store as Journey } from '$lib/store/journey.js';
	import { store as Messages } from '$lib/store/messages.js';
	import Pill from './UI/Pill.svelte';
	import { toSorted } from '$lib/utils';

	/** @type {string} */
	export let id;

	/** @type {string} */
	export let name;

	/** @type {Array<{id: number, backdrop: string, genre: string, original_title: string, title: string, release_date: string}>} */
	let films = [];
	let loading = false;

	let open = false;

	async function loadFilms() {
		loading = true;

		const data = await fetch('/.netlify/functions/person', {
			method: 'POST',
			headers: {
				accept: 'application/json'
			},
			body: JSON.stringify({
				id
			})
		}).then((resp) => resp.json());

		loading = false;

		films = data.films;
	}

	function toggle() {
		if (!open) {
			open = true;

			if (films.length === 0 && !loading) {
				loadFilms();
			}
		} else {
			open = false;
		}
	}

	async function onAdd({ detail: item }) {
		Messages.add(`You won't see this film in the suggestions`, {
			delay: 2000
		});
		await Journey.skipFilm(item);
	}

	async function onRemove({ detail: id }) {
		Messages.add(`Added this film back to suggestions`, {
			delay: 2000
		});
		await Journey.removeFilm({ id });
	}

	$: sortedFilms = toSorted(
		films.map((item) => ({ ...item, date: new Date(item.release_date) })),
		(a, b) => {
			return a.date.getTime() - b.date.getTime();
		}
	);
</script>

<div class="row">
	<div class="row-header">
		<div class="row-name headline">{name}</div>
		<div class="row-actions">
			<Pill on:click={toggle}>{open ? 'Collapse' : 'View films'}</Pill>
		</div>
	</div>

	{#if open}
		<div class="pool">
			{#if films.length === 0}
				Loading...
			{:else}
				<MovieTiles light small items={sortedFilms} on:add={onAdd} on:remove={onRemove} />
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.row {
		border-bottom: 1px solid var(--color-x-light);

		padding: 1em 0;

		&-header {
			display: grid;

			grid-template-columns: 1fr auto;
			align-items: center;

			padding: 1em 0;
		}

		&-name {
			font-size: var(--font-size-large);
		}
	}

	.pool {
		padding: 0 0 1em;
	}
</style>
