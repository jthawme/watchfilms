<script>
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';

	import '$lib/styles/global.scss';
	import Head from '$lib/components/Head.svelte';
	import { store as UI } from '$lib/store/ui.js';
	import { store as Journey } from '$lib/store/journey.js';
	import { derived } from 'svelte/store';
	import {
		getCustomProperty,
		getPersistedValue,
		listenCb,
		onWindowResize,
		scrollTo
	} from '$lib/utils.js';
	import Credits from '$lib/components/UI/Credits.svelte';
	import { page } from '$app/stores';
	import Manager from '$lib/components/UI/Messages/Manager.svelte';
	import { store as Messages } from '$lib/store/messages.js';

	async function checkServiceWorker() {
		const registration = await navigator.serviceWorker.getRegistration();

		if (registration) {
			registration.addEventListener('updatefound', () => {
				Messages.add('New version of the site, please reload', {
					action: () => window.location.reload()
				});
			});
		}
	}

	let display = false;

	/** @type {HTMLElement | null} */
	let wrapperEl = null;

	const menuState = derived([UI], ([$UI]) => $UI.menu);

	let windowWidth = 0;
	let windowHeight = 0;

	function onWindowDimension() {
		innerPadding = getCustomProperty('--inner-padding', (v) => parseInt(v));

		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
	}

	/**
	 *
	 * @param {HTMLElement} wrapper
	 */
	function openCredits(wrapper) {
		const mainEl = wrapper.querySelector('.site');

		if (!mainEl) {
			return;
		}

		const scrollY = document.documentElement.scrollTop;

		display = true;
		mainEl.classList.add('clip', 'transform');
		mainEl.scrollTop = scrollY;
	}

	/**
	 *
	 * @param {HTMLElement} wrapper
	 */
	async function closeCredits(wrapper) {
		const mainEl = wrapper.querySelector('.site');

		if (!mainEl || !mainEl.classList.contains('transform')) {
			return;
		}

		const st = mainEl.scrollTop;

		await scrollTo(0);

		mainEl.classList.remove('transform');

		const u = listenCb(mainEl, 'transitionend', (e) => {
			if (e.target !== mainEl) {
				return;
			}
			display = false;
			mainEl.classList.remove('clip');
			window.scrollTo({
				top: st
			});
			u();
		});
	}

	function onMainClick() {
		if ($UI.menu) {
			UI.setMenu(false);
		}
	}

	$: if ($menuState && wrapperEl) {
		openCredits(wrapperEl);
	} else if (!$menuState && wrapperEl) {
		closeCredits(wrapperEl);
	}

	onMount(() => {
		checkServiceWorker();

		onWindowDimension();
		const u = [onWindowResize(onWindowDimension)];

		const avoid = getPersistedValue('avoid', [], (val) => JSON.parse(val));
		const want = getPersistedValue('want', [], (val) => JSON.parse(val));

		Journey.loadAvoid(avoid);
		Journey.loadWant(want);

		// check theme
		if (getPersistedValue('theme', null)) {
			UI.setTheme(getPersistedValue('theme', null));
		} else {
			UI.setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		}

		return () => {
			u.forEach((cb) => cb());
		};
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	$: innerPadding = 60;
	$: scale = (windowWidth - innerPadding * 2) / windowWidth;
	$: bottom = windowHeight - windowHeight * scale + 60;

	$: showLayout = $page.url.pathname !== '/';

	function toggleCredits() {
		UI.setMenu(!$UI.menu);
	}

	$: if (typeof document !== 'undefined' && $UI.theme) {
		document.documentElement.classList.toggle('light', $UI.theme === 'light');
		document.documentElement.classList.toggle('dark', $UI.theme === 'dark');
	}
</script>

<Head />

<svelte:head>
	<script
		defer
		data-domain="films.jthaw.club"
		src="https://plausible.io/js/script.tagged-events.js"
	></script>
</svelte:head>

<div
	class:display
	bind:this={wrapperEl}
	class="wrapper"
	style={`--scale: ${scale}; --bottom: ${bottom};`}
	class:showLayout
>
	<Manager />

	<main class="site" aria-hidden={$UI.menu} on:click={onMainClick}>
		<slot />
	</main>

	<span class="credits-btn-wrap">
		<a
			target="_blank"
			href="https://jthaw.me?utm=films"
			class="btn-reset std credits-btn credits-btn--left">Credits</a
		>

		<button class="btn-reset std credits-btn credits-btn--right" on:click={toggleCredits}
			>{$UI.menu ? 'Close' : 'What is this?'}</button
		>
	</span>

	<div class="credits">
		<Credits />
	</div>
</div>

<style lang="scss">
	.wrapper {
		background-color: var(--color-accent);

		min-height: 100dvh;
	}

	.site {
		position: relative;

		display: flex;

		min-height: 100dvh;

		background-color: var(--color-bg);

		transform-origin: top center;
		transition: {
			property: scale, transform, border-radius;

			duration: 0.35s;
		}

		.display &:after {
			content: '';

			position: absolute;

			top: 0;
			right: 0;
			bottom: 0;
			left: 0;

			z-index: 10;

			cursor: pointer;
		}

		&:global(.transform) {
			scale: var(--scale);
			transform: translateY(-60px);
			border-radius: 0 0 20px 20px;
		}

		&:global(.clip) {
			overflow: hidden;

			height: 100dvh;
			width: 100vw;

			// margin-bottom: calc((60px + var(--inner-padding)) * -1);
			margin-bottom: calc(var(--bottom) * -1px);
		}
	}

	.credits {
		display: none;

		.display & {
			display: block;
		}
	}

	.credits-btn-wrap {
		opacity: 0;

		transition: {
			duration: 0.25s;
			property: opacity;
		}

		.showLayout & {
			opacity: 1;
		}
	}

	.credits-btn {
		position: fixed;

		top: 50%;
		transform-origin: top center;

		color: var(--color-text);
		text-decoration: none;

		font-size: var(--font-size-small);

		&--left {
			left: var(--outer-padding);

			transform: translate3d(-60%, 0, 0) rotate(-90deg);
		}

		&--right {
			right: var(--outer-padding);

			transform: translate3d(60%, 0, 0) rotate(90deg);
		}

		@include tablet {
			font-size: var(--font-size-normal);

			&--left {
				left: var(--outer-padding);

				transform: translate3d(-50%, 0, 0) rotate(-90deg);
			}

			&--right {
				right: var(--outer-padding);

				transform: translate3d(50%, 0, 0) rotate(90deg);
			}
		}
	}
</style>
