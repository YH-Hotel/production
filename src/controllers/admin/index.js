const { successHandler, errorHandler } = require("../../utils/responseHandler");
const { comparePassword } = require("../../utils/passwordHash");
const AdminAuth = require("../../model/admin.model");
const { hashPassword } = require("../../utils/passwordHash");

const GenerateAuthToken = require("../../utils/generateAuthToken");

const AdminLogin = async (req, res, next) => {
  try {
    let { userId, password } = req.body;
    if (!userId || !password) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const user = await AdminAuth.findOne({ userId });
    if (!user) {
      return next(errorHandler(res, "User not found", 404));
    }

    if (!comparePassword(password, user.password)) {
      return next(errorHandler(res, "Invalid credentials", 401));
    }

    const token = GenerateAuthToken(user.userId);

    return successHandler(res, "User logged in successfully", 200, {
      token,
      name: user.fullName,
      mobileNumber: user.mobileNumber,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const AdminRegister = async (req, res, next) => {
  try {
    let { fullName, userId, mobileNumber, password } = req.body;
    if (!fullName || !userId || !mobileNumber || !password) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const userExists = await AdminAuth.findOne({ mobileNumber, userId });

    if (userExists) {
      return next(errorHandler(res, "Admin already exists", 409));
    }
    mobileNumber = parseInt(mobileNumber);
    const hashedPassword = hashPassword(password);
    await AdminAuth.create({
      fullName,
      userId,
      mobileNumber,
      password: hashedPassword,
    });

    return successHandler(res, "Admin created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  AdminLogin,
  AdminRegister,
};
