const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { instance } = require("../../service/razorPay.config");
const crypto = require("crypto");
const { default: axios } = require("axios");
const MyTrip = require("../../model/myTrip.model");
const BookingHoliday = require("../../model/BookingHoliday");
const BookingTrans = require("../../model/BookingTrans.model");
const BookingHotel = require("../../model/BookingHotel");
const Payments = require("../../model/payments");

const addPaymentUser = async (req, res, next) => {
  try {
    var options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    return next(successHandler(res, order, 200));
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

const payments = async (req, res, next) => {
  try {
    let { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedsign = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECERT)
      .update(body.toString())
      .digest("hex");

    const verify = expectedsign === razorpay_signature;

    if (verify) {
      try {
        const response = await axios.get(
          `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,
          {
            auth: {
              username: process.env.RAZORPAY_API_KEY,
              password: process.env.RAZORPAY_API_SECERT,
            },
          }
        );
        if (
          response.data.status === "captured" &&
          response.data.notes.serviceType === "Holiday Package"
        ) {
          await holidayPackage(
            response.data,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
          );
        }

        if (
          response.data.status === "captured" &&
          (response.data.notes.serviceType.toLowerCase() === "cab" ||
            response.data.notes.serviceType.toLowerCase() === "bus")
        ) {
          await cabPackage(
            response.data,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
          );
        }

        if (
          (response.data.status === "captured" &&
            response.data.notes.serviceType.toLowerCase() === "hotel") ||
          response.data.notes.serviceType.toLowerCase() === "apartment"
        ) {
          await hotelData(
            response.data,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
          );
        }
        if (
          response.data.status === "captured" &&
          response.data.notes.serviceType.toLowerCase() === "flight"
        ) {
          await FlightData(
            response.data,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
          );
        }
      } catch (error) {
        console.log("error in razorpay payment", error);
        return next(errorHandler(res, error.message, 500));
      }
      return res.redirect(
        `${process.env.REDIRECT_FE_URL}/success?success=true&reference=${razorpay_payment_id}`
      );
    } else {
      return res.redirect(
        `${process.env.REDIRECT_FE_URL}/success?success=false&reference=${razorpay_payment_id}`
      );
    }
  } catch (error) {
    console.log("error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const getKey = async (req, res, next) => {
  try {
    return next(successHandler(res, process.env.RAZORPAY_API_KEY, 200));
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

const holidayPackage = async (
  value,
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature
) => {
  let obj_data = {
    location: value.notes.location,
    details: value.notes.details,
    price: Number(value.notes.price),
    name: value.notes.name,
    mobileNumber: Number(value.notes.mobileNumber),
    date_of_travel: value.notes.date_of_travel,
    total_memebers: Number(value.notes.total_members),
    payment_status: "success",
    payment_id: value.id,
  };
  let obj_mytrip = {
    to: value.notes.location,
    from: value.notes.location,
    dateOfBooking: value.notes.date_of_travel,
    serviceType: value.notes.serviceType,
    amount: Number(value.notes.price),
    passengerName: value.notes.name,
    mobileNumber: Number(value.notes.mobileNumber),
    email: value.notes.email,
    transactionId: value.id,
    modeofPayment: value.method,
  };
  let paymentData = {
    mobileNumber: Number(value.notes.mobileNumber),
    razorpay_payment_id: razorpay_payment_id,
    razorpay_order_id: razorpay_order_id,
    razorpay_signature: razorpay_signature,
    amount: Number(value.notes.price),
  };
  await BookingHoliday.create(obj_data);
  await MyTrip.create(obj_mytrip);
  await Payments.create(paymentData);
};

const cabPackage = async (
  value,
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature
) => {
  let obj_data = {
    to: value.notes.to,
    from: value.notes.from,
    type: value.notes.serviceType.toLowerCase(),
    departure_date: value.notes.departure_date,
    arrival_date: value.notes.arrival_date,
    departure_date_time: value.notes.departure_date_time,
    arrival_date_time: value.notes.arrival_date_time,
    total_passenger: Number(value.notes.total_passenger),
    guest_details: JSON.parse(value.notes.guest_details),
    total_amount: Number(value.notes.total_amount),
    payment_status: "success",
    payment_id: value.id,
    mode_of_payment: value.method,
    mobileNumber: Number(value.notes.mobileNumber),
    email: value.notes.email,
    date_of_booking: value.notes.dateOfBooking,
    passengerName: value.notes.passengerName,
  };
  let obj_mytrip = {
    to: value.notes.to,
    from: value.notes.from,
    dateOfBooking: value.notes.dateOfBooking,
    serviceType: value.notes.serviceType,
    amount: Number(value.notes.total_amount),
    passengerName: value.notes.passengerName,
    mobileNumber: Number(value.notes.mobileNumber),
    email: value.notes.email,
    transactionId: value.id,
    modeofPayment: value.method,
  };
  let paymentData = {
    mobileNumber: Number(value.notes.mobileNumber),
    razorpay_payment_id: razorpay_payment_id,
    razorpay_order_id: razorpay_order_id,
    razorpay_signature: razorpay_signature,
    amount: Number(value.notes.total_amount),
  };
  await MyTrip.create(obj_mytrip);
  await BookingTrans.create(obj_data);
  await Payments.create(paymentData);
};

const hotelData = async (
  value,
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature
) => {
  let obj_data = {
    hotelName: value.notes.hotelName,
    location: value.notes.location,
    room_type: value.notes.room_type,
    check_in: value.notes.check_in,
    check_out: value.notes.checkout,
    total_room: Number(value.notes.total_room),
    total_passenger: Number(value.notes.total_passenger),
    guest_details: JSON.parse(value.notes.guest_details),
    add_ons: JSON.parse(value.notes.add_ons),
    total_amount: Number(value.notes.total_amount),
    payment_status: "success",
    payment_id: value.id,
    mode_of_payment: value.method,
    mobileNumber: Number(value.notes.mobileNumber),
    email: value.notes.email,
    date_of_booking: value.notes.dateOfBooking,
    passenger_name: value.notes.passengerName,
  };
  let srchType =
    value.notes.serviceType === "apartment" ? "Apartment" : "Hotel";
  let obj_mytrip = {
    to: value.notes.location || "NA",
    from: value.notes.location || "NA",
    dateOfBooking: value.notes.dateOfBooking,
    serviceType: srchType,
    amount: Number(value.notes.total_amount),
    passengerName: value.notes.passengerName,
    mobileNumber: Number(value.notes.mobileNumber),
    email: value.notes.email,
    transactionId: value.id,
    modeofPayment: value.method,
  };
  let paymentData = {
    mobileNumber: Number(value.notes.mobileNumber),
    razorpay_payment_id: razorpay_payment_id,
    razorpay_order_id: razorpay_order_id,
    razorpay_signature: razorpay_signature,
    amount: Number(value.notes.total_amount),
  };
  await MyTrip.create(obj_mytrip);
  await BookingHotel.create(obj_data);
  await Payments.create(paymentData);
};

const FlightData = async (
  value,
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature
) => {
  let obj_mytrip = {
    to: value.notes.to,
    from: value.notes.from,
    dateOfBooking: value.notes.dateOfBooking,
    serviceType: value.notes.serviceType,
    amount: Number(value.notes.total_amount),
    passengerName: value.notes.passengerName,
    mobileNumber: Number(value.notes.mobileNumber),
    email: value.notes.email,
    transactionId: value.id,
    modeofPayment: value.method,
  };
  let paymentData = {
    mobileNumber: Number(value.notes.mobileNumber),
    razorpay_payment_id: razorpay_payment_id,
    razorpay_order_id: razorpay_order_id,
    razorpay_signature: razorpay_signature,
    amount: Number(value.notes.total_amount),
  };
  await MyTrip.create(obj_mytrip);
  await Payments.create(paymentData);
};

module.exports = { addPaymentUser, payments, getKey };
