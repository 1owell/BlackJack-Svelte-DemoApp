<script>
    import { fly } from 'svelte/transition';
    import Card from "./Card.svelte";

    export let cards;

    let isHovering = false;

    function mouseOver() { 
        isHovering = true
    }
    function mouseOut() { isHovering = false }

    function getX(index) {
        if (isHovering) {
            return (index + 1) * 100;
        }
        return (index + 1) * 50;
    }
</script>

<div on:mouseover={ mouseOver } 
     on:mouseout={ mouseOut }
     on:focus={ mouseOver }
     on:blur={ mouseOut } >
    <p>{ isHovering }</p>
    <div class="section">
        <div class="hand">
            {#each cards as card, idx }
                <div class="card-container">
                    <Card {...card} />
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .section {
        display: flex;
        justify-content: center;
    }

    .hand {
        display: flex;
        justify-content: center;
        max-width: 300px;
    }
    
    .hand:hover {
        max-width: 100%;
    }

    .card-container {
        overflow: visible;
    }
</style>