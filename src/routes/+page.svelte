<script lang="ts">
	import bag from '$stores/bag';

	function increment(b: { abc: number }) {
		b.abc++;
		return b;
	}
</script>

<div class="text-5xl">Welcome to SvelteKit</div>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button
	on:click={() => {
		$bag = increment($bag);
		localStorage.setItem('game', JSON.stringify($bag));
	}}>update {$bag.abc}</button
>
