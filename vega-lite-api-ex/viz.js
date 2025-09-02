import vl from 'vega-lite-api';
export const viz = vl
  .markCircle(
  )
  .encode(
    // lookup sort for vega-lite
    vl.x().fieldN('country').sort('-y'), // fieldQ: quantitative (numerical), no zero baseline
    vl.y().fieldN('religion'),
    vl.size().fieldQ('population'),
    vl.color().fieldQ('population'),
    vl.tooltip().fieldN('population')
  );

