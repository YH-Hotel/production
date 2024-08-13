const { successHandler, errorHandler } = require("../../utils/responseHandler");
const fetch = require("node-fetch");

const BASE_URL = "https://raw.githubusercontent.com/mwgg/Airports/master/airports.json";

const GetAirports = async (req, res, next) => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const airports = await response.json();

    const { country, city, name, state } = req.query;

    let filteredAirports = airports;

    if (country) {
      filteredAirports = Object.fromEntries(
        Object.entries(filteredAirports).filter(([key, value]) =>
          value.country.toLowerCase() === country.toLowerCase()
        )
      );
    }

    if (state) {
      filteredAirports = Object.fromEntries(
        Object.entries(filteredAirports).filter(([key, value]) =>
          value.state && value.state.toLowerCase() === state.toLowerCase()
        )
      );
    }

    if (city) {
      filteredAirports = Object.fromEntries(
        Object.entries(filteredAirports).filter(([key, value]) =>
          value.city && value.city.toLowerCase() === city.toLowerCase()
        )
      );
    }

    if (name) {
      filteredAirports = Object.fromEntries(
        Object.entries(filteredAirports).filter(([key, value]) =>
          value.name && value.name.toLowerCase() === name.toLowerCase()
        )
      );
    }

    if (!country && !city && !name && !state) {
      filteredAirports = Object.fromEntries(
        Object.entries(filteredAirports).filter(([key, value]) =>
          value.country.toUpperCase() === "IN"
        )
      );

      filteredAirports = Object.fromEntries(
        Object.entries(filteredAirports).slice(0, 5)
      );
    }

    const airportsData = Object.values(filteredAirports);

    return successHandler(res, "All airports data", 200, { airportsData });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = GetAirports;
