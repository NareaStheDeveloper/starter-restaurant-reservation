import React from "react";
import { useHistory } from "react-router";
import { unassignTable, deleteTable } from "../../utils/api";
//import DeleteTableButton from "./DeleteBtn";

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
  function handleTrashClick() {
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
  >
    <span className="oi oi-trash" />
  </button>
  )

  const finishBTN = (
    <button
      data-table-id-finish={table.table_id}
      type="button"
      onClick={handleClick}
      className="btn btn-md btn-warning"
    >
      <span className="bi bi-plus-square"></span>
      &nbsp;&nbsp;Finish
    </button>
  )
  return (
    <div className="card m-3 row-md-2 border-0">
      <div className="card-body">
        <div className="text-bold"><h5>Table: {table.table_name}</h5></div>
        
        <p className="card-text pb-0 mb-0">Capacity: {table.capacity}</p>
        <p  className="card-text" data-table-id-status={table.table_id}>
          Status: {table.reservation_id ? "Occupied" : "Free"}
        </p>
        <p className="card-text mt-0">Reservation ID: {table.reservation_id ? table.reservation_id : null} </p>
        {table.reservation_id ? finishBTN : null}
         {!table.reservation_id ? trashBtn : null}
        
      </div>
    </div>
  );
}
