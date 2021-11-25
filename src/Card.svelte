<script>
    export let card

    $: src = card.faceDown ? "card_back.jpg" : card.imageURL;
</script>

<div>
    <img src={ src } alt="{ card.value } of { card.suit }" draggable="false"> 
</div>

<style>
    div {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        overflow: hidden;
    }

    img {
        width: auto;
        max-height: 314px;
        outline: 8px solid white; 
        outline-offset: -5px;
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
            border-radius: 2vw
        }

        div {
            border-radius: 2vw;
        }
    }
</style>