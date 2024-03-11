<script>
	import { store as Messages } from '$lib/store/messages.js';
	import Item from './Item.svelte';

	/**
	 *
	 * @param {{detail: string}} evt
	 */
	function onRemove({ detail: id }) {
		Messages.remove(id);
	}
</script>

<div class="messages">
	{#each $Messages as item (item.id)}
		<Item {...item} on:remove={onRemove} />
	{/each}
</div>

<style lang="scss">
	.messages {
		display: flex;

		flex-direction: column;

		position: fixed;

		top: 0;
		left: 0;

		width: 100%;

		z-index: 20;
	}
</style>
