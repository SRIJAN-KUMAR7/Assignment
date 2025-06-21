import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import React from 'react'
import AddItem from './components/AddItems'
import ViewItems from './components/ViewItems'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <AddItem/>
     <ViewItems/>
    </>
  )
}

export default App
