const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

const VALID_RESERVATION_FIELDS = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

//helper function for validation
function _validateTime(str) {
  const [hour, minute] = str.split(":");

  if (hour.length > 2 || minute.length > 2) {
    return false;
  }
  if (hour < 1 || hour > 23) {
    return false;
  }
  if (minute < 0 || minute > 59) {
    return false;
  }
  return true;
}

//validation middleware
function isValidReservation(req, res, next) {
  const reservation = req.body.data;

  if (!reservation) {
    return next({ status: 400, message: `Must have data property.` });
  }

  VALID_RESERVATION_FIELDS.forEach((field) => {
    if (!reservation[field]) {
      return next({ status: 400, message: `${field} field required` });
    }

    if (field === "people" && typeof reservation[field] !== "number") {
      return next({
        status: 400,
        message: `${reservation[field]} is not a number type for people field.`,
      });
    }

    if (field === "reservation_date" && !Date.parse(reservation[field])) {
      return next({ status: 400, message: `${field} is not a valid date.` });
    }

    if (field === "reservation_time") {
      if (!_validateTime(reservation[field])) {
        return next({ status: 400, message: `${field} is not a valid time` });
      }
    }
  });

  next();
}

const reservationExists = async (req, res, next) => {
  const { reservation_Id } = req.params;
  const reservation = await service.read(reservation_Id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation_id ${reservation_Id} does not exist.`,
  });
};

//CRUD
async function list(req, res) {
  const { date, mobile_number } = req.query;
  let reservations;
  if (mobile_number) {
    reservations = await service.search(mobile_number);
  } else {
    reservations = date ? await service.listByDate(date) : await service.list();
  }
  res.json({
    data: reservations,
  });
}

async function create(req, res) {
  const reservation = req.body.data;
  const { reservation_id } = await service.create(reservation);
  reservation.reservation_id = reservation_id;
  res.status(201).json({ data: reservation });
}

async function read(req, res) {
  const reservation = res.locals.reservation;
  res.json({ data: reservation });
}


module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(isValidReservation),
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
};
