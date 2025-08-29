import { useState } from 'react'
import './App.css'
import { Table } from './Table.jsx'

const url = 'https://gist.githubusercontent.com/loniefink/df895e8eaccb46e8fb060cac99e53787/raw/3fbb43a098b316b1adc5ecf8e7071994ce69bb0d/cssNamedColors.csv'
let message = '';
const fetchText = async (url) => {
  const response = await fetch(url);
  return await response.text();
}

    /* 
     *  the following lines all do the same thing as the 
     *
const textToJSON = (text) => {
  let lines = text.split("\n");     //divide text into array of lines
  let data = [];                  // prepare output array to be converted into json
  let headers = lines[0].split(",") // set 1st line as headers
  //console.log(headers);
  //console.log("headers.length",headers.length);
  for (let i=1; i<lines.length;i++) {
    let obj = {}; // prepare object each of these will be an object in json consisting of data from line with header as key
    let currentLine = lines[i].split(","); // split each line by comma 
    //console.log(currentLine);
    for (let j=0;j<headers.length;j++) {
      //console.log("headers[j]",headers[j]);
      obj[headers[j]] = currentLine[j]; // key => value, key = object[j], value = currentLine[j]
    }

    data.push(obj);
  }
  console.log(data);
  return data; // JavaScript object
};
*/
// colors is a promise
//const colors =
fetchText(url).then((text) => {
  //console.log(text);
  const data = d3.csvParse(text);
  console.log(data);
  message += Math.round(text.length/1024) + ' kB';
  message += '\n' + data.length + ' rows';
  message += '\n' + data.columns.length + ' columns';
  console.log(message);
  /*
   * alternative method
  const data = textToJson(text);
  */
  return data
  //return JSON.stringify(data);
});

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <>
    </>
  )
}

export default App
