<script>
	import { onMount } from 'svelte';
	import { store as Journey } from '$lib/store/journey.js';
	import { goto } from '$app/navigation';
	import FilmRow from '$lib/components/UI/FilmRow.svelte';
	import Head from '$lib/components/Head.svelte';
	import { FILMS_LENGTH } from '$lib/constants.js';

	let mounted = false;

	onMount(() => {
		if (!$Journey.started || $Journey.films.length === 0) {
			goto('/');
			return;
		}

		mounted = true;
	});
</script>

<Head title="Results" />

<div class="page">
	{#if mounted}
		<div class="wrapper">
			<h1>Your {$Journey.films.length} films</h1>

			{#each $Journey.films as film}
				<FilmRow {...film} />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.page {
		width: 100%;
	}

	h1 {
		text-align: center;

		margin: 0 0 1em;
		padding: 0;

		font-size: var(--font-size-normal);
		font-weight: var(--font-weight-normal);
	}

	.wrapper {
		padding: var(--inner-padding);

		display: flex;

		flex-direction: column;

		gap: 40px;

		max-width: 950px;

		margin: 0 auto;
	}
</style>
