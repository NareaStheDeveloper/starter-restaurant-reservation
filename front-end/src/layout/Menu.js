import React from "react";
import { Link } from "react-router-dom";


/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {


  
  return (
    <div>
    <nav className="navbar navbar-dark main-navbar navbar-expand-md shadow fixed-top ">
      <Link
        className="navbar-brand logo white-text font-weight-bold"
        to="/"
      >
       <h7>reServed.</h7>
      </Link>  
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>


        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="nav-link active navbar-nav ms-auto">
            <div className="nav-item active">
              <Link className="nav-link white-text" to="/dashboard">
                <span className="oi oi-home" />
                &nbsp;Home
              </Link>
              </div>
          <div className="nav-item">
              <Link className="nav-link " to="/tables/new">
                <span className="oi oi-layers" />
                &nbsp;New Table
              </Link>
            </div>   

            <div className="nav-item">
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
            </div>
           
      
           
          <div className="nav-item btn-md">
              <Link  className="nav-link" to="/search">
                <span className="oi oi-magnifying-glass" />
                &nbsp;Find Reservation
              </Link>
            </div>
           </div>
        </div>
    </nav>
    </div>
  );
}

export default Menu;
