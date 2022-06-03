import React from "react";
import TableInfo from "./TableInfo";

export default function TableList({ tables, loadDashboard }) {
  if (!tables) {
    return null;
  }

  const formatted = tables.map((table) => {
    return (
      <TableInfo key={table.table_id} table={table} loadDashboard={loadDashboard} />
    );
  });

  return <div>{formatted}</div>
}
