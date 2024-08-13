const { successHandler, errorHandler } = require("../../utils/responseHandler");
const Social = require("../../model/social.model");

const SocialAPI = async (req, res, next) => {
  try {
    let { facebook, twitter, instagram, linkedin, youtube } = req.body;
    const _id = "66a5382daef07a57d029af61";
    const findData = await Social.findOne({ _id });
    await Social.findByIdAndUpdate(findData._id, {
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube
    });

    return successHandler(res, "Social updated successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const SocialGETAPI = async (req, res, next) => {
  try {
    const findData = await Social.findOne({ _id: "66a5382daef07a57d029af61" });
    return successHandler(res, "Social fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = { SocialAPI, SocialGETAPI };
