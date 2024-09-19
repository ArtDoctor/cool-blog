/*import { 
	vitePreprocess 
} from '@sveltejs/vite-plugin-svelte'*/

import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

import {
    vitePreprocess
} from '@sveltejs/kit/vite';

import { mdsvex } from 'mdsvex';

// add ".svx" to the extensions array
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html', '.svx', '.md'];

const commonPreprocessors = [
	mdsvex({ extensions: ['.svx', '.md'] }),
	vitePreprocess()
];

const isBuilding = process.argv.includes('build');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions:  ['.svelte', '.md', '.svx'],
	resolve: { extensions },
	module: {
		rules: [
			{
				// tell svelte-loader to handle svx files as well
				test: /.(svelte|html|svx)$/,
				use: {
					loader: 'svelte-loader',
					options: {
						preprocess: mdsvex()
					}
				}
			}
		]
	},
  	preprocess: [...commonPreprocessors],
	kit: {
        /*adapter: adapter({
			fallback: '404.htmp',
			strict: false,
			pages: 'build',
			assets: 'build',
		}),*/
		paths: {
			base: './blog',
        },
    }
}

if(isBuilding) {
	config.kit.paths.assets = 'https://jukaio.github.io/blog/assets'
}

export default config;
