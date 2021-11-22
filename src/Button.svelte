<script>
    export let label;
    export let isDestructive = false;

    let defaults = { normal: '#d4b0b6', hover: '#ff8097', active: '#b32e47' }
    let reds = { normal: '#d4b0b6', hover: '#ff8097', active: '#b32e47' } 
    let colors = isDestructive ? reds : defaults;
</script>

<button style="--c: { colors.normal }; --ch: { colors.hover }; --ca: { colors.active }">
    { label }
</button>

<style>
    button {
		background: var(--c);
		border: unset;
		border-radius: 6px;
		padding: .75rem 1.5rem;
		cursor: pointer;
	}

	button:hover {
		background: var(--ch);
	}
    
	button:active {
		background: var(--ca);
	}
</style>