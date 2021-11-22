<script>
	import Hand from "./Hand.svelte";
	import Button from "./Button.svelte";

	const card = {
		imageURL: 'https://deckofcardsapi.com/static/img/QS.png',
		value: '8',
		suit: 'HEART'
	}

	const card2 = {
		imageURL: 'https://deckofcardsapi.com/static/img/AH.png',
		value: '8',
		suit: 'HEART'
	}

	let cards = [card, card2];

</script>

<main>
	<Hand {cards} />
	<div>
		<Button label={"Stand"} isDestructive={true} />
		<Button label={"Hit"} />
	</div>
	<Hand {cards} />
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