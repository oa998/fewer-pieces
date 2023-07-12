<script lang="ts">
	import Modal from '$components/modal.svelte';
	import gameState, { type GameState, type IntruderToken } from '$gameplay/nemesis/GameState';
	import mechanics from '$gameplay/nemesis/mechanics';
	import { createEventDispatcher } from 'svelte';
	import Token from './Token.svelte';

	export let onClose: () => void;
	export let intruderId: IntruderToken['id'];

	const dispatcher = createEventDispatcher();

	let selectedIntruder = $gameState.inPlay.find(
		(intruder) => intruder.id === intruderId
	) as GameState['inPlay'][number];

	$: selectedIntruder = $gameState.inPlay.find(
		(intruder) => intruder.id === intruderId
	) as GameState['inPlay'][number];

	// Always initialize note to the stored value else it will delete the not upon mount
	let note = selectedIntruder.note;

	$: setDamageIntruder = (damageChange: 1 | -1) => {
		$gameState = mechanics.changeDamage($gameState, intruderId, damageChange);
	};

	$: {
		// when note changes, update it
		$gameState = mechanics.setNote($gameState, intruderId, note);
	}
</script>

{#if selectedIntruder}
	<Modal {onClose}>
		<div class="flex flex-col gap-10">
			<div class="flex flex-row gap-5">
				<Token intruder={selectedIntruder} size="lg" color="red" />
				<!-- <img src={selectedIntruder.src} alt={selectedIntruder.id} class="max-h-32" /> -->
				<div class="flex flex-col justify-around">
					<div>
						<div class="text-center">Damage</div>
						<div class="flex flex-row gap-2">
							<button class="calcButton radius" on:click={() => setDamageIntruder(-1)}>-</button>
							<div>{selectedIntruder.damage}</div>
							<button class="calcButton radius" on:click={() => setDamageIntruder(1)}>+</button>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-3 text-sm">
				<input
					bind:value={note}
					placeholder="note"
					maxlength="120"
					class="py-1 px-2 bg-slate-700"
				/>
				<button
					class="py-1 px-2 bg-red-600 radius"
					on:click={() => dispatcher('killIntruder', selectedIntruder.id)}>Kill</button
				>
				<button
					class="py-1 px-2 bg-blue-800 radius"
					on:click={() => dispatcher('returnToBag', selectedIntruder.id)}>Return to bag</button
				>
			</div>
		</div>
	</Modal>
{/if}

<style>
	* {
		@apply text-yellow-400;
	}
	.radius {
		border-radius: 5px;
	}
	.calcButton {
		@apply bg-red-800 px-2 w-[20pt] leading-[20pt];
	}
</style>
