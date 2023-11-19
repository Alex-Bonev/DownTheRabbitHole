<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	export let duration: number = 1;

	const animation = ['.', '..', '...'];
	let pos = 0;

	let interval: NodeJS.Timeout | undefined;
	onMount(() => {
		interval = setInterval(
			() => {
				if (pos >= animation.length - 1) {
					pos = 0;
				} else {
					pos++;
				}
			},
			(duration * 1000) / animation.length
		);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
</script>

{animation[pos]}
