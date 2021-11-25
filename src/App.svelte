<script>
	import Hand from "./Hand.svelte";
	import Button from "./Button.svelte";
	import { game } from "./Stores/GameStore";
</script>

<main>
	<Hand hand={ $game.dealer } />
	<div>
		<Button label="Deal Me" action={ async () => { game.startGame() } } />
		<Button label="Stand" disabled={ !$game.playerTurn } action={ async () => { game.stand() } } />
		<Button label="Hit" disabled={ !$game.playerTurn } action={ async () => { game.hit() } }/>
	</div>
	<Hand hand={ $game.player } />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		overflow: hidden;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>