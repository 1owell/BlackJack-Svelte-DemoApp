<script>
	import Hand from "./Hand.svelte";
	import Button from "./Button.svelte";
	import { fade } from "svelte/transition"
	import { game } from "./Models/Game";
</script>

<style>
	:global(body){
        background-image: url("../tablebg.jpg");
		background-position: center;
    }

	h3 {
		color: white;
	}

	.controls {
		display: flex;
		justify-content: center;
	}

	main {
		text-align: center;
		padding: 1em;
		overflow: hidden;
	}
</style>