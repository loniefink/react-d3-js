import React, { useState, useCallback, useEffect } from 'react'
import ReactDom from 'react-dom'
import './App.css'

// svg canvas config
const width=960;
const height=500;
const radius=20;
const center_x=(width/2);
const center_y=(height/2); 
const initialMousePosition = { x: center_x, y: center_y };

// cvs data config
const url = 'https://gist.githubusercontent.com/loniefink/df895e8eaccb46e8fb060cac99e53787/raw/3fbb43a098b316b1adc5ecf8e7071994ce69bb0d/cssNamedColors.csv'

const fetchText = async (url) => {
  const response = await fetch(url);
  return await response.text();
}

const message = data => {
  let message = '';
  message += Math.round(d3.csvFormat(data).length/1024) + ' kB';
  message += '\n' + data.length + ' rows';
  message += '\n' + data.columns.length + ' columns';
  return message;
};

const App = () => {
  // const[ mousePosition: variable we are updating, 
  //        setMousePosition: variable we use to set first variable
  //  useState(initialMousePosition: variable definition for initial state ie. null etc)
  const [data, setData] = useState(null)
  /*
   * useEffect is used here to prevent repeated calls on every loop to host
   */
  useEffect(() => {
    d3.csv(url).then(data => {
      setData(data)
    });
  }, []); // empty array implies single firing of function

  return (
    <>
      <div className="bold">
        Data is: {data ? message(data) : 'Loading...'}
      </div>
    </>
  );
};

export default App
