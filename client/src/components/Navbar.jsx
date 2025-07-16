import React, {useState} from 'react'
 import { Link } from 'react-router';
 import { CartContext } from '../App';
 import { useContext } from 'react';
 
function Navbar(){

  const {cart,setCart} =useContext(CartContext)

   const [showMenu,setshowMenu] = useState (false)
    const handleToggle = () =>{
      setshowMenu(!showMenu);
    }
    return(
      <div className= "header">
         <nav className="navbar navbar-expand-lg mb-5">
  <div className="container">
    <Link className="navbar-brand" to ="/home">E-shop</Link>
    <button className="navbar-toggler" onClick={handleToggle} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      {
        showMenu? <i className="bi bi-x-lg"></i>:<span className="navbar-toggler-icon"></span>
      }
     
    </button>
    <div className= {`collapse navbar-collapse ${showMenu ? 'show':'hide'}`}id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">Service</Link>
        </li>
       
        <li className="nav-item">
          <Link to="/about" className="nav-link" >About</Link>
        </li>
         <li className="nav-item">
          <Link to="/contect" className="nav-link" >Contect</Link>
        </li>
      </ul>
       <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " to="/Login"><i className="bi bi-person"></i></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart"><i className="bi bi-bag ">{cart.length}</i></Link>
        </li>
       
      
      </ul>
    </div>
  </div>
</nav>
</div>
 
    )
}
export default Navbar