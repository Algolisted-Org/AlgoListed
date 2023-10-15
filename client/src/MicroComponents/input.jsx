import React from 'react'
import "../../src/Allcss/input.css"
import { useState,useEffect } from 'react';
function Input({label,type,value,setValue,onChange,name,onKeyPress,refer}) {
   
 
    return (
      <div className="global-input-container">
        <input type={type}  onChange={onChange} name={name} onKeyPress={onKeyPress} ref={refer} />
        <label className={value && 'filled'} >
          {label}
        </label>
      </div>
    );
}

export default Input