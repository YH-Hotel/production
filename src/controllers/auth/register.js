const { successHandler, errorHandler } = require("../../utils/responseHandler");
const { hashPassword } = require("../../utils/passwordHash");
const User = require("../../model/users.model");

const Register = async (req, res, next) => {
  try {
    let { fullName, email, mobileNumber, password, gender } = req.body;
    if (!fullName || !email || !mobileNumber || !password || !gender) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const userExists = await User.findOne({ mobileNumber });

    if (userExists) {
      return next(errorHandler(res, "User already exists", 409));
    }
    mobileNumber = parseInt(mobileNumber);
    const hashedPassword = hashPassword(password);
    await User.create({
      fullName,
      email,
      mobileNumber,
      password: hashedPassword,
      gender,
    });

    return successHandler(res, "User created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = Register;
