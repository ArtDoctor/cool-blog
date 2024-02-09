<script lang="ts">
    import { tweened } from 'svelte/motion';
	import { cubicOut, sineIn, sineOut } from 'svelte/easing';
    
    import { Router, Route, Link, navigate } from "svelte-navigator";
    
    import ReactiveURL from '../../lib/ReactiveURL';
    
    import DefaultPage from '../../lib/Default.svelte'
    import Default from '../../lib/Default.svelte';
    import { children } from 'svelte/internal';
    
    const base = "/blog/articles";

    const pageModules = import.meta.glob("../**/*.md", { eager: true });
    const pageModulesRaw = import.meta.glob("../**/*.md", { eager: true, as: "raw" });


    const directories: Map<string, string> = new Map();
    const pageLookup: Map<string, {title: string, component: any, sourcePath: string}> = new Map();

    function toLink(page: string) {
        return page
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("./", "/")
        .replaceAll(".md", "");
    }

    function toBetterSource(page: string) {
        return page.replace("csharp", "C#");
    }

    for(const page in pageModules) {
        const link = toLink(page);

        const module = pageModules[page] as any;
        pageLookup.set(link, {title: page, component: module.default, sourcePath: toBetterSource(page)});
    }
    
    for(const page in pageModulesRaw) {
        const link = toLink(page);
        
        const source = pageModulesRaw[page];
        const firstLine = source.split('\n')[0];
        const title = firstLine.replace(/^(#+)\s*/, '');

        let item = pageLookup.get(link);

        item.title = title;
    }

    const childLookup : Map<string, string[]> = new Map();
    const parentLookup : Map<string, string> = new Map();

    function createLink(parent : string, child : string) {
        if(parentLookup.has(child)) {
            return;
        }
        parentLookup.set(child, parent);
        if(!childLookup.has(parent)) {
            childLookup.set(parent, []);
        }
        const children = childLookup.get(parent);
        children.push(child);
    }

    function isDirectory(path: string) {
        return !pageLookup.has(path);
    }

    function getComponent(link: string) {
        if(pageLookup.has(link)) {
            return pageLookup.get(link).component;
        }
        return Default;
    }

    function getChildren(link: string) {
        if(childLookup.has(link)) {
            return childLookup.get(link);
        }
        return [];
    }

    function getTitle(link: string) {
        if(pageLookup.has(link)) {
            return pageLookup.get(link).title;
        }

        if(directories.has(link)) {
            return directories.get(link);
        }
        return "Error!! NO TITLE FOUND!";
    }

    function constructFullPath(tokens: Array<string>, index : number) {
        let path : string = "";
        for(let i = 0; i <= index; i++) {
            path = path.concat(tokens[i]).concat('/');
        }
        path = path.slice(0, -1);
        return toLink(path);
    }

    for(const [link, page] of pageLookup) {
        let sourcePath = page.sourcePath.split('/');
        let tokens = link.split('/');

        while(tokens.length > 1) {
            const path = constructFullPath(tokens, tokens.length - 1);
            tokens.pop()
            const title = sourcePath.pop();

            if(isDirectory(path)) {
                if(!directories.has(path)) {
                    const parent = constructFullPath(tokens, tokens.length - 1);
                    directories.set(path, title);
                    createLink(parent, path);
                }
            }
        }
    }

    for(const [link, page] of pageLookup) {
        const tokens = link.split('/');
        
        const child = tokens.length - 1;
        const parent = child - 1;

        const childPath = constructFullPath(tokens, child);
        const parentPath = constructFullPath(tokens, parent);
        createLink(parentPath, childPath);
    }

    const progress = tweened(0, {
        duration: 320,
        easing: sineOut
    });

    $: localURL = $ReactiveURL.pathname;
    $: keyURL = $ReactiveURL.pathname.replace("/articles", "");

    progress.set(1);
</script>

<main style="opacity: {$progress}">
    <Router primary={false}>
        <div class="group">
            {#each getChildren(keyURL) as child}
                <button class="element" type="button" on:click={ 
                    () => progress.set(0)
                    .then(() => { 
                        navigate("/articles".concat(child));
                        progress.set(1); 
                    })}
                >
                   <h2>{getTitle(child)}</h2>
                </button>
            {/each}
        </div>

        <Route path={keyURL} component={getComponent(keyURL)} primary={false}/>

        <button class="element" type="button" on:click={ 
            () => progress.set(0)
            .then(() => { 
                navigate(-1);
                progress.set(1); 
            })}
        >
           <h2>{"Back"}</h2>
        </button>
    </Router>
</main>

<style>
    main {
        margin-top: 8px;
    }

    .group {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .element {
        flex: 1 1 90%;
        margin-top: 2px;
        margin-bottom: 2px;
        padding-top: 0px;
        padding-bottom: 0px;
        height: auto;
        will-change: filter;
        transition: filter 250ms;
    }

    .element:hover {
        filter: drop-shadow(2px 2px 4px #646cff);
  }
</style>