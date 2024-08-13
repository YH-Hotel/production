const { successHandler, errorHandler } = require("../../utils/responseHandler");
const User = require("../../model/users.model");

const UserData = async (req, res, next) => {
  try {
    const findData = await User.find().select('-password');
    return successHandler(res, "User fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = UserData;
