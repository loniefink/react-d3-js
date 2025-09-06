import { useMemo } from 'react';
import { geoPath, geoNaturalEarth1, geoGraticule  } from 'd3'
import { MissingMigrantsBubbles } from '../MissingMigrants/MissingMigrantsBubbles';

const projection = geoNaturalEarth1(),
  path = geoPath(projection);
const graticules = geoGraticule();

export const WorldMap = ({dataWorld, dataMAD, dataFiltered}) => {
  return (
    <>
      { useMemo(() => 
        <>
        <path className="oceans" d={path({type: 'Sphere'})} />
        <path className="latAndLongLines" d={path(graticules())} />
        {dataWorld.land.features.map((feature,i) => (
            // req projection
            // line string
            <path className="land" key={i} d={path(feature)} />
        ))} 
        <path className="borders" d={path(dataWorld.interiors)} />
        </>
      , [path, graticules, dataWorld])}
      <MissingMigrantsBubbles dataMAD={dataMAD} dataFiltered={dataFiltered} />
    </>
  )
}
