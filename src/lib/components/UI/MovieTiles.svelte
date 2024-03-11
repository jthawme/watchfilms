<script>
	import { tmdbImage } from '$lib/utils.js';
	import { createEventDispatcher } from 'svelte';

	/** @type {Array<{id: number, backdrop: string, title: string}>} */
	export let items = [];

	export let small = false;

	const dispatch = createEventDispatcher();

	function onRemove(e) {
		dispatch('remove', parseInt(e.target.dataset.id));
	}
</script>

<div class="wrapper" class:smaller={small}>
	{#each items as item}
		<div class="tile">
			<a target="_blank" href={`/film/${item.id}`} class="tile-image">
				{#if item.backdrop}
					<img src={tmdbImage(item.backdrop)} loading="lazy" alt="" />
				{/if}
			</a>
			<div class="tile-content">
				<span class="title">{item.title}</span>

				<div class="action">
					<button class="std btn-reset" on:click={onRemove} data-id={item.id}>Remove</button>
				</div>
			</div>
		</div>
	{/each}

	{#if items.length === 0}
		<p class="empty">
			<slot name="empty">No films seen yet. Click 'Seen this film' on a film page</slot>
		</p>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		display: grid;

		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

		gap: 20px;

		&.smaller {
			grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		}
	}

	.tile {
		display: flex;

		flex-direction: column;

		gap: 10px;

		&-image {
			position: relative;

			line-height: 0;

			border-radius: 10px;

			overflow: hidden;

			background-color: var(--color-bg);

			aspect-ratio: 1280 / 720;

			img {
				position: relative;

				z-index: 2;
			}

			&:after {
				content: '';

				position: absolute;

				top: 50%;
				left: 50%;

				transform: translate3d(-50%, -50%, 0) rotate(-29deg);

				width: 150%;
				height: 1px;

				background-color: var(--color-x-light);
			}
		}

		&-content {
			display: grid;

			grid-template-columns: 1fr auto;

			align-items: flex-start;

			gap: 10px;
		}

		.title {
			color: var(--color-bg);
		}

		.action {
			button {
				font-size: var(--font-size-small);
			}
		}
	}

	.empty {
		grid-column: 1 / -1;

		text-align: center;
	}
</style>
