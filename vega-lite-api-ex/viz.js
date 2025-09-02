import vl from 'vega-lite-api';
export const viz = vl
  .markBar(
  )
  .encode(
    // lookup sort for vega-lite
    vl.x().fieldN('country').sort('-y'), // fieldQ: quantitative (numerical), no zero baseline
    vl.y().fieldQ('population'),
    //vl.color().fieldQ('weight'),
    //vl.size().fieldQ('mpg').scale({ zero: false }),
    vl.tooltip().fieldN('population')
  );

