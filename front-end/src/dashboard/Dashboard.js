import React, { useEffect, useState } from "react";
import ReservationTable from "./reservationTable/ReservationTable";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory, Link } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";
import TableList from "./tableList/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  // const [loading, setLoading] = useState({false})
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  // const todaysDate = today();
  // const nextDay = next(todaysDate);
  // const previousDay = previous(todaysDate);

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

  const addReservationButton = (
    <button
      className="btn btn-success m-3"
      onClick={() => history.push(`/reservations/new`)}
    >
      Add Reservation
    </button>
  );

  const addTableButton = (
    <button
      className="btn btn-success m-3"
      onClick={() => history.push(`/tables/new`)}
    >
      Add Table
    </button>
  );

  // const loadingSpinner = (
  //   <div className="d-flex justify-content-center p-5 m-5">
  //     <div className="spinner-border" role="status">
  //       <span className="visually-hidden"></span>
  //     </div>
  //   </div>
  // );

  return (
    <>
      <div className="padded col-lg-7 col-md-5 col-sm-12 col-xs-6  align-self-start m-3 me-5 pe-5 card-main"> 
        <div className="text-center">
          <div>
            <div className="row p-0 justify-content-center">
              <div className="col-auto p-1">
                <h2>Reservations</h2>
              </div>
                
              <div className="col-auto plus-button p-1">
                <Link className="nav-link " to="/reservations/new">
                  <span className="oi oi-plus" />
                  &nbsp;
                </Link>
              </div>
            </div>
          </div>
        </div>
        <h4 className="mb-0">Date: {date}</h4>

        <div className="mb-3">
          <button className="btn btn-info btn-sm mr-1" onClick={handlePrev}>
            <span className="oi oi-chevron-left"></span>
            &nbsp; Previous Day
          </button>
          <button className="btn btn-outline-info btn-lg mr-1" onClick={handleToday}>
            Today
          </button>
          <button className="btn btn-info btn-sm mr-1" onClick={handleNext}>
            Next Day &nbsp;
            <span className="oi oi-chevron-right"></span>
          </button>
        </div>
        <ErrorAlert error={reservationsError} />
        <ReservationTable
          reservations={reservations}
          setReservations={setReservations}
          setError={setReservationsError}
        />
        {!reservations.length ? (
          <div className="container p-3 text-center">
            <h4>No reservations found for this date. 😒</h4>
            {addReservationButton}
          </div>
        ) : null}
      </div>
      {/* <h1 className="d-md-flex justify-content-center">Dashboard</h1> */}
      

      <div className="padded col-lg-3 col-md-5 col-sm-12 col-xs-6 align-self-start m-3 card-main">
        <div className="text-center">
          <div className="row justify-content-center">
            <div className="col-auto p-1">
              <h2>Tables</h2>
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
              {addTableButton}
            </div>
          ) : null}
      </div>
    </>
  );
}

export default Dashboard;
