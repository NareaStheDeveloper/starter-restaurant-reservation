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
  const finishBTN = (
    <button
      data-table-id-finish={table.table_id}
      type="button"
      onClick={handleClick}
      className="btn btn-md btn-info"
    >
      <span className="bi bi-plus-square"></span>
      &nbsp;&nbsp;Finish
    </button>
  )
  return (
    <div className="card m-3 row-md-2 border-0">
      <div className="card-body">
        <h5>Table: {table.table_name}</h5>
        <p className="card-text pb-0 mb-0">Capacity: {table.capacity}</p>
        <p className="card-text" data-table-id-status={table.table_id}>
          Status: {table.reservation_id ? "Occupied" : "Free"}
        </p>
        {table.reservation_id ? finishBTN : null}
      </div>
    </div>
  );
}
