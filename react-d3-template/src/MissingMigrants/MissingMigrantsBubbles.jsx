import { useMemo } from 'react';
import { max, scaleSqrt, geoPath, geoNaturalEarth1 } from 'd3'

const projection = geoNaturalEarth1(),
  path = geoPath(projection);

const maxRadius = 10;
const sizeValue = (d) => d.dead;

export const MissingMigrantsBubbles = ({dataMAD, dataFiltered}) => {
  const sizeScale = useMemo(() => scaleSqrt()
    .domain([0,max(dataMAD, sizeValue)])
    .range([0, maxRadius]), [dataMAD, sizeValue, maxRadius]);

  return (dataFiltered.map((loc,i) => {
    const[x,y] = projection([loc.lng, loc.lat]);

    return (
      <circle opacity={0.2} fill={"#c33"} key={i} cx={x} cy={y} r={sizeScale(loc.dead)}><title>{loc.lng + ':' + loc.lat}</title></circle>
    );
  }))
}
