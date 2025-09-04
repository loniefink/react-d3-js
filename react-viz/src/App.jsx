import React, { useState } from 'react'
import ReactDom from 'react-dom'
import './App.css'

const Dropdown = ({options, id, onSelectedValueChange}) => {
  return ( 
      <select name="pets" id={id} onChange={event => onSelectedValueChange(event.target.value)} >
        <option value="">--Please choose an option--</option>
        { options.map(({value, label}) => (
            <option key={value} value={value}>{label}</option>
        ))}
      </select>
  );
};

const options = [
  { value:"dog", label:"Dog" },
  { value:"cat", label:"Cat" },
  { value:"hamster", label:"Hamster" },
  { value:"parrot", label:"Parrot" },
  { value:"spider", label:"Spider" },
  { value:"goldfish", label:"Goldfish" }
]

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  console.log(selectedValue);
  return (
    <div>
      <label for="pet-select">Choose a pet:</label>
      <Dropdown options={options} id="pet-select" onSelectedValueChange={setSelectedValue} />
    </div> 
  )
};

export default App
