<script>
    export let card

    $: src = card.faceDown ? "card_back.jpg" : card.imageURL;
</script>

<div>
    <img src={ src } class="{ card.faceDown ? 'face-down' : 'face-up' }" alt="{ card.value } of { card.suit }" draggable="false"> 
</div>

<style>
    div {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        overflow: hidden;
        background-color: white;
    }

    .face-down {
        padding: 8px;
    }

    .face-up {
        outline: 8px solid white; 
        outline-offset: -5px;
    }

    img {
        display: block;
        width: auto;
        max-height: 314px;
    }

    @media (orientation: landscape) {
        img {
            min-height: 36vh;
            border-radius: 2vh;
        }

        div {
            border-radius: 2vh;
        }
    }

    @media (orientation: portrait) {
        img {
            height: 50vw;
            border-radius: 2vw;
        }

        div {
            border-radius: 2vw;
        }
    }
</style>