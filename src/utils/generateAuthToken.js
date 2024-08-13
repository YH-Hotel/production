const jwt = require("jsonwebtoken");

const GenerateAuthToken = (mobilenumber) => {
  mobilenumber = parseInt(mobilenumber);
  const token = jwt.sign(
    { mobilenumber: mobilenumber },
    process.env.ACCESS_TOKEN_SCERET
  );
  return token;
};

module.exports = GenerateAuthToken;
