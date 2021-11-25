<script>
    import Card from "./Card.svelte";
    import { fly } from 'svelte/transition';

    export let hand;
</script>

<div class="section" >
    <div class="hand">
        {#each hand.cards as card }
            <div class="card-container" in:fly={{duration: 1000, y: -1000, x: 1000 }}>
                <Card { card } />
            </div>
        {:else}
            <p>No Cards</p>
        {/each}
    </div>
</div>

<style>
    .section {
        height: 25rem;
        display: flex;
        justify-content: center;
    }

    .hand {
        display: flex;
        justify-content: left;
    }

    .card-container {
        overflow: visible;
    }
</style>