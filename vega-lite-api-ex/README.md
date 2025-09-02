# React, D3, vega-lite-api example


## Marks & Channels
### how to choose between based upon attribute types & tasks
Marks: 
• point
• line
• area

Channels:
• Position (on screen)
• color (hue, saturation, luminosity)
• size (relative)
• shape ()

### Rows -> Marks, Columns -> Channels

|------------------------------|
| channels   | Cat | Ord | Qan |
| :--------: | :-: | :-: | :-: |
| x          |     |     |  X  |
| y          |     |     |  X  |
| size       |     |     |  X  |
| luminosity |     |  X  |  X  |
| hue        |  X  |     |     |
|------------------------------|
• _Cat: Categorical_
• _Ord: Ordered_
• _Qan: Quantitative_


## x & y config for basic use
Graph examples 


## React, D3, vega-lite-api example
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
