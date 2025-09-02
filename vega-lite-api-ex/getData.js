import { csv } from 'd3';

const csvUrl = 'https://gist.githubusercontent.com/curran/6cd1e224d76811b68df4/raw/12c93b2e53872d088331d939bdb790019f06dc32/populationByCountry2015.csv'

export const getData = async() => {
  const data = await csv(csvUrl);

  console.log(data[0]);

  return data;
}
