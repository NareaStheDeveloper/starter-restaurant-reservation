import React from "react";

export default function ReservationRow({ reservation, cancelRes }) {
  function handleCancel() {
    return window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    )
      ? cancelRes(reservation)
      : null;
  }

  return (
<<<<<<< HEAD
    <div className="card text-white m-3 my-4 row-md-2 border-0">
       <h5 className="card-header ">
        {" "}
        Reservation ID: {reservation.reservation_id}{" "}
      </h5>
      <div className="card-body p-4 ">
      <p className="card-text">
          Name: {reservation.first_name} {reservation.last_name}
        </p>
        <p className="card-text">People: {reservation.people} </p>
        <p className="card-text">Mobile Number: {reservation.mobile_number} </p>
        <p className="card-text">
          Date/Time: {reservation.reservation_date.slice(0, 10)} /
          {reservation.reservation_time.slice(0, 5)}
        </p>
        <p
          className="card-text"
          data-reservation-id-status={reservation.reservation_id}
        >
          Status: {reservation.status}
        </p>
      </div>
      
      {reservation.status === "booked" ? (
        <div className=" dark-bg container px-0 pb-3 pe-3 ">
          <div className="row dark-bg pt-3 pl-3 justify-content-center">
            <div className="col-auto p-0 ml-3 mr-3">
              <a
                className="btn btn-warning"
                role="button"
                href={`/reservations/${reservation.reservation_id}/seat`}
              >
                <span className="oi oi-bell"></span>
                &nbsp;&nbsp; Seat
              </a>
            </div>
            <div className="col-auto p-0">
              <a
                className="btn btn-warning"
                role="button"
                href={`/reservations/${reservation.reservation_id}/edit`}
              >
                <span className="oi oi-pencil"></span>
                &nbsp;&nbsp;Edit
              </a>
            </div>
         
      
        <div className="col-auto p-0 ml-3 mr-3" data-reservation-id-cancel={reservation.reservation_id}
          onClick={handleCancel}>
            <button
            type="button"
            className="btn btn-danger btn-md mr-2 cancel"
          >
            <span className="oi oi-x "></span>
            &nbsp;&nbsp;Cancel
          </button>
              </div>
    </div>
          </div>
      ) : null}
    </div>
    
=======
    <tr>
      <th scope="row">{reservation.reservation_id}</th>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.people}</td>
      <td>{reservation.reservation_time}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      <td>
        {reservation.status === "booked" ? (
          <a
            className="btn btn-secondary"
            role="button"
            href={`/reservations/${reservation.reservation_id}/seat`}
          >
            Seat
          </a>
        ) : null}
      </td>
      <td>
        <a
          className="btn btn-secondary"
          role="button"
          href={`/reservations/${reservation.reservation_id}/edit`}
        >
          Edit
        </a>
      </td>
      <td>
        <button
          className="btn btn-danger"
          data-reservation-id-cancel={reservation.reservation_id}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </td>
    </tr>
>>>>>>> 4b8901da868cea6c743cf0bb98beccac5d749f5d
  );
}
