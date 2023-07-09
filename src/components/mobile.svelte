<script lang="ts">
</script>

<div class="flex flex-col landscape:flex-row" style="flex: 1 1 auto">
	<div class="bg-black w-full landscape:max-w-xs">
		<slot name="image" />
		<slot name="left-side-panel" />
	</div>
	<div class="bg-black w-full" style="flex: 1 1 auto;">
		<slot name="right-side-panel" />
	</div>
</div>
