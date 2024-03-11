<script>
	import { store as UI } from '$lib/store/ui.js';

	function changeTheme() {
		UI.setTheme($UI.theme === 'light' ? 'dark' : 'light');
	}
</script>

<ul>
	<li>
		<span class="title">Theme</span>

		<button class="std btn-reset" on:click={changeTheme}>{$UI.theme}</button>
	</li>
</ul>

<style lang="scss">
	ul {
		list-style: none;

		padding: 0;
		margin: 0;

		display: flex;

		gap: 1em;

		justify-content: center;

		.title {
			color: var(--color-text);
		}

		button {
			color: var(--color-bg);

			text-transform: capitalize;
		}
	}
</style>
