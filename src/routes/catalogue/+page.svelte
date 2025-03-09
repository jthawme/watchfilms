<script>
	import CatalogueRow from '$lib/components/CatalogueRow.svelte';
	import Pill from '$lib/components/UI/Pill.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	const people = data.people;
</script>

<div class="wrapper">
	<h1 class="headline">Catalogue</h1>

	<div class="pool">
		{#each people as person}
			<CatalogueRow {...person} />
		{/each}
	</div>
</div>

<style lang="scss">
	.wrapper {
		position: relative;

		max-width: calc(950px + (var(--inner-padding) * 2));
		width: 100%;

		padding: var(--inner-padding) var(--inner-padding) 100px;

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

		@include tablet {
			padding: var(--inner-padding);
		}
	}

	h1 {
		text-align: center;
	}
</style>
