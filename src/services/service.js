const jwt = require("jwt-simple");
const moment = require("moment");
const CONFIG = require("../config/config");

function createToken(user) {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment()
      .add(1, "month")
      .unix()
  };
  return jwt.encode(payload, CONFIG.SECRET_TOKEN);
}

module.exports = {
  createToken
};
