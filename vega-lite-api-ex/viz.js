import vl from 'vega-lite-api';
export const viz = vl
  .markCircle(
    {
      size: 200,
      opacity: 0.7
    }
  )
  .encode(


// x and y positions are good to use on any data
//|------------------------------|
//| channels   | Cat | Ord | Qan |
//| :--------: | :-: | :-: | :-: |
//| x          |  X  |     |     |
//| y          |     |     |  X  |
//| size       |     |     |     |
//| luminosity |     |     |     |
//| hue        |     |     |     |
//|------------------------------|
//• _Cat: Categorical_
//• _Ord: Ordered_
//• _Qan: Quantitative_
//
    vl.x().fieldO('origin'), // fieldQ: quantitative (numerical), no zero baseline
    vl.y().fieldQ('horsepower').scale({ zero: false }),
    vl.tooltip().fieldN('name').title('x and y positions are good to use on any data')
  );

