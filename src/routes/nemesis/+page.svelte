<script lang="ts">
	import Mobile from '$components/mobile.svelte';
	import Modal from '$components/modal.svelte';
	import InPlayToken from '$components/nemesis/InPlayToken.svelte';
	import gameState, { Intruders, reset, type IntruderToken } from '$gameplay/nemesis/index';
	import Icon from '@iconify/svelte';

	/*
		New game
		- choose how many players

		Develop the bag

		Encounter
	
	*/

	let showModal = false;

	$: develop = () => {
		if ($gameState.inBag.length === 0) return;
		const intruder = JSON.parse(JSON.stringify($gameState.inBag.popRandom() as IntruderToken));
		$gameState.developing.push(intruder);
		$gameState = JSON.parse(JSON.stringify($gameState));
		localStorage.setItem('game', JSON.stringify($gameState));
	};

	$: developDone = () => {
		if ($gameState.developing.length === 0) return;
		const intruder = $gameState.developing.pop() as IntruderToken;
		$gameState.inBag.push(intruder);
		$gameState = JSON.parse(JSON.stringify($gameState));
		localStorage.setItem('game', JSON.stringify($gameState));
	};

	$: encounter = () => {
		if ($gameState.inBag.length === 0) return;
		// Should never be able to pop a null token here - should always have at least a blank token in bag
		const intruder = JSON.parse(JSON.stringify($gameState.inBag.popRandom() as IntruderToken));
		$gameState.encounter = [intruder]; // Always save over encounter. Only one at a time.
		$gameState = JSON.parse(JSON.stringify($gameState));
		localStorage.setItem('game', JSON.stringify($gameState));
	};

	$: encounterDone = () => {
		if ($gameState.encounter.length === 0) return;
		const lastEncounter = $gameState.encounter.pop() as IntruderToken;
		$gameState.encounter = [];
		// return the blank to the bag else put the Intruder into play
		if (lastEncounter.name === Intruders.BLANK) {
			$gameState.inBag.push(lastEncounter);
		} else {
			$gameState.inPlay.push(lastEncounter);
		}
		$gameState = JSON.parse(JSON.stringify($gameState));
		localStorage.setItem('game', JSON.stringify($gameState));
	};
</script>

<Mobile>
	<div slot="image" class="relative">
		<button class="absolute top-1 left-1 p-1" on:click={reset}>
			<Icon icon="ri:refresh-line" style="font-size:large" color="gray" />
		</button>
		<button
			class="absolute top-1 right-1 p-1"
			on:click={() => {
				showModal = true;
			}}
		>
			<Icon icon="ion:eye-outline" style="font-size:large" color="gray" />
		</button>
		<img src="nemesis2.webp" alt="nemesis" class="w-full h-auto landscape:max-w-xs" />
	</div>

	<div slot="left-side-panel">
		<div class="flex flex-col gap-2 items-stretch">
			<div class="text-blue-400 text-center">{`Tokens in bag: ${$gameState.inBag.length}`}</div>
			<button
				class="text-white border border-red-900 bg-red-800 p-3 disabled:bg-slate-600 disabled:text-slate-800"
				style="border-radius: 10pt;"
				disabled={$gameState.developing.length > 0 ||
					$gameState.inBag.length === 0 ||
					$gameState.encounter.length > 0}
				on:click={develop}>Develop</button
			>

			<button
				class="text-white border border-violet-900 bg-violet-800 p-3 disabled:bg-slate-600 disabled:text-slate-800"
				style="border-radius: 10pt;"
				disabled={$gameState.encounter.length > 0 || $gameState.inBag.length === 0}
				on:click={encounter}>Encounter</button
			>
		</div>
	</div>

	<div slot="right-side-panel" class="flex flex-col text-yellow-300 p-3 h-full justify-between">
		<div class="flex flex-row justify-around">
			{#if $gameState.developing.length > 0}
				<div class="card">
					<button class="close-card" on:click={developDone}>✕</button>
					<div>Develop:</div>
					<img
						src={$gameState.developing[0].src}
						alt={$gameState.developing[0].name}
						class="w-min max-h-32 token lg shadow-xl"
						style={`transform: rotate(${Math.floor(Math.random() * 360)}deg);`}
					/>
					<div class="font-bold text-red-600">{$gameState.developing[0].name}</div>
					<div>{`Threat: ${$gameState.developing[0].threat}`}</div>
				</div>
			{/if}

			{#if $gameState.encounter.length > 0}
				<div class="card">
					<button class="close-card" on:click={encounterDone}>✕</button>
					<div>Encounter:</div>
					<img
						src={$gameState.encounter[0].src}
						alt={$gameState.encounter[0].name}
						class="w-min max-h-32 token lg shadow-xl"
						style={`transform: rotate(${Math.floor(Math.random() * 360)}deg);`}
					/>
					<div class="font-bold text-red-600">{$gameState.encounter[0].name}</div>
					<div>{`Threat: ${$gameState.encounter[0].threat}`}</div>
				</div>
			{/if}
		</div>
		<div class="flex flex-row max-h-20 p-3 gap-3 overflow-scroll">
			{#each $gameState.inPlay as intruder (intruder.id)}
				<InPlayToken {intruder} />
			{/each}
		</div>
	</div>
</Mobile>
{#if showModal}
	<Modal
		onClose={() => {
			showModal = false;
		}}
	/>
{/if}

<style>
	.token {
		border-radius: 100%;
	}
	.token.sm {
		box-shadow: 0px 0px 10px;
	}
	.token.lg {
		box-shadow: 0px 0px 30px;
	}

	.card {
		border-radius: 10px;
		@apply border border-yellow-700 p-4 relative;
	}

	.card > .close-card {
		border-radius: 3px;
		line-height: 10px;
		@apply absolute top-2 right-2 border border-yellow-700 p-1;
	}
</style>
