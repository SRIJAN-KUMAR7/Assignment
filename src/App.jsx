import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import React from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className="text-4xl text-red-500 font-bold">Tailwind Test</h1>
     <Navbar/>
    </>
  )
}

export default App
