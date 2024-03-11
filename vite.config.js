import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';
import { defineConfig } from 'vite';
import BuildManifest from './tools/BuildManifest.js';

export default defineConfig({
	plugins: [
		sveltekit(),
		svg({
			includePaths: ['./src/lib/icons/'],
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: 'preset-default',
						// by default svgo removes the viewBox which prevents svg icons from scaling
						// not a good idea! https://github.com/svg/svgo/pull/1461
						params: { overrides: { removeViewBox: false } }
					},
					{
						name: 'convertColors',
						params: {
							currentColor: true
						}
					},
					{ name: 'removeAttrs', params: { attrs: '(width|height)' } }
				]
			}
		}),
		BuildManifest({
			manifest: {
				name: 'Watch Better Films',
				short_name: 'Films',
				description: 'A playful helper for finding a great film',
				background_color: '#ffffff',
				display: 'fullscreen',
				start_url: '/?source=pwa',
				theme_color: '#eb5c3d',
				shortcuts: [
					{
						name: 'Random',
						short_name: 'Random',
						description: 'Get a random film recommended',
						url: '/random?source=pwa',
						icons: [
							{
								src: '/icons/96.favicon.png',
								sizes: '96x96',
								type: 'image/png',
								purpose: 'maskable'
							}
						]
					}
				],
				screenshots: [
					{
						src: '/screenshots/wide.jpg',
						type: 'image/jpeg',
						sizes: '1280x832',
						form_factor: 'wide'
					}
				]
			}
		})
	],

	css: {
		preprocessorOptions: {
			hoistUseStatements: true,
			scss: {
				additionalData: (content) => {
					const imports = `@import "$lib/styles/common.scss";`;
					// If there are @use statements, insert the import after the last one,
					// otherwise insert it before all content.
					const match = content.match(/@use '[^']+';/g);
					if (match) {
						const last = match[match.length - 1];
						return content.replace(last, `${last}\n${imports}`);
					} else {
						return `${imports}\n${content}`;
					}
				}
			}
		}
	}
});
