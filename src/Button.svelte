<script>
	export let disabled = false;
    export let label;
	export let action;	
</script>

<button on:click={ action } disabled={ disabled } class:disabled >
    { label }
</button>

<style>
    button {
		background: #e3e3e3;
		border: unset;
		border-radius: 6px;
		padding: .75rem 1.5rem;
		margin: 5px;
		cursor: pointer;
	}

	button:hover {
		background: #adadad;
	}
    
	button:active {
		background: #6e6e6e;
		color: white;
	}

	.disabled, .disabled:hover, .disabled:active {
		background: #e3e3e3;
		cursor: not-allowed;
	}
</style>