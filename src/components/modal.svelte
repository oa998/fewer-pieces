<script lang="ts">
	let modal: HTMLDialogElement;

	export let onClose: () => void;
	export let isOpen: boolean;

	$: if (modal) {
		document.addEventListener('keydown', (ev) => {
			if (ev.key === 'Escape') {
				console.log('clicked outside');
				modal.close();
			}
		});
		modal.addEventListener('click', (e) => {
			const dims = modal.getBoundingClientRect();
			const clickedOutside =
				e.clientX < dims.left ||
				e.clientX > dims.right ||
				e.clientY < dims.top ||
				e.clientY > dims.bottom;
			if (clickedOutside) {
				modal.close();
			}
		});
		if (isOpen) {
			modal.showModal();
		} else if (!isOpen) {
			modal.close();
		}
	}
</script>

<dialog open={!!isOpen} on:close={onClose} data-modal bind:this={modal}>
	<div>
		<form method="dialog">
			<button class="close-card">x</button>
		</form>
		<slot />
	</div>
</dialog>

<style>
	.close-card {
		border-radius: 3px;
		line-height: 10px;
		@apply absolute top-2 right-2 text-yellow-300 border border-yellow-700 p-1 outline-none;
	}

	dialog {
		/* display: block;
		pointer-events: none;
		opacity: 0;
		transition: all 3.5s;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
		border-radius: 10px;
		@apply bg-gray-900;
	}
	dialog[open] {
		animation: myFadeIn 5s ease normal;
	}
	@keyframes myFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	dialog::backdrop {
		background-color: hsla(0, 0%, 0%, 0.7);
	}
</style>
