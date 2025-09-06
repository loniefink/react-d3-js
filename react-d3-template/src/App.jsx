import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { max, json, scaleSqrt, geoPath, geoNaturalEarth1, geoGraticule  } from 'd3'
import { feature, mesh } from 'topojson-client';
import { useWorldAtlas } from './useWorldAtlas'
import { useData } from './useData'
import './App.css'

const width = 960;
const height = 500;
const projection = geoNaturalEarth1(),
    path = geoPath(projection);
const graticules = geoGraticule();
// used in circle fill w/ colors[r-1]
const colors = [ '#000', '#444', '#666', '#777', '#888' ];
let maxPopulation = 0;
let minPopulation = 0;
const maxRadius = 10;
function getR(thisPopulation) {
    let r = 0;
    if ((maxPopulation - minPopulation) !== 0) {
      r = 4*((thisPopulation - minPopulation)/(maxPopulation - minPopulation));
    }
    return Math.floor(r+1);
}
/*
 *
 * App() 
 *
 */
function App() {
  // Data
  const dataWorld = useWorldAtlas();
  const data = useData();

  // topojson data requires transformation to geojson for easier presentation w/ d3

  if (!dataWorld || !data) {
    return <pre>Loading...</pre>
  }

  /*
  console.log(data[0]);
  maxPopulation = data[0].population;
  minPopulation = data[(data.length-1)].population;
  */

    const sizeValue = (d) => d.dead;
    const sizeScale = scaleSqrt()
        .domain([0,max(data, sizeValue)])
        .range([0, maxRadius]);



  return (
    <svg width={width} height={height}>
      // Marks ( data, xScale, yScale, xValue, yValue, tooltipFormat ) 
        <g className="marks">
      // paths
            <path className="oceans" d={path({type: 'Sphere'})} />
            <path className="latAndLongLines" d={path(graticules())} />
            {
              dataWorld.land.features.map((feature,i) => (
              // req projection
              // line string
              <path className="land" key={i} d={path(feature)} />
            ))} 
            <path className="borders" d={path(dataWorld.interiors)} />
            {
                  data.map((loc,i) => {
                      let r = getR(loc.population);
                      //console.log("r:",r);
                      const[x,y] = projection([loc.lng, loc.lat]);
                      return (
                          <circle opacity={0.2} fill={"#c33"} key={i} cx={x} cy={y} r={sizeScale(sizeValue(loc))}><title>{loc.loc + ':' + loc.population}</title></circle>
                      );
                  })
            }
        </g>
    </svg>
  )
}

export default App
