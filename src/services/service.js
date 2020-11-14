const jwt = require('jsonwebtoken')
const moment = require('moment')
const CONFIG = require('../config/config')

function createToken (usuario) {
  const payload = {
    sub: usuario._id + 'J' + usuario.creado,
    iat: moment().unix(),
    exp: moment()
      .add(1, 'days')
      .unix()
  }

  return jwt.sign(payload, CONFIG.SECRET_TOKEN)
}
async function decodeToken (token) {
  try {
    const payload = await jwt.decode(token, CONFIG.SECRET_TOKEN)
    if (payload.exp >= moment().unix()) return payload.sub.split('J')[0]
    return 401
  } catch (e) {
    console.log(e)
    return 500
  }
}
module.exports = {
  createToken,
  decodeToken
}
