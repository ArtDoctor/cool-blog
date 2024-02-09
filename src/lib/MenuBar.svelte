<script>
  export let tweener;
  export let menuItems;
  import { Router, Route, Link, navigate } from "svelte-navigator";
</script>

<Router>
  <div class="menubar-group">
    {#each menuItems as {name, link}, i} 
    <button class="menubar-item" type="button"
    on:click={ 
        () => tweener.set(0)
        .then(() => { 
          navigate(link);
          tweener.set(1); 
        })}>
        {name}
      </button>
    {/each}
  </div>
</Router>
