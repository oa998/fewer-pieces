<script lang="ts">
	import type { IntruderToken } from '$gameplay/nemesis';

	export let intruder: IntruderToken;
</script>

<div class="relative">
	<img
		src={intruder.src}
		alt={intruder.name}
		class="token sm max-h-[90%]"
		style={`transform: rotate(${Math.floor(Math.random() * 360)}deg);`}
	/>
	<div
		class="absolute circle bottom-0 right-0 bg-red-700 text-white h-full max-h-[20pt] w-full max-w-[20pt] text-center"
	>
		0
	</div>
</div>

<style>
	.circle {
		border-radius: 100%;
	}
	.token {
		border-radius: 100%;
	}
	.token.sm {
		@apply shadow-[0_0_20px_0px_rgba(0,0,0,1)] shadow-red-500;
	}
</style>
