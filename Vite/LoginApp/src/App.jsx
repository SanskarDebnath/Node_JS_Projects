import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Features from './components/Feature.jsx'
import Home from './components/Home.jsx'

function App() {
  
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <> <Navbar/><Home/> </>
    },
    {
      path: "/Login",
      element: <> <Navbar/><Login/> </>
    },
    {
      path: "/Features",
      element: <> <Navbar/><Features/> </>
    },
  ])
  return (
    <>

    <RouterProvider router={Router}/>
    </>
  )
}

export default App
