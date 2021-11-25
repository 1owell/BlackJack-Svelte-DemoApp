<script>
    import Card from "./Card.svelte";
    import { fly } from "svelte/transition";
    import { flip } from "svelte/animate";

    export let hand;
</script>

<div class="hand" >    
    {#each hand.cards as card (card) }
        <div animate:flip={{}} class="card" in:fly={{duration: 1000, y: -1000, x: 1000 }}>
            <Card { card } />
        </div>
    {:else}
        <p>No Cards</p>
    {/each}
</div>

<style>
    .hand {
        justify-content: center;
        align-items: center;
        display: grid;
        grid-template-columns: repeat(auto-fit,  minmax(10px, max-content)) ;
    }

    .card {
        margin: 1em;
        width: fit-content;
        overflow: visible;
    }

    @media (orientation: landscape) {
        .hand {
            min-height: 40vh;
        }
    }

    @media (orientation: portrait) {
        .hand {
            height: 60vw;
        }
    }
</style>