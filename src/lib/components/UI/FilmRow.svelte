<script>
	import { mergeProviders, tmdbImage } from '$lib/utils.js';
	import FilmContent from './FilmContent.svelte';

	/** @type {string} */
	export let title;

	/** @type {string} */
	export let poster;

	/** @type {string} */
	export let person;

	/** @type {object} */
	export let providers;

	/** @type {number} */
	export let runtime;

	/** @type {string} */
	export let genre;

	$: ({ stream, purchase } = mergeProviders(providers));
</script>

<div class="row">
	<div class="row-left content">
		<span class="headline content-top">{title}</span>

		<div class="content-middle">
			<FilmContent {runtime} {genre} {providers} />
		</div>

		<span class="headline content-bottom light">{person}</span>
	</div>

	<div class="row-right">
		<img src={tmdbImage(poster, 'w500')} alt="" />
	</div>
</div>

<style lang="scss">
	.row {
		display: grid;

		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto;
		grid-template-areas:
			'right'
			'left';

		border-radius: 20px;
		isolation: isolate;

		border: 1px solid var(--color-x-light);
		overflow: hidden;

		&-left {
			padding: 20px;

			grid-area: left;
		}

		&-right {
			position: relative;
			line-height: 0;

			padding: 20px;

			background-color: var(--color-x-light);

			grid-area: right;

			aspect-ratio: 1920/1280;

			img {
				position: absolute;

				top: 50%;
				left: 50%;

				height: 80%;
				width: 80%;

				transform: translate3d(-50%, -50%, 0);

				object-fit: contain;
			}
		}

		@include tablet {
			grid-template-columns: 1fr 200px;
			grid-template-rows: 1fr;
			grid-template-areas: 'left right';

			&-right {
				aspect-ratio: 500/700;
			}
		}
	}

	.content {
		display: flex;

		flex-direction: column;

		gap: 10px;

		&-top {
			margin: 0;
		}

		&-middle {
			flex-grow: 1;

			display: flex;

			flex-direction: column;

			justify-content: center;

			p {
				> span {
					display: flex;

					column-gap: 0.75em;

					flex-wrap: wrap;
				}

				a {
					color: var(--color-text);
					text-decoration: none;
				}
			}

			button {
				padding-bottom: 0.25em;
				border-bottom: 1px solid currentColor;
			}

			.small {
				margin-top: 0.5em;
			}
		}

		&-bottom {
			margin: 0;
		}

		&-top,
		&-bottom {
			text-transform: uppercase;
			font-size: var(--font-size-large);
			line-height: 0.75;
		}
	}
</style>
