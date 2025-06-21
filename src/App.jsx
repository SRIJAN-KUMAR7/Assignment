import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import React from 'react'
import AddItem from './components/Additem'
import ViewItems from './components/ViewItems'

function App() {

  return (
    <>
     <Navbar/>
     <AddItem/>
     <ViewItems/>
    </>
  )
}

export default App
