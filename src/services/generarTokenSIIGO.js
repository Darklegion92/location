const axios = require("axios").default;
const qs = require("qs");
const { SIIGO_USERNAME, SIIGO_PASSWORD } = require("../config/config");

const ACCESS_TOKEN = async () => {
  try {
    const token = await axios.post(
      "https://siigonube.siigo.com:50050/connect/token",
      qs.stringify({
        grant_type: "password",
        username: SIIGO_USERNAME,
        password: SIIGO_PASSWORD,
        scope: "WebApi offline_access",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic U2lpZ29XZWI6QUJBMDhCNkEtQjU2Qy00MEE1LTkwQ0YtN0MxRTU0ODkxQjYx",
          Accept: "application/json",
        },
      }
    );
    return token.data.access_token;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { ACCESS_TOKEN };
