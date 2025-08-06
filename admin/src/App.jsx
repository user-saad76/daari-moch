import { useState } from 'react'
import Home from './pages/Home'
import './App.css'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { BrowserRouter ,Routes, Route } from "react-router";
import AddProductForm from './pages/AddProductForm'
import AddCategoryForm from './pages/AddCategoryForm'


function App() {

  return (
         <div className ="container-fluid position-relative d-flex p-0">
          <BrowserRouter>
         <Sidebar/>
         <div className ="content">
          <Navbar/>
          <Routes>
            <Route  path='/' element={ <Home/>} />
             <Route  path='/add.product' element={<AddProductForm/>} />
              <Route  path='/add.category' element={<AddCategoryForm/>} />
          </Routes>
          
         </div>
         </BrowserRouter>
       </div>
  )
}

export default App
