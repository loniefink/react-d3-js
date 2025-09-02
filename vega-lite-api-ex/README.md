
# React, D3, vega-lite-api example
https://www.youtube.com/watch?v=2LhoCfjm8R4&t=3009s

Using a [V2 runtime](https://github.com/vizhub-core/vizhub-runtime#v2-runtime) template

The template uses [rollup](https://rollupjs.org/introduction/) and offers JSX support.
This data visualization is run after being bundled by rollup.
enable rollup from commandline
`$ npm install --global rollup`
`$ rollup main.js --file bundle.js --format iife`

file structure
`
bundle.js (generated)
index.html
index.js
README.md (this file)
vis.js
getData.js
config.js
`
