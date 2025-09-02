import vl from 'vega-lite-api';
export const viz = vl
  .markCircle(
    {
      size: 10,
      //opacity: 0.4
    }
  )
  .encode(
    // channels     | Cat | Ord | Qan |
    // ---------------------------------------
    // ---------------------------------------
    // x            |     |     |     |
    // ---------------------------------------
    // y            |     |     |     |
    // ---------------------------------------
    // size         |     |     |     |
    // ---------------------------------------
    // luminosity   |     |     |     |
    // ---------------------------------------
    // hue          |     |     |     |
    // ---------------------------------------
    // ---------------------------------------
    // Cat: Categorical
    // Ord: Ordered
    // Qan: Quantitative
    //
    vl.x().fieldQ('displacement').scale({ zero: false }), // fieldQ: quantitative (numerical), no zero baseline
    vl.y().fieldQ('horsepower').scale({ zero: false }),
    vl.tooltip().fieldN('name')
  );

