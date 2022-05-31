const path = require("path");
const router = require("express").Router();
// const apiRoutes = require("./api");

// router.use("/api", apiRoutes);

const cnx = require("../dbconfig/connection");
const tdsRequest = require('tedious').Request;

/* I need to send user.uid from firebase/auth to some route to find the subusers,
because you could be the guardian/babysitter etc. of more than one kid,
or you could be an adult learning music too */

router.route("/test")
.get(function(req, res) {
    res.json("test");
});

router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
