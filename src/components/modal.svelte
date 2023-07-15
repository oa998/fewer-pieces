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
	<!-- using 'close' class here because the global style isn't working -->
	<div class="close relative">
		<div
			class="flex flex-row w-full justify-end sticky top-0 right-2 bg-gray-900 overflow-scroll py-2 pr-2"
		>
			<button class="close-card-x flex justify-center items-center" on:click={close}>
				<span class="leading-4">✕</span>
			</button>
		</div>
		<div class="px-2 pb-2">
			<slot />
		</div>
	</div>
</dialog>

<style global>
	.close-card-x {
		border-radius: 4px;
		width: 20px;
		height: 20px;
		@apply text-yellow-300 border border-yellow-700 outline-none;
	}

	dialog {
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 10px;
		@apply bg-gray-900 p-0;
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
