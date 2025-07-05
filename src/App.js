import React from 'react'
import Home from './components/home/Home'
import style from './App.module.css'

export default function App() {
  return (
    <>
      <div className={style.container}>
          <Home/>
      </div>
    </>
  )
}
