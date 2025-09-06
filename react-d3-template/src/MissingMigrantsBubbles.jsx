import { max, json, scaleSqrt, geoPath, geoNaturalEarth1, geoGraticule  } from 'd3'
import { feature, mesh } from 'topojson-client';

const projection = geoNaturalEarth1(),
  path = geoPath(projection);

const maxRadius = 10;
let maxPopulation = 0;
let minPopulation = 0;
const getR = (thisPopulation) => {
  let r = 0;
  if ((maxPopulation - minPopulation) !== 0) {
    r = 4*((thisPopulation - minPopulation)/(maxPopulation - minPopulation));
  }
  return Math.floor(r+1);
}

export const MissingMigrantsBubbles = ({dataMAD}) => {
  const sizeValue = (d) => d.dead;
  const sizeScale = scaleSqrt()
    .domain([0,max(dataMAD, sizeValue)])
    .range([0, maxRadius]);

  return (dataMAD.map((loc,i) => {
    let r = getR(loc.population);
    const[x,y] = projection([loc.lng, loc.lat]);
    //console.log("x y i r:", x, y, i, r);
    return (
      <circle opacity={0.2} fill={"#c33"} key={i} cx={x} cy={y} r={sizeScale(sizeValue(loc))}><title>{loc.loc + ':' + loc.population}</title></circle>
    );
  }))
}
