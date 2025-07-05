import React from 'react';
import style from './CustomButton.module.css';

export default function CustomButton({handleClick=()=>{}, btnText='', customStyle=''}) {
  return (
    <>
        <button className={`${style.defaultStyle} ${customStyle}`} onClick={handleClick}>{btnText}</button>
    </>
  )
}
