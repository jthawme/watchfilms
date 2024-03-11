<script>
	import { store as Journey } from '$lib/store/journey.js';
	import MovieTiles from './MovieTiles.svelte';
	import Settings from './Settings.svelte';

	function onResetSeen() {
		Journey.loadAvoid([]);
	}

	function onResetList() {
		Journey.loadWant([]);
	}

	function onRemoveFilm({ detail }) {
		Journey.removeFilm(detail);
	}

	function onRemoveWantFilm({ detail }) {
		Journey.removeWantFilm(detail);
	}
</script>

<section>
	<span class="title"
		><a href="https://jthaw.me?utm=films" target="_blank">jthawme</a> presents</span
	>

	<div class="description">
		<div class="description-left">
			<p class="headline">
				An opinionated list of directors to be the jumping off point for your
				tireless&nbsp;searching
			</p>
		</div>
		<div class="description-right">
			<p>
				Part of the problem is having too much choice in life. Limitations can breed the perfect
				environment for exploration sometimes, let the site know the kind of thing you want to
				search in the area of, and let it take over, as the opinionated bossy friend, who sometimes
				seems too rigid, but every so often the one you need to just get a decision&nbsp;made.
			</p>
		</div>
	</div>
</section>

<section>
	<span class="title"
		>Your List <button on:click={onResetList} class="btn-reset">Reset</button></span
	>

	<MovieTiles on:remove={onRemoveWantFilm} items={$Journey.want}>
		<span slot="empty">You haven't saved any films yet. Click 'save' on a film page.</span>
	</MovieTiles>
</section>

<section>
	<span class="title"
		>Movies you've seen <button on:click={onResetSeen} class="btn-reset">Reset</button></span
	>

	<MovieTiles small on:remove={onRemoveFilm} items={$Journey.avoid} />
</section>

<section>
	<span class="title">Settings</span>

	<Settings />
</section>

<section class="normal">
	<span class="title">Credits</span>

	<p>
		The site is built using
		<a
			href="https://developer.themoviedb.org/reference/intro/getting-started"
			target="_blank"
			class="std">The MovieDB API</a
		>
	</p>
	<p>
		The site was built by <a class="std" href="https://jthaw.me?utm=films" target="_blank"
			>jthawme</a
		>. The code is available
		<a class="std" href="https://github.com/jthawme/watchfilms" target="_blank">here</a>
	</p>
</section>

<style lang="scss">
	section {
		padding: 40px var(--inner-padding);

		.title {
			display: block;

			text-align: center;

			color: var(--color-text);

			margin-bottom: 1em;

			a {
				color: inherit;
				text-decoration: none;

				border-bottom: 1px solid currentColor;

				@include hover {
					color: var(--color-bg);
				}
			}

			button {
				display: inline-block;

				margin: 0 0.5em;

				color: var(--color-bg);
				border-bottom: 1px solid transparent;

				@include hover {
					border-bottom: 1px solid currentColor;
				}
			}
		}
	}

	.description {
		display: grid;

		gap: 10px;

		color: var(--color-bg);
		text-align: justify;

		p {
			margin: 0;
		}

		&-left {
			font-size: var(--font-size-large);

			line-height: 1;
			letter-spacing: 1px;
			text-transform: uppercase;
		}

		@include tablet {
			text-align: left;
			grid-template-columns: 1fr 1fr;

			&-right {
				text-align: right;
			}
		}
	}

	.normal {
		font-size: var(--font-size-small);

		p {
			text-align: center;
		}

		p a {
			color: vaR(--color-bg);
		}
	}
</style>
