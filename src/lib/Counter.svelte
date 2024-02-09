<script lang="ts">
  let count: number = 0
  const increment = () => {
    count += 1
  }
  $: doubled = count * 2;
  $: if (count >= 10) {
		alert('count is dangerously high!');
		count = 9;
	}

  let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}
  let isChecked = true;
</script>

{#if user.loggedIn}
	<button on:click={toggle}> Log out </button>
{/if}

{#if !user.loggedIn}
	<button on:click={toggle}> Log in </button>
{/if}

<button on:click={increment}>
  count is {count}
</button>

<label><output> {doubled} </label>
<label><input type="checkbox" bind:checked={isChecked} />  {isChecked} </label>