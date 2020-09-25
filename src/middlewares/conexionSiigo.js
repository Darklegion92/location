const axios = require("axios").default;
const qs = require("qs");
const {SIIGO_USERNAME,SIIGO_PASSWORD} = require("../config/config")
async function token(req, res, next) {
  res.setHeader("Content-Type", "application/json");
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
    req.token = token.data;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
module.exports = {
  token,
};
