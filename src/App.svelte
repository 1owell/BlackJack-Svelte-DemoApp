<script>
	import Hand from "./Hand.svelte";
	import Button from "./Button.svelte";
	import { fade } from "svelte/transition"
	import { game } from "./Models/Game";

	$: title = $game.isActive ? $game.player.handValue : 'Blackjack';
	$: { document.title = title }
	$: startLabel = $game.isActive ? 'Restart' : 'Deal Me';
</script>

<main>
	<h3>Dealer</h3>
	<Hand hand={ $game.dealer } />
	<div class="controls">
		<Button label={ startLabel } disabled={ $game.isDealing } action={ game.startGame } />
		{#if $game.isActive}
			<div transition:fade="{{duration: 600}}">
				<Button label="Stand" disabled={ !$game.playerTurn } action={ game.stand } />
				<Button label="Hit" disabled={ !$game.playerTurn } action={ game.hit }/>
			</div>
		{/if}
	</div>
	<Hand hand={ $game.player } />
</main>

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