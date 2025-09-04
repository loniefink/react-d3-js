# React + Vite

## Map of the World
_Create Topographical map projection of country data on the world_

### Topographical map
[topo map](https://observablehq.com/@d3/world-map)

  • topojson data requires transformation to geojson in memory for easier presentation w/ d3
    - using bostocks topojson.feature - converts TopoJSON to GeoJSON
    - split geoJSON to countries (-> land) and interiors (borders) 
    - added latitude and longitude lines (graticules)

### Countries data for projection
[countries data](https://unpkg.com/world-atlas@2.0.2/countries-50m.json)

• you can use [mapshaper](https://mapshaper.org/) to generate at various complexities (accuracies) and export them to various formats (Shapefile, GeoJSON, TopoJSON, JSON records, CSV, SVG)
  ° [Line Shaper](https://bost.ocks.org/mike/simplify/) shows an example of this



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
