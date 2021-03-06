module.exports = (req, res, next) => {
    //This allows an uknown petition to go to the server (everyone can request acess)
    //In the asterisk can store ip adresses that can request acess
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length, x-access-token"
    );
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET, OPTIONS");
        return res.status(200).json({});
    }
    next();
}