import React, { useEffect, useState } from "react";
import ReservationTable from "./reservationTable/ReservationTable";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";
import TableList from "./TableList/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .then(listTables)
      .then(setTables)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function handleToday() {
    history.push(`/dashboard`);
  }

  function handlePrev() {
    const newDate = previous(date);
    history.push(`/dashboard?date=${newDate}`);
  }

  function handleNext() {
    history.push(`/dashboard?date=${next(date)}`);
  }

<<<<<<< HEAD
  const addReservationButton = (
    <button
      className="btn btn-warning btn-sm m-3"
      onClick={() => history.push(`/reservations/new`)}
    >
      <span className="oi oi-plus"></span>
    </button>
  );

  const addTableButton = (
    <button
      className="btn btn-warning btn-sm m-3"
      onClick={() => history.push(`/tables/new`)}
    >
      <span className="oi oi-plus"></span>
    </button>
  );


  return (
    <>
      <div className="padded col-lg-7 col-md-5 col-sm-12 col-xs-6  align-self-start m-3  card-main">
        <div className="text-center">
          <div className="col-auto p-1">
            <h2>Reservations {addReservationButton}</h2>
          </div>
        </div>

        <div className="justify-content-center">
          <h4 className="mb-3">Date: {date}</h4>

          <div className="pb-2 d-flex justify-content-center">
            <button
              className="btn btn-warning btn-sm mr-1"
              onClick={handlePrev}
            >
              <span className="oi oi-chevron-left"></span>
              &nbsp; Previous Day
            </button>
            <button
              className="btn btn-outline-warning btn-lg mr-1"
              onClick={handleToday}
            >
              Today
            </button>
            <button
              className="btn btn-warning btn-sm mr-1"
              onClick={handleNext}
            >
              Next Day &nbsp;
              <span className="oi oi-chevron-right"></span>
            </button>
          </div>
        </div>
        <div>
          <ErrorAlert error={reservationsError} />
          <ReservationTable
            reservations={reservations}
            setReservations={setReservations}
            setError={setReservationsError}
          />
          {!reservations.length ? (
            <div className="container p-3 text-center">
              <h6>No reservations found for this date. </h6>
            </div>
          ) : null}
        </div>
      </div>
        
      <div className="padded col-lg-4 col-md-5 col-sm-12 col-xs-6 align-self-start m-3 card-main">
        <div className="text-center">
          <div className="row justify-content-center">
            <div className="col-auto p-0">
              <h2>Tables {addTableButton}</h2>
            </div>
            <div className="col-auto plus-button p-1">
              <Link className="nav-link" to="/tables/new">
                <span className="oi oi-plus" />
                &nbsp;
              </Link>
            </div>
          </div>
        </div>
        {/* {loading ? loadingSpinner : null} */}
        <TableList tables={tables} loadDashboard={loadDashboard} />
        {!tables.length ? (
          <div className="container p-3 text-center">
            <p>No Tables found</p>
          </div>
        ) : null}
=======
  return (
    <main>
      <h1 className="d-md-flex justify-content-center">Dashboard</h1>
      <div className="d-md-flex mb-3 justify-content-center">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div className="pb-2 d-flex justify-content-center">
        <button className="btn btn-primary mr-1" onClick={handleToday}>
          today
        </button>
        <button className="btn btn-primary mr-1" onClick={handlePrev}>
          previous
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          next
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationTable
        reservations={reservations}
        setReservations={setReservations}
        setError={setReservationsError}
      />
      <div>
        <TableList tables={tables} loadDashboard={loadDashboard} />
>>>>>>> 4b8901da868cea6c743cf0bb98beccac5d749f5d
      </div>
    </main>
  );
}

export default Dashboard;
