<script lang="ts">
	// import bag from '$stores/bag';
	let x = { abc: 0 };
	function increment(b: { abc: number }) {
		b.abc++;
		return b;
	}
</script>

<div class="text-5xl">Welcome to SvelteKit</div>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button
	on:click={() => {
		x = increment(x);
		// localStorage.setItem('game', JSON.stringify($bag));
	}}>update {x.abc}</button
>
