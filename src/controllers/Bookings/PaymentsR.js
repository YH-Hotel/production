const { successHandler, errorHandler } = require("../../utils/responseHandler");
const Payments = require("../../model/payments");

const AddPayment = async (req, res, next) => {
  try {
    let {
      mobileNumber,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      amount
    } = req.body;
    if (
      !mobileNumber ||
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature ||
      !amount
    ) {
      return next(errorHandler(res, "All fields are required", 400));
    }
    mobileNumber = parseInt(mobileNumber);
    await Payments.create({
      mobileNumber,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      amount
    });

    return next(successHandler(res, "Payment Success", 200));
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

const getPayment = async (req, res, next) => {
  try {
    const payment = await Payments.find({}).sort({ createdAt: -1 });
    return next(successHandler(res, payment, 200));
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = { AddPayment, getPayment };
