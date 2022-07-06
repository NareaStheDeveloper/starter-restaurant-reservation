import React from "react";
import { useHistory } from "react-router";
import { unassignTable } from "../../utils/api";

export default function FinishButton({ status, table, loadDashboard }) {
  const history = useHistory();

  async function handleClick() {
    return window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    )
      ? await handleFinish(table.table_id, table.reservation_id)
      : null;
  }

  async function handleFinish(table_id, reservation_id) {
    await unassignTable(table_id, reservation_id);
    await loadDashboard();
    history.push("/dashboard");
  }

  return (
    status === "Occupied" && (
      <td>
        <button className="form-control btn btn-md btn-info"
          data-table-id-finish={table.table_id}
          onClick={handleClick}
<<<<<<< HEAD:front-end/src/dashboard/tableList/FinishBtn.js
         
=======
          className="btn btn-sm btn-primary"
>>>>>>> 4b8901da868cea6c743cf0bb98beccac5d749f5d:front-end/src/dashboard/tableList/FinishButton.js
        >
          Finish
        </button>
      </td>
    )
  );
}
