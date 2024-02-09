<script lang="ts">
  import { onMount } from 'svelte';
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import MenuBar from './lib/MenuBar.svelte'
  import { Router, Route, Link } from "svelte-navigator";
  
	import { tweened } from 'svelte/motion';
	import { cubicOut, sineIn, sineOut } from 'svelte/easing';

  import ArticlesRoute from "./routes/articles/index.svelte";
  import AboutRoute from "./routes/about/index.svelte";

  const base = "/";
  
  let mainMenuItems = [
    { name: 'Home', link: base.concat('home') },
    { name: 'Articles', link: base.concat('articles') },
    { name: 'About', link: base.concat('about') },
  ]

  const progress = tweened(0, {
    duration: 320,
    easing: sineOut
  });
  progress.set(1);
</script>

<Router>
  <main style="overflow: hidden;">
    <body>
      <div class="container">
        <h1 class="title">Tech Blog</h1>
        <div style="opacity: {$progress}; width: 100%; height: 100%">
          <MenuBar tweener={progress} menuItems={mainMenuItems}/>
          <div class="content"> 
            <Route path={base}>
              <h2 style="text-align: center;"> Welcome!</h2>
            </Route>
            <Route path="{base}/home/">
              <h2 style="text-align: center;"> Welcome!</h2>
            </Route>
            <Route path="{base}/about/" component={AboutRoute}/>
            <Route path="{base}/articles/*" component={ArticlesRoute}>
              <ArticlesRoute/>
            </Route>
          </div>
        </div>
      </div>
    </body>
  </main>
</Router>
