const { default: axios } = require("axios");
const { successHandler, errorHandler } = require("../../utils/responseHandler");
const { constants } = require("crypto");
const https = require("https");
const { airport_data } = require("../../utils/airport");

const agent = new https.Agent({
  secureOptions:
    constants.SSL_OP_LEGACY_SERVER_CONNECT |
    constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
  rejectUnauthorized: false,
});

const GetFlight = async (req, res, next) => {
  try {
    let {
      departureDate,
      returnDate,
      noOfAdults,
      noOfChildren,
      noOfInfants,
      destinationCity,
      originCity,
      classOfTravel,
    } = req.query;

    departureDate = departureDate.toString();
    returnDate = returnDate.toString();
    noOfAdults = noOfAdults.toString();
    noOfChildren = noOfChildren.toString();
    noOfInfants = noOfInfants.toString();
    destinationCity = destinationCity.toString();
    originCity = originCity.toString();
    classOfTravel = classOfTravel.toString();

    let origin_data = airport_data.filter(
      (ele) => ele.city.toLowerCase() === originCity.toLowerCase()
    );

    let destination_data = airport_data.filter(
      (ele) => ele.city.toLowerCase() === destinationCity.toLowerCase()
    );

    let payload = {
      tripType: "O",
      departureDate,
      returnDate,
      noOfAdults,
      noOfChildren,
      noOfInfants,
      origin: origin_data[0].iata,
      destination: destination_data[0].iata,
      destinationCity,
      originCity,
      classOfTravel,
      airline: "",
      src: "web",
      appType: null,
      appTypeTxnId: null,
      searchType: null,
      isDefence: false,
      originCountry: "IN",
      destinationCountry: "IN",
      isSeniorCitizen: false,
      isStudent: false,
      bookingCategory: "0",
      eType: "0",
      ltc: false,
    };
    const response = await axios.post(
      "https://www.air.irctc.co.in/airstqcNewUser/air/search",
      { ...payload, limit: 50 },
      { httpsAgent: agent }
    );
    const filterData = response.data.data.flights.slice(0, 50);
    return successHandler(res, "Flight data fetched successfully", 200, {
      filterData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = GetFlight;
