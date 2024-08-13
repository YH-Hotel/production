const { successHandler, errorHandler } = require("../../utils/responseHandler");
const RecentSearch = require("../../model/recentSearch.model");

const RecentSearchPOSTAPI = async (req, res, next) => {
  try {
    let { arrival, departure, date } = req.body;
    if (!arrival || !departure || !date) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    await RecentSearch.create({
      arrival,
      departure,
      date,
    });
    return successHandler(res, "Recent search created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const RecentSearchGETAPI = async (req, res, next) => {
  try {
    const recentSearch = await RecentSearch.find().sort({ createdAt: -1 }).limit(4);
    return successHandler(res, "Recent search fetched successfully", 200, {
      recentSearch,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  RecentSearchPOSTAPI,
  RecentSearchGETAPI,
};
