import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { listTables, seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function Seat() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [seatTable, setSeatTable] = useState(null);

  useEffect(() => {
    async function loadTables() {
      const c = new AbortController();
      setError(null);
      try {
        const response = await listTables(c.signal);
        setTables((prev) => response);
      } catch (error) {
        setError(error);
      }
      return () => c.abort();
    }
    loadTables();
  }, [reservation_id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const c = new AbortController();
    try {
      const response = await seatReservation(
        seatTable,
        reservation_id,
        c.signal
      );
      if (response) {
        history.push(`/dashboard`);
      }
    } catch (error) {
      setError(error);
    }
    return () => c.abort();
  }

  function handleCancel() {
    history.goBack();
  }

  function handleSelectTable(e) {
    setSeatTable(e.target.value);
  }

  const options = tables.map((table) => (
    <option
      key={table.table_id}
      value={table.table_id}
    >{`${table.table_name} - ${table.capacity}`}</option>
  ));

  return (
    <>
    <div className="card-main">
      <div className="card-font">
      <div className="d-flex justify-content-center pt-3">
        <h3>Select Table for Reservation</h3>
      </div>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <div>
        <label htmlFor="seat_reservation">
          Seat at: &nbsp;&nbsp;
          <select
            id="table_id"
            name="table_id"
            onChange={handleSelectTable}
            className="mr-1"
            required
          >
            <option defaultValue>Select a table</option>
            {options}
          </select>
        </label>
        </div>
        <div className=" dark-bg container px-0 pb-3 pe-3 ">
        <div className="row dark-bg pt-3 pl-3 justify-content-center">
            <div className="col-auto p-0 ml-3 mr-3">
        <button className="btn btn-warning " type="submit">
          <span className="oi oi-check"></span>
          &nbsp;&nbsp;Submit
        </button>
         </div>
         <div className="col-auto p-0 ml-3 mr-3">
        <button className="btn btn-danger" onClick={handleCancel}>
          <span className="oi oi-x"></span>
          &nbsp;&nbsp;Cancel
        </button>
        </div>
        </div>
      
      </div>
      
      
      </form>
     
      </div>
      </div>
    </>
  );
}
