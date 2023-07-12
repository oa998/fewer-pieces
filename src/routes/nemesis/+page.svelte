<script lang="ts">
	import Mobile from '$components/mobile.svelte';
	import InPlayIntruderModal from '$components/nemesis/InPlayIntruderModal.svelte';
	import InPlayToken from '$components/nemesis/InPlayToken.svelte';
	import SurpriseAttackPenant from '$components/nemesis/SurpriseAttackPenant.svelte';
	import Token from '$components/nemesis/Token.svelte';
	import gameState, {
		DevelopmentRules,
		EncounterMessages,
		type IntruderToken
	} from '$gameplay/nemesis/GameState';
	import mechanics from '$gameplay/nemesis/mechanics';
	import Icon from '@iconify/svelte';

	/*
		New game
		- choose how many players

		Develop the bag

		Encounter
	
	*/

	const develop = () => ($gameState = mechanics.develop($gameState));

	const developDone = () => ($gameState = mechanics.developEnd($gameState));

	const encounter = () => ($gameState = mechanics.encounter($gameState));

	const encounterDone = () => ($gameState = mechanics.encounterDone($gameState));

	const resetGame = () => ($gameState = mechanics.resetGame(4));

	const returnToBag = (id: string) => ($gameState = mechanics.returnToBag($gameState, id));
	const kill = async (id: string) => ($gameState = mechanics.kill($gameState, id));

	const showClickedIntruder = (e: CustomEvent<IntruderToken>) =>
		($gameState = mechanics.clickInPlayIntruder($gameState, e.detail.id));

	const hideClickedIntruder = () => ($gameState = mechanics.unclickInPlayIntruder($gameState));

	$: {
		console.log({ gameState: $gameState });
	}
</script>

<Mobile>
	<div slot="image" class="relative">
		<button class="absolute top-1 left-1 p-1" on:click={resetGame}>
			<Icon icon="ri:refresh-line" style="font-size:large" color="gray" />
		</button>
		<button class="absolute top-1 right-1 p-1">
			<Icon icon="ion:eye-outline" style="font-size:large" color="gray" />
		</button>
		<img src="nemesis2.webp" alt="nemesis" class="w-full h-auto landscape:max-w-xs" />
	</div>

	<div slot="left-side-panel">
		<div class="flex flex-col gap-2 items-stretch p-2">
			<div class="text-blue-400 text-center">{`Tokens in bag: ${$gameState.inBag.length}`}</div>
			<button
				class="text-white border border-yellow-700 bg-yellow-600 p-3 disabled:bg-slate-600 disabled:text-slate-800"
				style="border-radius: 10pt;"
				disabled={$gameState.developing.length > 0 ||
					$gameState.inBag.length === 0 ||
					$gameState.encounter.length > 0}
				on:click={develop}>Develop</button
			>

			<button
				class="text-white border border-red-900 bg-red-800 p-3 disabled:bg-slate-600 disabled:text-slate-800"
				style="border-radius: 10pt;"
				disabled={$gameState.encounter.length > 0 || $gameState.inBag.length === 0}
				on:click={encounter}>Encounter</button
			>
		</div>
	</div>

	<div slot="right-side-panel" class="flex flex-col text-yellow-300 p-3 h-full justify-between">
		<div class="flex flex-row portrait:flex-col justify-around items-center gap-1">
			<!-- Development card -->
			{#if $gameState.developing.length > 0}
				<div class="card landscape:h-full">
					<button class="close-card" on:click={developDone}>✕</button>
					<div class="portrait:hidden">
						<Token intruder={$gameState.developing[0]} size="lg" color="yellow" />
					</div>
					<div class="landscape:hidden">
						<Token intruder={$gameState.developing[0]} size="md" color="yellow" />
					</div>

					<div class="italic text-xs text-center px-2">
						{DevelopmentRules[$gameState.developing[0].name].message}
					</div>
				</div>
			{/if}

			<!-- Encounter card -->
			{#if $gameState.encounter.length > 0}
				<div class="card landscape:h-full">
					<button class="close-card" on:click={encounterDone}>✕</button>
					<div class="w-max relative">
						<Token intruder={$gameState.encounter[0]} size="sm" color="red" />
						<div class="absolute right-0 bottom-0">
							<SurpriseAttackPenant threat={$gameState.encounter[0].threat} />
						</div>
					</div>
					{#if EncounterMessages[$gameState.encounter[0].name]}
						<div class="italic text-xs text-center px-2">
							{EncounterMessages[$gameState.encounter[0].name].message}
						</div>
					{/if}
				</div>
			{/if}
		</div>
		<div class="flex flex-row min-h-[6rem] max-h-2 p-3 gap-3 overflow-scroll">
			{#each $gameState.inPlay as intruder (intruder.id)}
				<InPlayToken {intruder} on:intruderClicked={showClickedIntruder} />
			{/each}
		</div>
	</div>
</Mobile>
{#if $gameState.clickedInPlayID}
	<InPlayIntruderModal
		intruderId={$gameState.clickedInPlayID}
		on:killIntruder={(e) => kill(e.detail)}
		on:returnToBag={(e) => returnToBag(e.detail)}
		onClose={() => hideClickedIntruder()}
	/>
{/if}

<style>
	.card {
		border-radius: 10px;
		@apply border border-yellow-700 p-4 relative flex flex-col items-center gap-2 flex-1 w-full justify-center;
	}

	.card > .close-card {
		border-radius: 3px;
		line-height: 10px;
		@apply absolute top-2 right-2 border border-yellow-700 p-1;
	}
</style>
