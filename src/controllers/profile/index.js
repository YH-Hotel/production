const { successHandler, errorHandler } = require("../../utils/responseHandler");
const User = require("../../model/users.model");
const { comparePassword, hashPassword } = require("../../utils/passwordHash");

const UserProfile = async (req, res, next) => {
  try {
    let { mobileNumber } = req.query;
    if (!mobileNumber) {
      return next(errorHandler(res, "Please enter mobileNumber", 400));
    }
    mobileNumber = parseInt(mobileNumber);
    const user = await User.findOne({ mobileNumber }, "-password");
    if (!user) {
      return next(errorHandler(res, "User not found", 404));
    }
    return successHandler(res, "User profile", 200, user);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const ChangePassword = async (req, res, next) => {
  try {
    let { oldPassword, newPassword, confirmPassword, mobileNumber } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      return next(errorHandler(res, "Please enter all fields", 400));
    } 
    if (newPassword !== confirmPassword) {
      return next(
        errorHandler(
          res,
          "New password and current password should be same",
          400
        )
      );
    }
    mobileNumber = parseInt(mobileNumber);
    const findUser = await User.findOne({ mobileNumber });
    if (!findUser) {
      return next(errorHandler(res, "User not found", 404));
    }
    const compareOldPassword = comparePassword(
      oldPassword,
      findUser.password
    );
    if (!compareOldPassword) {
      return next(errorHandler(res, "Old password is incorrect", 400));
    }
    const hashedPassword = hashPassword(newPassword);
    await User.findByIdAndUpdate(
      findUser._id,
      { password: hashedPassword },
      { new: true }
    );
    return successHandler(res, "Password updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = { UserProfile, ChangePassword };
