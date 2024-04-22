<script lang="ts">
	import { writable, type Writable } from 'svelte/store';

	type Roll = { value: number };
	const d4s = writable<Roll[]>([]);
	const d6s = writable<Roll[]>([]);
	const d8s = writable<Roll[]>([]);
	const d10s = writable<Roll[]>([]);
	const d12s = writable<Roll[]>([]);
	const d20s = writable<Roll[]>([]);

	const update = (num: 1 | -1, store: Writable<Roll[]>) => {
		store.update((v) => {
			let length = v.length;
			if (num == -1) length = Math.max(0, length - 1);
			if (num == 1) length = Math.min(5, length + 1);
			return new Array(length).fill({ value: 0 });
		});
	};

	const generate = () => {
		$d4s = $d4s.map(() => ({ value: Math.floor(Math.random() * 4) + 1 }));
		$d6s = $d6s.map(() => ({ value: Math.floor(Math.random() * 6) + 1 }));
		$d8s = $d8s.map(() => ({ value: Math.floor(Math.random() * 8) + 1 }));
		$d10s = $d10s.map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
		$d12s = $d12s.map(() => ({ value: Math.floor(Math.random() * 12) + 1 }));
		$d20s = $d20s.map(() => ({ value: Math.floor(Math.random() * 20) + 1 }));
	};
	const clear = () => {
		$d4s = $d4s.map(() => ({ value: 0 }));
		$d6s = $d6s.map(() => ({ value: 0 }));
		$d8s = $d8s.map(() => ({ value: 0 }));
		$d10s = $d10s.map(() => ({ value: 0 }));
		$d12s = $d12s.map(() => ({ value: 0 }));
		$d20s = $d20s.map(() => ({ value: 0 }));
	};
	const reset = () => {
		$d4s = [];
		$d6s = [];
		$d8s = [];
		$d10s = [];
		$d12s = [];
		$d20s = [];
	};
</script>

<div class="w-full h-[100vh] max-w-md max-h-[1000px] text-xs">
	<div class="config">
		<div class="updown">
			<button on:click={() => update(-1, d4s)}>-</button>
			<span>D4 - ({`${$d4s.length}`})</span>
			<button on:click={() => update(1, d4s)}>+</button>
		</div>
		<div class="updown">
			<button on:click={() => update(-1, d6s)}>-</button>
			<span>D6 - ({`${$d6s.length}`})</span>
			<button on:click={() => update(1, d6s)}>+</button>
		</div>
		<div class="updown">
			<button on:click={() => update(-1, d8s)}>-</button>
			<span>D8 - ({`${$d8s.length}`})</span>
			<button on:click={() => update(1, d8s)}>+</button>
		</div>
		<div class="updown">
			<button on:click={() => update(-1, d10s)}>-</button>
			<span>D10 - ({`${$d10s.length}`})</span>
			<button on:click={() => update(1, d10s)}>+</button>
		</div>
		<div class="updown">
			<button on:click={() => update(-1, d12s)}>-</button>
			<span>D12 - ({`${$d12s.length}`})</span>
			<button on:click={() => update(1, d12s)}>+</button>
		</div>
		<div class="updown">
			<button on:click={() => update(-1, d20s)}>-</button>
			<span>D20 - ({`${$d20s.length}`})</span>
			<button on:click={() => update(1, d20s)}>+</button>
		</div>
	</div>
	<div class="actionbtns">
		<button on:click={reset}>Reset</button>
		<button on:click={clear}>Clear</button>
		<button on:click={generate}>Roll</button>
	</div>
	<div class="display">
		<span>D4</span><span> {JSON.stringify($d4s.map((v) => v.value))}</span>
		<span>D6</span><span> {JSON.stringify($d6s.map((v) => v.value))}</span>
		<span>D8</span><span> {JSON.stringify($d8s.map((v) => v.value))}</span>
		<span>D10</span><span> {JSON.stringify($d10s.map((v) => v.value))}</span>
		<span>D12</span><span> {JSON.stringify($d12s.map((v) => v.value))}</span>
		<span>D20</span><span> {JSON.stringify($d20s.map((v) => v.value))}</span>
	</div>
</div>

<style lang="postcss">
	button {
		@apply p-2 border border-black rounded;
	}
	button ~ span {
		@apply px-2 text-center whitespace-nowrap;
	}
	.updown {
		@apply flex flex-row items-center gap-3 justify-center;
	}
	.actionbtns {
		grid-template-columns: 1fr 1fr 1fr;
		@apply grid w-full gap-2 py-5 px-2;
	}
	.config {
		grid-template-columns: 1fr 1fr;
		@apply font-mono grid gap-3 p-2 bg-slate-300;
	}
	.display {
		grid-template-columns: max-content 1fr;
		@apply font-mono text-3xl grid gap-8;
	}
</style>
