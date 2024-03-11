<script>
	import { goto } from '$app/navigation';
	import Head from '$lib/components/Head.svelte';
	import FilmContent from '$lib/components/UI/FilmContent.svelte';
	import Overlay from '$lib/components/UI/Overlay.svelte';
	import Pill from '$lib/components/UI/Pill.svelte';
	import { store as Journey } from '$lib/store/journey.js';
	import { store as Messages } from '$lib/store/messages.js';
	import { tmdbImage } from '$lib/utils.js';

	/** @type {import('./$types').PageData} */
	export let data;

	let showSynopsis = false; // Display the synopsis overlay
	let showTrailer = false; // Display the trailer overlay

	let loaded = false; // The image has loaded or not

	function toggleSynopsis() {
		showSynopsis = !showSynopsis;

		if (showSynopsis) {
			window.plausible('User', { props: { action: 'Viewed Synopsis' } });
		}
	}

	function toggleTrailer() {
		showTrailer = !showTrailer;

		if (showTrailer) {
			window.plausible('User', { props: { action: 'Watched trailer' } });
		}
	}

	function onImageLoad() {
		loaded = true;
	}

	async function onSave() {
		window.plausible('User', { props: { action: 'Saved film', title: data.title } });
		Messages.add(`Saved ${data.title} to your list`, {
			delay: 2000
		});

		await Journey.saveFilm(data);
	}

	async function onRemove() {
		window.plausible('User', { props: { action: 'Removed film' } });
		Messages.add(`Removed from your list`, {
			delay: 2000
		});

		await Journey.removeWantFilm(data.id);
	}

	/**
	 * Set the film in the store as a film thats been seen.
	 * If we are currently on the journey, then go to the next film, but this may also
	 * just be a shared film page
	 */
	async function onSeen() {
		await Journey.skipFilm(data);

		Messages.add(`You won't see this film again`, {
			delay: 2000
		});

		if ($Journey.started) {
			goto('/next');
		}
	}

	async function onShare(e) {
		window.plausible('User', { props: { action: 'Share' } });

		if ('share' in navigator) {
			e.preventDefault();
			navigator.share({
				title: document.title,
				text: `Check out this great film`,
				url: window.location.href
			});
		}
	}

	/**
	 * Store the film in the store as one of the three, then go to the next page
	 */
	async function onNext() {
		await Journey.storeFilm(data);
		goto('/next');
	}

	$: saved = $Journey.want.some((item) => item.id === data.id);
</script>

<Head title={data.title} />

