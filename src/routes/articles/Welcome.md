# Welcome!
<p style="text-align: right;">01/07/2023</p>

<script>
  import Highlight from "svelte-highlight";
  import typescript from "svelte-highlight/languages/typescript";
  import "../../styles/highlight-default.css"

  const code = "const add = (a: number, b: number) => a + b;";
  // alt*="Value" // Value contains for alt text
  // alt~="Value" // Value contains but is spaced off
  // alt^="Value" // Value is at begin of alt text
  // alt$="Value" // Value is at end of alt text
</script>

<style>
  img[alt*="Cat"]{
    width: 200px;
  }
</style>

## Introduction

My name is David Naußed and this is my blog. :)

It's an attempt to share knowledge, think about ideas and maybe rant about programming; I am very unsure about the last one, but better safe than sorry.

Either way, you will notice that this website is still very much under construction.

There is not much to say about me: On the internet I prefer having a low-profile, I work as a game developer and I like computers.

Let's try out my website!

## The Website

This website was with Svelte and some other tools associated with it.
Most (if not all) articles are and will be written using markdown enabled by ``mdsvex``.

Let's try out some of the features!

First of all we have bullet points... I hopse so at least:
* **Bold**
* *Italic*
* ***Bold and Italic***

1. First
2. Second
   1. Second-First
   2. Second-Second
3. Third

Quotes:
> C++ is a great language
>> Nested quote
>>> Deeper nesting

And the most important feature. Code:
<Highlight language={typescript} code="const add = (a: number, b: number) => a + b;"/>

![Cat][def] ![Cat][def]

[def]: ../src/assets/cat.jpeg