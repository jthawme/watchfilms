<script>
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Head from '$lib/components/Head.svelte';
	import ButtonPool from '$lib/components/UI/ButtonPool.svelte';
	import FilterPill from '$lib/components/UI/FilterPill.svelte';
	import { TYPE, TYPE_LABEL } from '$lib/constants.js';
	import { store as Journey } from '$lib/store/journey.js';
	import { getPersistedValue, persistValue, validateType } from '$lib/utils.js';
	import { onMount } from 'svelte';

	export let data;

	let searchValue = '';

	/** @type {number[]} */
	let selectedIds = [];

	let currentType = data.type;

	/** @type {null | number[]}*/
	let lastGenres = null;

	/** @type {null | number[]}*/
	let lastPeople = null;

	function onSearch() {
		return;
	}

	function toggleType() {
		if (currentType === TYPE.GENRE) {
			currentType = TYPE.DIRECTOR;
		} else if (currentType === TYPE.DIRECTOR) {
			currentType = TYPE.GENRE;
		}

		selectedIds = [];
		searchValue = '';
	}

	/**
	 *
	 * @param {string} type
	 * @param {string} filter
	 */
	function filterItems(type, filter) {
		const items = (() => {
			switch (type) {
				case TYPE.DIRECTOR:
					return data.people;
				case TYPE.GENRE:
				default:
					return data.genres;
			}
		})();

		if (filter) {
			return items.filter((item) => item.text.toLowerCase().includes(filter.toLowerCase()));
		}

		return items;
	}

	/**
	 *
	 * @param {Array<{id: number, text: string}>} items
	 * @param {number[]} ids
	 */
	function filterItemsByIds(items, ids) {
		return items.filter((item) => ids.includes(item.id));
	}

	async function onStart() {
		const data = {
			genres: currentType === TYPE.DIRECTOR ? [] : [...selectedIds],
			people: currentType === TYPE.DIRECTOR ? [...selectedIds] : []
		};

		persistValue('type', currentType);
		await Journey.begin(data.genres, data.people);

		goto(`/next`);
	}

	function getLast() {
		if (!$page.url.searchParams.get('type')) {
			currentType = validateType(getPersistedValue('type', TYPE.GENRE));
		}
		const genres = getPersistedValue('genres', null, (val) => JSON.parse(val));
		const people = getPersistedValue('people', null, (val) => JSON.parse(val));

		lastGenres = genres;
		lastPeople = people;
	}

	/**
	 *
	 * @param {number[]} items
	 */
	function applyItems(items) {
		selectedIds = [...items];
	}

	afterNavigate(() => {
		getLast();
	});

	onMount(() => {
		getLast();
	});

	$: fullItems = filterItems(currentType, '');
	$: items = filterItems(currentType, searchValue);
</script>

<Head title="Filter" />

<div class="wrapper">
	<header>
		<div class="left">
			Choosing by {TYPE_LABEL[currentType]}
			<button class="btn-reset" on:click={toggleType}>Switch</button>
		</div>

		<div class="right">
			<form class="search" on:submit={onSearch}>
				<input type="search" bind:value={searchValue} placeholder="Search..." />
			</form>
		</div>
	</header>

	{#if currentType === TYPE.DIRECTOR && lastPeople}
		<div class="pool">
			<ButtonPool
				title="Your last choice"
				items={filterItemsByIds(fullItems, lastPeople)}
				bind:selected={selectedIds}
			>
				<button on:click={() => applyItems(lastPeople)} slot="title" class="btn-reset std"
					>Apply again</button
				>
			</ButtonPool>
		</div>
	{/if}
	{#if currentType === TYPE.GENRE && lastGenres}
		<div class="pool">
			<ButtonPool
				title="Your last choice"
				items={filterItemsByIds(fullItems, lastGenres)}
				bind:selected={selectedIds}
			>
				<button on:click={() => applyItems(lastGenres)} slot="title" class="btn-reset std"
					>Apply again</button
				>
			</ButtonPool>
		</div>
	{/if}

	<div class="pool">
		<ButtonPool {items} bind:selected={selectedIds} />
	</div>

	<FilterPill disabled={selectedIds.length === 0} on:start={onStart} bind:selected={selectedIds} />
</div>

<style lang="scss">
	.wrapper {
		position: relative;

		max-width: calc(950px + (var(--inner-padding) * 2));
		width: 100%;

		padding: var(--inner-padding) var(--inner-padding) var(--inner-padding);

		margin: auto;

		&:after {
			content: '';

			position: fixed;

			bottom: 0;
			left: 0;

			width: 100%;
			height: var(--inner-padding);

			background: linear-gradient(to top, var(--color-bg), var(--color-bg-transparent));
		}
	}

	header {
		position: sticky;

		top: 0;
		padding: 10px 0;

		display: grid;

		grid-template-columns: 1fr auto;

		background-color: var(--color-bg-opacity);

		z-index: 2;

		.left {
			button {
				display: inline-block;

				margin: 0 0.5em;

				color: var(--color-accent);

				@include hover {
					border-bottom: 1px solid currentColor;
				}
			}
		}

		.right {
		}
	}

	.search {
		input {
			background-color: transparent;

			appearance: none;
			border-radius: none;

			border: none;
			border-bottom: 1px solid currentColor;

			outline: none;

			padding: 0 2px 10px;
			color: var(--color-light);

			&:focus {
				color: var(--color-text);
			}

			&::placeholder {
				color: var(--color-light);
			}
		}
	}

	.pool {
		margin: 40px 0;
	}
</style>
