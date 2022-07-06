import React from "react";
import { useHistory } from "react-router";
import { unassignTable } from "../../utils/api";


export default function TableInfo({ table, loadDashboard }) {
  const history = useHistory();
  function handleClick() {
    if(
      window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      unassignTable(table.table_id, table.reservation_id).then(() => history.push("/"))
    }
  }
  /*function handleTrashClick() {
    if(
      window.confirm(
      "Delete this table? You will not be able to recover it."
      )
    ) {
      deleteTable(table.table_id).then(() => history.push("/"))
    }
  }
  const trashBtn = (
    <button
    data-table-id-finish={table.table_id}
    type="button"
    onClick={handleTrashClick}
    className="btn btn-md btn-danger"
    href={`/tables/${table.table_id}`}
  >
    
    <span className="oi oi-trash" />
  </button>
  )
*/
  const finishBTN = (
    <button
      data-table-id-finish={table.table_id}
      type="button"
      onClick={handleClick}
      className="btn btn-md btn-warning"
    >
      <span className="oi oi-check"></span>
      &nbsp;&nbsp;Finish
    </button>
  )
  return (
    <div className="card text-white m-3 my-4 row-md-2 border-0 ">
      <h5 className="card-header "> Table: {table.table_name} </h5>
      <div className="card-body p-4 ">
        
        <p className="card-text pb-0 mb-1">Capacity: {table.capacity}</p>
        <p  className="card-text mb-1" data-table-id-status={table.table_id}>
          Status: {table.reservation_id ? "Occupied" : "Free"}
        </p>
    
        <p className="card-text mt-0">Reservation ID: {table.reservation_id ? table.reservation_id :"N/A"} </p>
        {table.reservation_id ? finishBTN : null}
        
      </div>
    </div>
  );
}
