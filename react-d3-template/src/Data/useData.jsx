import { useState, useEffect } from 'react';
import { csv } from 'd3'

// Data
const csvUrl = 'https://gist.githubusercontent.com/loniefink/7855d4a2d1d1ca889cc83c9b5735236a/raw/71b2b91b6d2652e96ef939f1bded776e48e08f81/missing_migrants%2520-%2520Missing_Migrants_Global_Figures_allData.csv';



// create rows

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      // map data to clean data ie strings to number
      d.date = new Date(d["Incident Date"]);
      d.dead = +(d["Total Number of Dead and Missing"]);
      [d.lat, d.lng] = (new String(d.Coordinates)).split(", ").map(d => +d);
      return d;
    };
    csv(csvUrl,row).then(setData);
  }, []);


  return data;
  
  // topojson data requires transformation to geojson for easier presentation w/ d3
}

