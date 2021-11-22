<script>
    export let imageURL;
    export let value;
    export let suit;

    $: src = imageURL === '' ? "card_back.jpg" : imageURL;
</script>

<div>
    <img src={ src } alt="{ value } of { suit }" draggable="false" width="226" height="314"> 
</div>

<style>
    div {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 20px;
        overflow: hidden;
        margin: 1em;
    }

    img {
        outline: 8px solid white; 
        outline-offset: -5px;
    }
</style>