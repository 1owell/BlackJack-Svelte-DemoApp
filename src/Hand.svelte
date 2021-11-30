<script>
    import Card from "./Card.svelte";
    import { fly } from "svelte/transition";
    import { circOut } from "svelte/easing";
    import { flip } from "svelte/animate";
</script>



<style>
    p {
        color: lightgray;
    }

    .hand {
        justify-content: center;
        align-items: center;
        display: grid;
        grid-auto-columns: minmax(10px, max-content);
        grid-auto-flow: column;
        grid-template-columns: repeat(auto-fit,  minmax(10px, max-content));
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