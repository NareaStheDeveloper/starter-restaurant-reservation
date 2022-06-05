import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";


/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {

  const history = useHistory();
  let [number, setNumber] = useState("");

  const handleChange = (event) => {
    setNumber(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(number) {
      history.push(`search?mobile_number=${number}`);
    }
  }
  return (
    <nav className="navbar navbar-dark main-navbar navbar-expand-md shadow fixed-top">
      <Link
        className="navbar-brand logo white-text font-weight-bold"
        to="/"
      > <h8>reServed.</h8>
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
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <Link className="nav-link white-text" to="/dashboard">
                <span className="oi oi-home" />
                &nbsp;Home
              </Link>
            </li>

            <li className="nav-item">
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/tables/new">
                <span className="oi oi-layers" />
                &nbsp;New Table
              </Link>
            </li>
          </ul>
          <form className="form-inline"> 
            <input 
              className="form-control mr-2"
              type="search"
              placeholder="Search by phone #"
              aria-label="Search"
              onChange={handleChange}
              value={number}
              required
            />
            <div>
            <button
              className="btn btn-light btn-sm my-sm-0"
              // id="sidebarToggle"
              // type="button"  
              onClick={handleSubmit}
            >Search</button>
            </div>
          </form>
        </div>
    </nav>
  );
}

export default Menu;
