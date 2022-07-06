import React, { useState, useEffect } from "react";
import useQuery from "../utils/useQuery";
import { listReservations } from "../utils/api";
import ReservationTable from "../dashboard/reservationTable/ReservationTable";
import ErrorAlert from "../layout/ErrorAlert";

export default function Search() {
  const [stateForm, setStateForm] = useState({
    number: "",
    found: "",
    displayResult: false,
    searchError: null,
    loading: false,
  });

  const {number, found, displayResult, searchError, loading} = stateForm;
  let queryNumber = 0;

  const query = useQuery();
  if (query.get("mobile_number")) {
    queryNumber = query.get("mobile_number");
  }

  useEffect(() => {
    if (queryNumber) {
      setStateForm((currentState) => ({
        ...currentState,
        number: queryNumber,
      }));
      loadResults(queryNumber);
    }
  }, [queryNumber]);

  const handleChange = (event) => {
    setStateForm((currentState) => ({
      ...currentState,
      number: event.target.value,
      displayResult: false,
    }));
  }

  function loadResults(phoneNumber) {
    const ac = new AbortController();
    setStateForm((currentState) => ({
      ...currentState,
      loading: true,
    }));
    listReservations({mobile_number: phoneNumber}, ac.signal)
      .then((response) => 
        setStateForm((currentState) => ({
          ...currentState,
          found: response,
          displayResult: true,
          loading: false,
        }))
      )
      .catch((error) =>
        setStateForm((currentState) => ({
          ...currentState,
          searchError: error,
        }))
      )
    return () => ac.abort(); 
  }

  const searchHandler = (event) => {
    event.preventDefault();
    loadResults(number);
  }
  

  const noReservationsFound = (
    <div className="row justify-content-center">
      <div className="card-main col-10 pb-4 mb-3 justify-content-center">
        <p>No reservations found for this number: {number}</p>
      </div>
    </div>
  )

  const loadingSpinner = (
    <div className="row justify-content-center">
      <div className="card-main col-10 pb-4 mb-3 justify-content-center">
        <div className="d-flex col-10 p-5 m-5 justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden" />
          </div>
        </div>
      </div>
    </div>
  )

  // const [reservations, setReservations] = useState([]);
  // const [display, setDisplay] = useState(false);
  // const [mobile, setMobile] = useState("");
  // const [error, setError] = useState(null);

  
  // function changeHandler(e) {
  //   setMobile(e.target.value);
  // }

  // async function searchHandler(e) {
  //   e.preventDefault();
  //   const ac = new AbortController();
  //   try {
  //     const reservations = await listReservations(
  //       { mobile_number: mobile },
  //       ac.signal
  //     );
  //     setReservations(reservations);
  //     setDisplay(true);
  //   } catch (error) {
  //     setError(error);
  //   }
  //   return () => ac.abort();
  // }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="card-main padded col-10 pb-4 mb-3">
            <ErrorAlert error={searchError} />
            <form className="mx-3" onSubmit={searchHandler}>
              <h3 className="mb-3">Search</h3>
              <div className="mb-3">
                <input
                  name="mobile_number"
                  id="mobile_number"
                  onChange={handleChange}
                  placeholder="Enter a customer's phone number"
                  value={number}
                  className="form-control"
                  required
                />
              </div>
              
              <div className="d-grid gap-2 d-md-flex justify-content-md-end pt-2">
                <button type="submit" className="btn btn-primary ">
                  <span className="oi oi-magnifying-glass" />  &nbsp;&nbsp; Find           
                </button>
              </div>
            </form>
          </div>    
        </div>
        {loading ? loadingSpinner : null}
        {displayResult ? (
          found.length ? (
            <div className="row justify-content-center">
              <div className="card-main col-10 p-4 mb-3">
                <ReservationTable
                  reservations={found}
                  // setReservations={setReservations}
                  // setError={setError}
                />
              </div>
            </div>
          ) : (
            noReservationsFound
          )
        ) : null}
      </div>
    </>
  );
}