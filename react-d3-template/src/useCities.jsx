import { useState, useEffect } from 'react';
import { csv } from 'd3'

// Data
const csvUrl = 'https://gist.githubusercontent.com/loniefink/bd6033722372f368cc96150a39db63c4/raw/4a9a8b45c57d7e5c4c58950b80dbd2ddf637a6c8/worldcities_clean.csv';

// create rows
const row = d => {
  // map data to clean data ie strings to number
  d.lat = +d.lat;
  d.lng = +d.lng;
  d.population = +d.population;
  d.city = d.city;
  return d;
};

export const useCities = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  //console.log(data);

  return data;
  
  // topojson data requires transformation to geojson for easier presentation w/ d3
}

