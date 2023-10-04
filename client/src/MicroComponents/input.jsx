import React from 'react'
import "../../src/Allcss/input.css"
import { useState } from 'react';
function Input({label,type,value,setValue,onChange,name}) {
   
  
    return (
      <div className="input-container">
        <input type={type}  onChange={onChange} name={name} />
        <label className={value && 'filled'} >
          {label}
        </label>
      </div>
    );
}

export default Input