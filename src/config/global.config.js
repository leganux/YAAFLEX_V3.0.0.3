let dotenv = require('dotenv');
const result = dotenv.config()

if (result.error) {
    throw result.error
}


module.exports = {
    "JWT_Secret": process.env.JWT_SECRET,
    "cookie_secret": process.env.COOKIE_SECRET,
    "crypto_password": process.env.CRYPTO_PASSWORD,
    "cookie_name": process.env.COOKIE_NAME,
    "http_only_session": eval(process.env.HTTP_ONLY_SESSION),
}
