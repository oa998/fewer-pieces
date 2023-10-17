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
		background-color: #1e1e32;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3Cpath id='p' d='M89 17c71 35 1 79-39 50-64-45 23-103 86-37 52 54-49 93-86 60-27-23 17-72 51-49 35 24 2 108-69 63-67-43-19-125 57-87z' /%3E%3Ccircle id='a' r='2' %3E%3CanimateMotion dur='40s' repeatCount='5'%3E%3Cmpath href='%23p' /%3E%3C/animateMotion%3E%3C/circle%3E%3Ccircle id='b' r='2' %3E%3CanimateMotion begin='-10s' dur='40s' repeatCount='5' keyPoints='1%3B0' keyTimes='0%3B1' calcMode='linear'%3E%3Cmpath href='%23p' /%3E%3C/animateMotion%3E%3C/circle%3E%3Ccircle id='e' r='2' %3E%3CanimateMotion begin='-34s' dur='40s' repeatCount='5' keyPoints='1%3B0' keyTimes='0%3B1' calcMode='linear'%3E%3Cmpath href='%23p' /%3E%3C/animateMotion%3E%3C/circle%3E%3Ccircle id='c' r='2' %3E%3CanimateMotion begin='-20s' dur='40s' repeatCount='5' keyPoints='1%3B0' keyTimes='0%3B1' calcMode='linear'%3E%3Cmpath href='%23p' /%3E%3C/animateMotion%3E%3C/circle%3E%3Ccircle id='d' r='2' %3E%3CanimateMotion begin='-30s' dur='40s' repeatCount='5'%3E%3Cmpath href='%23p' /%3E%3C/animateMotion%3E%3C/circle%3E%3Ccircle id='f' r='2' %3E%3CanimateMotion begin='-15s' dur='40s' repeatCount='5'%3E%3Cmpath href='%23p' /%3E%3C/animateMotion%3E%3C/circle%3E%3C/defs%3E%3Cg fill='%23AEF' %3E%3Cg stroke='%23FFF' stroke-width='0'%3E%3Cuse href='%23a' x='100' y='100'%3E%3C/use%3E%3Cuse href='%23b' x='300' y='300'%3E%3C/use%3E%3Cuse href='%23c' x='500' y='500'%3E%3C/use%3E%3Cuse href='%23d' x='700' y='700'%3E%3C/use%3E%3Cuse href='%23a' x='900' y='0'%3E%3C/use%3E%3Cuse href='%23b' x='1100' y='700'%3E%3C/use%3E%3Cuse href='%23c' x='1300' y='300'%3E%3C/use%3E%3Cuse href='%23d' x='1500' y='500'%3E%3C/use%3E%3Cuse href='%23a' x='200' y='400'%3E%3C/use%3E%3Cuse href='%23b' x='400' y='600'%3E%3C/use%3E%3Cuse href='%23f' x='600' y='800'%3E%3C/use%3E%3Cuse href='%23d' x='800' y='200'%3E%3C/use%3E%3Cuse href='%23b' x='1000' y='0'%3E%3C/use%3E%3Cuse href='%23a' x='1200' y='400'%3E%3C/use%3E%3Cuse href='%23c' x='1400' y='1000'%3E%3C/use%3E%3Cuse href='%23d' x='1600' y='200'%3E%3C/use%3E%3Cuse href='%23a' x='50' y='750'%3E%3C/use%3E%3Cuse href='%23b' x='150' y='600'%3E%3C/use%3E%3Cuse href='%23c' x='350' y='800'%3E%3C/use%3E%3Cuse href='%23d' x='450' y='150'%3E%3C/use%3E%3Cuse href='%23b' x='550' y='50'%3E%3C/use%3E%3Cuse href='%23a' x='750' y='600'%3E%3C/use%3E%3Cuse href='%23f' x='650' y='400'%3E%3C/use%3E%3Cuse href='%23c' x='950' y='200'%3E%3C/use%3E%3Cuse href='%23b' x='1350' y='700'%3E%3C/use%3E%3Cuse href='%23d' x='1250' y='400'%3E%3C/use%3E%3Cuse href='%23c' x='1050' y='550'%3E%3C/use%3E%3Cuse href='%23a' x='1450' y='50'%3E%3C/use%3E%3Cuse href='%23a' x='-100' y='0'%3E%3C/use%3E%3Cuse href='%23b' x='0' y='200'%3E%3C/use%3E%3Cuse href='%23c' x='-50' y='400'%3E%3C/use%3E%3Cuse href='%23d' x='50' y='600'%3E%3C/use%3E%3Cuse href='%23b' x='250' y='-50'%3E%3C/use%3E%3Cuse href='%23a' x='640' y='0'%3E%3C/use%3E%3Cuse href='%23f' x='390' y='-80'%3E%3C/use%3E%3Cuse href='%23e' x='450' y='300'%3E%3C/use%3E%3Cuse href='%23b' x='820' y='700'%3E%3C/use%3E%3Cuse href='%23d' x='970' y='400'%3E%3C/use%3E%3Cuse href='%23c' x='1150' y='-40'%3E%3C/use%3E%3Cuse href='%23a' x='1250' y='820'%3E%3C/use%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
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
