import { useState, useCallback, useEffect } from 'react';
import { json } from 'd3'
import { feature, mesh } from 'topojson-client';

// Data
const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

export const useWorldAtlas = () => {
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

  return data;
  
  // topojson data requires transformation to geojson for easier presentation w/ d3
}
