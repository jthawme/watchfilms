<script>
	import { mergeProviders, ratingDisplay } from '$lib/utils.js';

	/** @type {null | number} */
	export let runtime = null;

	/** @type {null | number} */
	export let rating = null;

	/** @type {null | string} */
	export let release_date = null;

	/** @type {null | string} */
	export let genre = null;

	/** @type {object} */
	export let providers;

	$: ({ stream, purchase } = mergeProviders(providers));

	function onReport() {
		window.plausible('User', { props: { action: 'Used providers' } });
	}
</script>

<p>
	{#if runtime}<span>{runtime} mins</span>{/if}
	{#if release_date}<span>{new Date(release_date).getFullYear()}</span>{/if}
	{#if genre}
		<span>
			{#each genre.split(',') as item}
				<span>{item}</span>
			{/each}
		</span>
	{/if}
</p>

{#if providers && (stream.length || purchase.length)}
	<p>
		{#if stream.length}
			<span>
				<span class="light">Stream</span>

				{#each stream as item}
					<a on:click={onReport} class="std" href={providers.link} target="_blank">{item}</a>
				{/each}
			</span>
		{/if}
		{#if purchase.length}
			<span>
				<span class="light">Purchase</span>

				{#each purchase as item}
					<a on:click={onReport} class="std" href={providers.link} target="_blank">{item}</a>
				{/each}
			</span>
		{/if}

		<span class="small">Data from JustWatch</span>
	</p>
{/if}

{#if rating && rating > 5}
	<p>
		<span><span class="light">Rating</span> {ratingDisplay(rating)}</span>
	</p>
{/if}

<span class="slot">
	<slot />
</span>

<style lang="scss">
	p > span,
	.slot :global(p > span) {
		display: flex;

		column-gap: 0.75em;

		flex-wrap: wrap;
		justify-content: var(--span-justify, flex-start);
	}

	p a,
	.slot :global(p a) {
		color: var(--color-text);
		text-decoration: none;
	}

	button,
	.slot :global(button) {
		padding-bottom: 0.25em;
		border-bottom: 1px solid currentColor;
	}

	.small {
		margin-top: 0.5em;
	}
</style>
