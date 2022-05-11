const jwt = require("jsonwebtoken");

//This tries to get the authorization token form the user
module.exports = (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["authorization"];
    //If the key gets decoded successfully you can store the key in decoded
    const decoded = jwt.verify(token, "debugkey");
    //With this, we can stop asking everytime for the token key
    req.user = decoded;
    //Calls the other routes, ej: /pokemon
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ code: 401, message: req, error: error, });
  }
};
