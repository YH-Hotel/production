const { successHandler, errorHandler } = require("../../utils/responseHandler");
const { comparePassword } = require("../../utils/passwordHash");
const User = require("../../model/users.model");
const GenerateAuthToken = require("../../utils/generateAuthToken");

const Login = async (req, res, next) => {
  try {
    let { mobileNumber, password } = req.body;
    if (!mobileNumber || !password) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    mobileNumber = parseInt(mobileNumber);

    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return next(errorHandler(res, "User not found", 404));
    }

    if (!comparePassword(password, user.password)) {
      return next(errorHandler(res, "Invalid credentials", 401));
    }
    const token = GenerateAuthToken(user.mobileNumber);
    return successHandler(res, "User logged in successfully", 200, {
      token,
      name: user.fullName,
      email: user.email,
      mobileNumber: user.mobileNumber,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = Login;
