import vl from 'vega-lite-api';
export const viz = vl
  .markCircle(
    {
      size: 500,
      opacity: 0.5
    }
  )
  .encode(
    vl.x().fieldQ('mpg').scale({ zero: false }), // fieldQ: quantitative (numerical), no zero baseline
    vl.y().fieldQ('horsepower').scale({ zero: false }),
    vl.color().fieldN('origin'),
    vl.size().fieldQ('horsepower'),
    vl.tooltip().fieldN('name')
  );

