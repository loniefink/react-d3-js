import vl from 'vega-lite-api';
export const viz = vl
  .markLine(
    {
      size: 3,
    }
  )
  .encode(
    // world population does make sense as an area
    // areas difference between several categories that are being aggregated into y axis
    // ex: stacked area chart
//|------------------------------|
//| marks      | Pnt | Lin | Ara |
//| :--------: | :-: | :-: | :-: |
//|            |     |  X  |     |
//|------------------------------|
//| channels   | Cat | Ord | Qan |
//| :--------: | :-: | :-: | :-: |
//| x          |     |     |  X  |
//| y          |     |     |  X  |
//| size       |     |     |     |
//| luminosity |     |     |     |
//| hue        |     |     |     |
//|------------------------------|
//• _Cat: Categorical_
//• _Ord: Ordered_
//• _Qan: Quantitative_
//
    vl.x().fieldT('timestamp'), // fieldQ: quantitative (numerical), no zero baseline
    vl.y().fieldQ('temperature'),
    //vl.color().fieldQ('weight'),
    //vl.size().fieldQ('mpg').scale({ zero: false }),
    vl.tooltip().fieldN('temperature')
  );

