import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { json, geoPath, geoNaturalEarth1  } from 'd3'
import { feature, mesh } from 'topojson-client';
import './App.css'

// Data
const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

const width = 960;
const height = 500;
const projection = geoNaturalEarth1(),
    path = geoPath(projection);
/*
 *
 * App() 
 *
 */
function App() {
  // Data
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then(topojsonData => {
      const {countries, land} = topojsonData.objects;
      // exclude outer strokes and only include inner strokes
      setData({
        land: feature(topojsonData, land),
        interiors: mesh(topojsonData, countries, (a, b) => a !== b)
      });
    });
  }, []);
  
  // topojson data requires transformation to geojson for easier presentation w/ d3

  if (!data) {
    return <pre>Loading...</pre>
  }

  //console.log(feature);
  console.log(data);

  return (
    <svg width={width} height={height}>
      // Marks ( data, xScale, yScale, xValue, yValue, tooltipFormat ) 
        <g className="marks">
      // paths
            <path className="oceans" d={path({type: 'Sphere'})} />
            {
              data.land.features.map(feature => (
              // req projection
              // line string
              <path className="land" key={feature.id} d={path(feature)} />
            ))}
            <path className="borders" d={path(data.interiors)} />
        </g>
    </svg>
  )
}

export default App
