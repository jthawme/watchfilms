<script>
	/** @type {Array<{ text: string, id: number }>} */
	export let items;

	/** @type {number[]} */
	export let selected = [];

	/** @type {string | null} */
	export let title = null;

	function onSelect(e) {
		const id = parseInt(e.target.dataset.id);

		const arr = selected.slice();

		if (arr.includes(id)) {
			arr.splice(arr.indexOf(id), 1);
		} else {
			arr.push(id);
		}

		selected = arr;
	}
</script>

<div class="items" class:withTitle={!!title}>
	{#if title}
		<span class="title">{title}<slot name="title" /></span>
	{/if}

	{#each items as item (item.id)}
		<button
			class="btn-reset items-item headline"
			class:selected={selected.includes(item.id)}
			on:click={onSelect}
			type="button"
			data-id={item.id}>{item.text}</button
		>
	{/each}
	{#if items.length === 0}
		<span class="empty">No items</span>
	{/if}

	<slot />
</div>

<style lang="scss">
	.items {
		display: flex;

		justify-content: center;

		flex-wrap: wrap;

		font-size: var(--pool-font-size, clamp(var(--font-size-large), 3vw, var(--font-size-x-large)));
		gap: var(--pool-gap, 0.1em 0.75em);

		&.withTitle {
			border-bottom: 1px solid var(--color-x-light);

			padding-bottom: 1em;
		}

		&-item {
			position: relative;

			line-height: 1;

			padding: 0.1em;

			transition: {
				duration: 0.15s;

				property: color;
			}

			&:after {
				position: absolute;

				top: 100%;
				left: 50%;

				transform: translateX(-50%) scaleX(0);

				width: 100%;
				height: 1px;

				background-color: currentColor;

				content: '';

				transition: {
					duration: 0.15s;

					property: transform;
				}
			}

			@include hover(':not(.selected)') {
				&:after {
					transform: translateX(-50%) scaleX(0.2);
				}
			}

			&.selected {
				color: var(--color-accent);

				&:after {
					transform: translateX(-50%) scaleX(1);
				}

				@include hover {
					&:after {
						transform: translateX(-50%) scaleX(0.8);
					}
				}
			}
		}
	}

	.title {
		display: block;

		width: 100%;

		text-align: center;

		font-size: var(--font-size-small);

		margin-bottom: 1em;

		:global(button) {
			margin-left: 1em;

			color: var(--color-accent);
		}
	}

	.empty {
		width: 100%;

		text-align: center;
	}
</style>
