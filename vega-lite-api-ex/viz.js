import vl from 'vega-lite-api';
export const viz = vl
  .markLine(
    {
      size: 5,
      opacity: 1
    }
  )
  .encode(
    vl.x().fieldT('timestamp'), // fieldQ: quantitative (numerical), no zero baseline
    vl.y().fieldQ('temperature'),
    //vl.color().fieldQ('weight'),
    //vl.size().fieldQ('mpg').scale({ zero: false }),
    vl.tooltip().fieldN('temperature')
  );

