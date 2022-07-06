import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
>>>>>>> 4b8901da868cea6c743cf0bb98beccac5d749f5d

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
<<<<<<< HEAD


  
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
=======
  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <span>Periodic Tables</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <span className="oi oi-dashboard" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search">
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </li>
          <li className="nav-item">
>>>>>>> 4b8901da868cea6c743cf0bb98beccac5d749f5d
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
<<<<<<< HEAD
            </div>
           
      
           
          <div className="nav-item btn-md">
              <Link  className="nav-link" to="/search">
                <span className="oi oi-magnifying-glass" />
                &nbsp;Find Reservation
              </Link>
            </div>
           </div>
=======
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tables/new">
              <span className="oi oi-layers" />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
>>>>>>> 4b8901da868cea6c743cf0bb98beccac5d749f5d
        </div>
      </div>
    </nav>
    </div>
  );
}

export default Menu;
