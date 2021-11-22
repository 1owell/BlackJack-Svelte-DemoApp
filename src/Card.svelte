<script>
    export let imageURL;
    export let value;
    export let suit;
</script>

<img src={ imageURL } alt="{ value } of { suit }" width=226 height=314 draggable="false"> 

<style>
    img {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 20px;
        outline: 8px solid white;
        outline-offset: -5px;
        margin: 1em;
    }
</style>