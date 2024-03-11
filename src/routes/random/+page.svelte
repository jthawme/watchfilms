<script>
	import { goto } from '$app/navigation';
	import { store as Journey } from '$lib/store/journey.js';
	import { getPersistedValue, timer } from '$lib/utils.js';
	import { onMount } from 'svelte';

	async function getFilm() {
		const { film } = await fetch('/api/random', {
			method: 'POST',
			headers: {
				accept: 'application/json'
			},
			body: JSON.stringify({
				avoid: [...getPersistedValue('avoid', [], (val) => JSON.parse(val)).map((item) => item.id)]
			})
		}).then((resp) => resp.json());

		await timer(1500);

		goto(`/film/${film.id}`, {
			replaceState: true
		});
	}

	onMount(() => {
		getFilm();
	});
</script>

<div class="page">
	<span>Getting random film </span>
</div>

<style lang="scss">
	.page {
		width: 100%;

		display: flex;

		align-items: center;
		justify-content: center;
	}
</style>
