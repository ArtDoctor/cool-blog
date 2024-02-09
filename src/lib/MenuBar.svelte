<script>
  export let tweener;
  export let menuItems;
  import { Router, Route, Link, navigate } from "svelte-navigator";
</script>

<Router>
  <div class="menuElementGroup">
    {#each menuItems as {name, link}, i} 
    <button class="menuBarItem" type="button"
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

<style>
  .menuElementGroup {
    display: block; 
    margin: auto;
    justify-content: space-around;
  }

  .menuBarItem {
    will-change: filter;
    transition: filter 250ms;
    margin-left: 4px;
    margin-right: 4px;
  }

  .menuBarItem:hover {
    filter: drop-shadow(2px 2px 4px #646cff);
  }
</style>
