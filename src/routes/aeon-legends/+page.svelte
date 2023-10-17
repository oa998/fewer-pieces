<script lang="ts">
	import Icon from '@iconify/svelte';
	import { writable } from 'svelte/store';

	type Players = 'Zach' | 'Zach' | 'Boss';
	const originalPlayers: Players[] = ['Alex', 'Alex', 'Zach', 'Zach', 'Boss', 'Boss'];
	const colors = {
		['Alex']: 'lime',
		['Zach']: '#ff9700',
		// ['Boss']: 'black',
		['Boss']: 'white'
	};

	function randomPlayers() {
		let a = originalPlayers.slice(0);
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	const players = writable(randomPlayers());
	const turn = writable(0);

	let player: Players = 'Emme';
	let index = 0;
	$: {
		index = $turn % 6;
		if (index === 0) {
			$players = randomPlayers();
		}
		player = $players[index];
	}

	const graveholdHealth = writable(30);
	const bossHealth = writable(70);
</script>

<div class="flex flex-col landscape:flex-row main bg py-10" style="flex: 1 1 auto">
	<div class="h-[30vh]">
		<button on:click={() => ($turn += 1)} class="w-full h-full flex flex-col items-center p-3">
			<div class="flex flex-row gap-5 p-3 rounded-full bg-opacity-30 bg-white items-center">
				{#each $players as p, i (i)}
					{#if i > index}
						<!-- future -->
						<Icon icon="ri:circle-line" style="font-size:large" color="gray" />
					{:else if i == index}
						<!-- present -->
						<Icon icon="carbon:circle-filled" style="font-size:2em" color={colors[p]} />
					{:else}
						<!-- past -->
						<Icon icon="carbon:circle-solid" style="font-size:large" color={colors[p]} />
					{/if}
				{/each}
			</div>
			{#key $turn}
				<div class="h-[70%] flex items-center show relative">
					<span class="text-[5em] italic" style={`color: ${colors[player]}`}>{player}</span>
				</div>
			{/key}
		</button>
	</div>
	<div class="h-[30vh]">
		<div class="flex flex-row gap-2 p-2 h-full justify-center py-10">
			<button
				on:click={() => $graveholdHealth--}
				class="h-full w-[20%] border border-white border-opacity-30 rounded-lg">{'<'}</button
			>
			<button class="h-full w-[60%] flex flex-col justify-center items-center">
				<div class="text-[6em] font-extrabold">{$graveholdHealth}</div>
				<div class="text-3xl">Gravehold</div>
			</button>
			<button
				on:click={() => $graveholdHealth++}
				class="h-full w-[20%] border border-white border-opacity-30 rounded-lg">{'>'}</button
			>
		</div>
	</div>
	<div class="h-[30vh]">
		<div class="flex flex-row gap-2 p-2 h-full justify-center py-10">
			<button
				on:click={() => $bossHealth--}
				class="h-full w-[20%] border border-white rounded-lg border-opacity-30">{'<'}</button
			>
			<button class="h-full w-[60%] flex flex-col justify-center items-center">
				<div class="text-[6em] font-extrabold">{$bossHealth}</div>
				<div class="text-3xl">Boss</div>
			</button>
			<button
				on:click={() => $bossHealth++}
				class="h-full w-[20%] border border-white rounded-lg border-opacity-30">{'>'}</button
			>
		</div>
	</div>
</div>

<style>
	* {
		@apply text-white;
	}
	.bg {
		background-color: #442233;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1500 1500'%3E%3Cg transform='rotate(46.8 750 750)'%3E%3Cg transform='translate(45 45)'%3E%3Cg transform='scale(0.97)'%3E%3Ccircle r='2000' fill='%2350213d'%3E%3CanimateTransform attributeName='transform' type='scale' repeatCount='indefinite' dur='20s' begin='0s' values='1%3B1.1%3B1' keySplines='.5 0 .5 1%3B0.5 0 .5 1' calcMode='spline'%3E%3C/animateTransform%3E%3C/circle%3E%3Ccircle r='1800' fill='%235b1f49'%3E%3CanimateTransform attributeName='transform' type='scale' repeatCount='indefinite' dur='20s' begin='-0.3s' values='1%3B1.1%3B1' keySplines='.5 0 .5 1%3B0.5 0 .5 1' calcMode='spline'%3E%3C/animateTransform%3E%3C/circle%3E%3Ccircle r='1600' fill='%23641d57'%3E%3CanimateTransform attributeName='transform' type='scale' repeatCount='indefinite' dur='20s' begin='-0.6s' values='1%3B1.1%3B1' keySplines='.5 0 .5 1%3B0.5 0 .5 1' calcMode='spline'%3E%3C/animateTransform%3E%3C/circle%3E%3Ccircle r='1400' fill='%236c1b66'%3E%3CanimateTransform attributeName='transform' type='scale' repeatCount='indefinite' dur='20s' begin='-0.8999999999999999s' values='1%3B1.1%3B1' keySplines='.5 0 .5 1%3B0.5 0 .5 1' calcMode='spline'%3E%3C/animateTransform%3E%3C/circle%3E%3Ccircle r='1200' fill='%23721b77'%3E%3CanimateTransform attributeName='transform' type='scale' repeatCount='indefinite' dur='20s' begin='-1.2s' values='1%3B1.1%3B1' keySplines='.5 0 .5 1%3B0.5 0 .5 1' calcMode='spline'%3E%3C/animateTransform%3E%3C/circle%3E%3Ccircle r='1000' fill='%23751d8a'%3E%3CanimateTransform attributeName='transform' type='scale' repeatCount='indefinite' dur='20s' begin='-1.5s' values='1%3B1.1%3B1' keySplines='.5 0 .5 1%3B0.5 0 .5 1' calcMode='spline'%3E%3C/animateTransform%3E%3C/circle%3E%3Ccircle r='800' fill='%2374229f'%3E%3CanimateTransform attributeName='transform' type='scale' repeatCount='indefinite' dur='20s' begin='-1.7999999999999998s' values='1%3B1.1%3B1' keySplines='.5 0 .5 1%3B0.5 0 .5 1' calcMode='spline'%3E%3C/animateTransform%3E%3C/circle%3E%3Ccircle r='600' fill='%236f2ab5'%3E%3CanimateTransform attributeName='transform' type='scale' repeatCount='indefinite' dur='20s' begin='-2.1s' values='1%3B1.1%3B1' keySplines='.5 0 .5 1%3B0.5 0 .5 1' calcMode='spline'%3E%3C/animateTransform%3E%3C/circle%3E%3Ccircle r='400' fill='%236333cd'%3E%3CanimateTransform attributeName='transform' type='scale' repeatCount='indefinite' dur='20s' begin='-2.4s' values='1%3B1.1%3B1' keySplines='.5 0 .5 1%3B0.5 0 .5 1' calcMode='spline'%3E%3C/animateTransform%3E%3C/circle%3E%3Ccircle r='200' fill='%234A3EE5'%3E%3CanimateTransform attributeName='transform' type='scale' repeatCount='indefinite' dur='20s' begin='-2.6999999999999997s' values='1%3B1.1%3B1' keySplines='.5 0 .5 1%3B0.5 0 .5 1' calcMode='spline'%3E%3C/animateTransform%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;
	}

	.show {
		animation: opacity-kf 500ms ease-in;
	}

	@keyframes opacity-kf {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
