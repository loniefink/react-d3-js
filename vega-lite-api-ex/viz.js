import vl from 'vega-lite-api';
export const viz = vl
  .markCircle(
    {
      size: 200,
      opacity: 0.2
    }
  )
  .encode(
    vl.x().fieldQ('mpg').scale({ zero: false }), // fieldQ: quantitative (numerical), no zero baseline
    vl.y().fieldQ('horsepower').scale({ zero: false }),
    vl.color().fieldN('origin')
    vl.tooltip().fieldN('name')
  );

