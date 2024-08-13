const { getAllData } = require("../../utils/cities");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

const GETHotelSearchAPI = async (req, res, next) => {
  try {
    let location = req.query.location
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    console.log("location", location);
    let gerFilterData = getAllData[0].cities.filter(
      (ele) =>
        ele.City === location ||
        ele.State === location ||
        ele.District === location
    );

    return successHandler(res, "Hotel search fetched successfully", 200, {
      gerFilterData: gerFilterData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  GETHotelSearchAPI,
};
