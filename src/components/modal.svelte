<script lang="ts">
	let modal: HTMLDialogElement;

	export let onClose: () => void;
	export let isOpen: string | boolean;

	$: if (modal) {
		document.addEventListener('keydown', (ev) => {
			if (ev.key === 'Escape' && modal.open) {
				console.log('clicked outside');
				modal.close();
				onClose();
			}
		});
		modal.addEventListener('click', (e) => {
			const dims = modal.getBoundingClientRect();
			const clickedOutside =
				e.clientX < dims.left ||
				e.clientX > dims.right ||
				e.clientY < dims.top ||
				e.clientY > dims.bottom;
			if (clickedOutside && modal.open) {
				console.log('clicked outside');
				modal.close();
				onClose();
			}
		});
		if (isOpen && !modal.open) {
			modal.showModal();
		} else if (!isOpen && modal.open) {
			modal.close();
			onClose();
		}
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
