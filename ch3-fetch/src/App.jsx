import { useState } from 'react'
import './App.css'
import { Table } from './Table.jsx'

const url = 'https://gist.githubusercontent.com/loniefink/df895e8eaccb46e8fb060cac99e53787/raw/3fbb43a098b316b1adc5ecf8e7071994ce69bb0d/cssNamedColors.csv'
const fetchText = async (url) => {
  const response = await fetch(url);
  return await response.text();
}
// colors is a promise
const colors = fetchText(url).then((text) => {
  //console.log(text);
  let lines = text.split("\n"); //divide text into array of lines
  let result = [];                  // prepare output array to be converted into json
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

    result.push(obj);
  }
  console.log(result);
  return result; // JavaScript object
  //return JSON.stringify(result);
});

const App = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <Table colors={colors} />
    </>
  )
}

export default App
