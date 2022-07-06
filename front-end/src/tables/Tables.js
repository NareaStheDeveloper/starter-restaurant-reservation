import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function Tables() {
  const history = useHistory();
  const initForm = { table_name: "", capacity: 0 };
  const [tableError, setTableError] = useState(null);
  const [tableForm, setTableForm] = useState({ ...initForm });

  function handleFormChange(e) {
    setTableForm({
      ...tableForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const c = new AbortController();
    try {
      tableForm.capacity = Number(tableForm.capacity);
      const response = await createTable(tableForm, c.signal);
      if (response) {
        history.push("/dashboard");
      }
    } catch (error) {
      setTableError(error);
    }
    return () => c.abort();
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <>
      <div className="card-main">
        <div className="d-flex justify-content-center pt-3">
          <h3>Create a New Table</h3>
        </div>
        <ErrorAlert error={tableError} />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="table_name"
            className="form-control mb-1"
            id="table_name"
            placeholder="Table Name, please include # prefix"
            value={tableForm.table_name}
            onChange={handleFormChange}
            minLength={2}
            required
          />
          <input
            type="number"
            name="capacity"
            className="form-control mb-1"
            id="capacity"
            placeholder="Number of guests"
            value={tableForm.capacity}
            onChange={handleFormChange}
            min="1"
            required
          />
          <div className=" dark-bg container px-0 pb-3 pe-3 ">
            <div className="row dark-bg pt-3 pl-3 justify-content-center">
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-warning btn-md mr-1">
                  <span className="oi oi-check"></span>
                  &nbsp;&nbsp; Submit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-md"
                  onClick={handleCancel}
                >
                  <span className="oi oi-x"></span>
                  &nbsp;&nbsp;Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
