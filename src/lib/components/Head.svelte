<script>
	import { pageTitle } from '$lib/utils.js';

	// @ts-nocheck

	/** @type {string} */
	export let title = '';

	/** @type {string} */
	export let description =
		'A playful helper for finding a great film. 3 spins, no redos. Get lightly bullied into making a choice';

	/** @type {string} */
	export let seperator = ' – ';

	/** @type {string | null} */
	export let image = null;
	// export let favicon = null;
	/** @type {string} */
	export let domain = 'https://films.jthaw.club';

	/** @type {string} */
	export let defaultTitle = 'Watch Better Films';
	/** @type {string} */
	export let defaultDescription = '';
	/** @type {string | null} */
	export let defaultImage = '/social/social.twitter.png';

	/** @type {string | null} */
	export let defaultFacebookImage = '/social/social.facebook.png';

	$: formattedTitle = pageTitle(title, defaultTitle, seperator);
	$: resolvedDescription = description || defaultDescription;
	$: resolvedTwitterImage = [domain, image || defaultImage].join('');
	$: resolvedFacebookImage = [domain, image || defaultFacebookImage].join('');

	$: defaultMeta = [
		{ charset: 'utf-8' },
		{
			name: 'viewport',
			content:
				'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
		},
		{ name: 'referrer', content: 'no-referrer' },
		{
			name: 'description',
			content: description
		},
		{
			name: 'twitter:card',
			content: 'summary_large_image'
		},
		{
			name: 'twitter:title',
			content: formattedTitle
		},
		{
			name: 'twitter:description',
			content: resolvedDescription
		},
		resolvedTwitterImage
			? {
					name: 'twitter:image:src',
					content: resolvedTwitterImage
				}
			: false,
		{
			name: 'og:title',
			property: 'og:title',
			content: formattedTitle
		},
		{ name: 'og:type', property: 'og:type', content: 'website' },
		{
			name: 'og:url',
			property: 'og:url',
			content: `${domain}`
		},
		resolvedFacebookImage
			? {
					name: 'og:image',
					property: 'og:image',
					content: resolvedFacebookImage
				}
			: false,
		{
			name: 'og:description',
			property: 'og:description',
			content: resolvedDescription
		},
		{
			name: 'og:site_name',
			property: 'og:site_name',
			content: formattedTitle
		}
	].filter((item) => !!item);
</script>

<svelte:head>
	<title>{formattedTitle}</title>
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="icon" href="/favicon.ico" />
	<link rel="manifest" href="/manifest.json" />

	{#each defaultMeta as tag}
		<meta {...tag} />
	{/each}
</svelte:head>