<div class="page">
	<Overlay show={showSynopsis} on:close={toggleSynopsis}>
		<div class="synopsis">
			<p>{data.overview}</p>

			<button on:click={toggleSynopsis} class="std btn-reset">Close</button>
		</div>
	</Overlay>

	{#if data.trailer}
		<Overlay show={showTrailer} on:close={toggleTrailer}>
			<div class="trailer">
				<div class="trailer-video">
					<iframe
						class="youtube-video"
						src={`https://www.youtube.com/embed/${data.trailer}`}
						title="Trailer"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>

				<button on:click={toggleTrailer} class="std btn-reset">Close</button>
			</div>
		</Overlay>
	{/if}

	<div class="page-left content">
		<h1 class="headline content-top">{data.title}</h1>

		<div class="content-middle">
			<FilmContent
				rating={data.rating}
				runtime={data.runtime}
				genre={data.genre}
				release_date={data.release_date}
				providers={data.providers}
			>
				<p>
					<span>
						<span><button on:click={toggleSynopsis} class="std btn-reset">Synopsis</button></span>

						{#if data.trailer}
							<span>
								<button on:click={toggleTrailer} class="std btn-reset">Trailer</button>
							</span>
						{/if}
					</span>
				</p>
			</FilmContent>
		</div>

		<span class="headline content-bottom">{data.person}</span>
	</div>

	<div class:loaded class="page-right">
		<a
			on:click={onShare}
			href={`mailto:?subject=Check out this film ${data.title}&body=${window.location.href}`}
			target="_blank"
			class="std share">Share</a
		>

		{#if !saved}
			<button class="std save btn-reset" on:click={onSave}>Save this film</button>
		{:else}
			<button class="std save btn-reset" on:click={onRemove}>Remove from saved</button>
		{/if}

		<img loading="lazy" on:load={onImageLoad} src={tmdbImage(data.poster)} alt="" />

		<button class="std seen btn-reset" on:click={onSeen}>Seen this film</button>
		{#if $Journey.started}
			<div class="next">
				<Pill on:click={onNext}>{$Journey.films.length === 2 ? 'View Films →' : 'Next Film →'}</Pill
				>
			</div>
		{:else}
			<div class="next">
				<Pill to="/">Find a Film →</Pill>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.page {
		position: relative;

		display: grid;

		width: 100%;
		min-height: 100dvh;

		grid-template-columns: 1fr;
		grid-template-rows: 2fr 3fr;
		grid-template-areas:
			'right'
			'left';

		padding: var(--inner-padding);

		@include tablet {
			grid-template-rows: 1fr;
			grid-template-columns: 1fr 1fr;
			grid-template-areas: 'left right';
		}

		&-left {
			grid-area: left;
		}

		&-right {
			grid-area: right;

			position: relative;

			background-color: var(--color-x-light);

			display: flex;

			align-items: center;
			justify-content: center;

			img {
				position: absolute;

				top: 50%;
				left: 50%;

				transform: translate3d(-50%, -50%, 0);

				width: 75%;
				height: 75%;

				object-fit: contain;

				opacity: 0;

				transition: {
					duration: 0.25s;
					property: opacity;
				}
			}

			&.loaded img {
				opacity: 1;
			}
		}
	}

	.seen,
	.next,
	.save,
	.share {
		position: absolute;
	}

	.next {
		bottom: 20px;
		right: 20px;
	}

	.seen,
	.save,
	.share {
		color: var(--color-light);

		font-size: var(--font-size-small);
	}

	.seen,
	.save {
		left: 20px;
	}

	.share {
		top: 25px;
		right: 20px;
		text-decoration: none;
	}

	.seen {
		bottom: 25px;
	}

	.save {
		top: 25px;
	}

	.synopsis,
	.trailer {
		position: relative;
		padding: var(--outer-padding);

		font-family: vaR(--font-family-body-alt);
		font-weight: vaR(--font-weight-body-alt);

		display: flex;

		flex-direction: column;
		align-items: flex-start;

		font-size: var(--font-size-medium);

		p {
			flex-grow: 1;

			margin: 0;
		}

		@include tablet {
			font-size: var(--font-size-large);
		}
	}

	.trailer {
		width: 100%;

		justify-content: flex-end;

		&-video {
			flex-grow: 1;

			display: flex;

			align-items: center;
			justify-content: center;

			width: 100%;

			iframe {
				width: 50%;
				aspect-ratio: 16/9;
			}
			// position: absolute;

			// top: 50%;
			// left: 50%;

			// width: 50%;

			// transform: translate3d(-50%, -50%, 0);

			// aspect-ratio: 16/9;

			// iframe {
			// 	width: 100%;
			// 	height: 100%;
			// }
		}
	}

	.content {
		display: flex;

		flex-direction: column;

		gap: 10px;
		text-align: center;

		padding: 20px 0;

		@include tablet {
			text-align: right;
			padding: 0 20px;
		}

		&-top {
			margin: 0;
		}

		&-middle {
			flex-grow: 1;

			display: flex;

			flex-direction: column;

			justify-content: center;
			align-items: center;
			--span-justify: center;

			@include tablet {
				align-items: flex-end;
				--span-justify: flex-end;
			}
		}

		&-bottom {
			margin: 0;
		}

		&-top,
		&-bottom {
			text-transform: uppercase;
			font-size: var(--font-size-large);
			line-height: 0.95;

			@include tablet {
				font-size: var(--font-size-x-large);
			}
		}
	}
</style>
