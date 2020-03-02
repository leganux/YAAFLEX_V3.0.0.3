async function notLoggedIn(req, res, next) {
    next();
    return 0;

}


module.exports = notLoggedIn;
