<script lang="ts">
	let modal: HTMLDialogElement;

	export let onClose: () => void;

	$: if (modal) {
		// always display the modal upon rendering this component.
		// "hide" the modal by not rendering it ({#if show} ... {/if})
		modal.showModal();

		modal.addEventListener('click', (e) => {
			const dims = modal.getBoundingClientRect();
			const clickedOutside =
				e.clientX < dims.left ||
				e.clientX > dims.right ||
				e.clientY < dims.top ||
				e.clientY > dims.bottom;
			if (clickedOutside) onClose();
		});
	}
</script>

<dialog data-modal bind:this={modal}>
	<div>
		<button class="close-card" on:click={onClose}>✕</button>
		<slot />
	</div>
</dialog>

<style>
	dialog {
		border-radius: 10px;
		@apply bg-gray-900;
	}
	dialog::backdrop {
		background-color: hsla(0, 0%, 0%, 0.7);
	}
	.close-card {
		border-radius: 3px;
		line-height: 10px;
		@apply absolute top-2 right-2 text-yellow-300 border border-yellow-700 p-1 outline-none;
	}
</style>
