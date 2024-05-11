import React, { useState } from 'react'
import './textBox.css'

const TextBox = ({inputType, claName, placeHol, onInputChange}) => {
  /*const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    const text = event.target.value;
    setUsername(text);
    onInputChange(text)
  }
  */
  return (
    <input type={inputType} className={claName} placeholder={placeHol} onChange={onInputChange} >
 
    </input>
  )
}

export default TextBox