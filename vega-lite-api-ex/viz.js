import vl from 'vega-lite-api';
export const viz = vl
  .markCircle(
    {
      size: 900,
      opacity: 0.5
    }
  )
  .encode(
    vl.x().fieldN('mpg').scale({ zero: false }), // fieldQ: quantitative (numerical), no zero baseline
    vl.y().fieldQ('horsepower').scale({ zero: false }),
    vl.color().fieldQ('weight'),
    vl.size().fieldQ('mpg').scale({ zero: false }),
    vl.tooltip().fieldN('name')
  );

