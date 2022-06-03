import React from "react";

export default function ReservationRow({ reservation, cancelRes }) {
  function handleCancel() {
    return window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    )
      ? cancelRes(reservation)
      : null;
  }

  const cancelButton = (
    <button
      className="btn btn-danger"
      data-reservation-id-cancel={reservation.reservation_id}
      onClick={handleCancel}
    >
      <span className="oi oi-x"></span>
      &nbsp;&nbsp;Cancel
    </button>
  )

  return (
    <div className="card text-white m-3 my-4 row-md-2 border-0 ">
      <h5 className="card-header "> Reservation ID: {reservation.reservation_id} </h5>
      <div className="card-body p-4 ">
        <p className="card-text"> 
          Name: {reservation.first_name} {reservation.last_name}
        </p>
        <p className="card-text">People: {reservation.people} </p>
        <p className="card-text">Mobile number: {reservation.mobile_number} </p>
        <p className="card-text">
          Date/Time: {reservation.reservation_date.slice(0, 10)} /
          {reservation.reservation_time.slice(0, 5)}
        </p>
        <p
          className="card-text"
          data-reservation-id-status={reservation.reservation_id}
        >
          Status: {reservation.reservation_status}
        </p>
      </div>
      {reservation.status === "Booked" ? (
         <div className=" dark-bg container px-1 pb-3 pe-3">
          <div className="row dark-bg pt-3 mx-2 justify-content-between">
          <div className="col p-0">{cancelButton}</div>
            <div className="col-auto p-0">
              <a
                className="btn btn-success"
                role="button"
                href={`/reservations/${reservation.reservation_id}/seat`}
              >
                <span className="oi oi-bell"></span>
                &nbsp;&nbsp; Seat
              </a>

              <a
                className="btn btn-warning"
                role="button"
                href={`/reservations/${reservation.reservation_id}/edit`}
              >
                <span className="oi oi-pencil"></span>
                &nbsp;&nbsp;Edit
              </a>
            </div>
          </div>
        </div>
        ) : null}
    </div>
  );
}
