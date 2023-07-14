<script lang="ts">
	let modal: HTMLDialogElement;

	export let onClose: () => void;
	export let isOpen: boolean;

	let close = () => {};

	$: if (modal) {
		close = () => {
			modal.classList.add('close');
			setTimeout(() => {
				modal.classList.remove('close');
				onClose();
				modal.close();
			}, 90);
		};

		document.addEventListener('keydown', (ev) => {
			if (ev.key === 'Escape') {
				close();
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
				close();
			}
		});

		if (isOpen && !modal.open) {
			modal.showModal();
		} else if (!isOpen) {
			close();
		}
	}
</script>

<dialog bind:this={modal}>
	<div>
		<div class="close" />
		<!-- <form method="dialog">
			<button class="close-card">x</button>
		</form> -->
		<button class="close-card" on:click={close}>x</button>
		<slot />
	</div>
</dialog>

<style global>
	.close-card {
		border-radius: 3px;
		line-height: 10px;
		@apply absolute top-2 right-2 text-yellow-300 border border-yellow-700 p-1 outline-none;
	}

	dialog {
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 10px;
		@apply bg-gray-900;
	}
	dialog[open]:not(.close) {
		animation: myFadeIn 0.2s ease normal;
		animation-iteration-count: 1;
	}
	@keyframes myFadeIn {
		from {
			opacity: 0;
			top: 100%;
		}
		to {
			opacity: 1;
			top: 0px;
		}
	}
	.close {
		animation: fadeOut 0.1s ease normal;
	}
	@keyframes fadeOut {
		from {
			top: 0;
		}
		to {
			top: 100%;
			opacity: 0;
		}
	}
	dialog::backdrop {
		background-color: hsla(0, 0%, 0%, 0.7);
	}
</style>
