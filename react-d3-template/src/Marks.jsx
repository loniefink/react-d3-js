import { max, json, scaleSqrt, geoPath, geoNaturalEarth1, geoGraticule  } from 'd3'
import { feature, mesh } from 'topojson-client';

const projection = geoNaturalEarth1(),
    path = geoPath(projection);
const graticules = geoGraticule();

export const Marks = ({dataWorld, dataMAD, sizeScale, sizeValue, getR}) => (
        <g className="marks">
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
                  dataMAD.map((loc,i) => {
                      let r = getR(loc.population);
                      //console.log("r:",r);
                      const[x,y] = projection([loc.lng, loc.lat]);
                      return (
                          <circle opacity={0.2} fill={"#c33"} key={i} cx={x} cy={y} r={sizeScale(sizeValue(loc))}><title>{loc.loc + ':' + loc.population}</title></circle>
                      );
                  })
            }
        </g>
)
