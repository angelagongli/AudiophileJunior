const router = require("express").Router();
const myTdsRequest = require("../../dbconfig/tdsRequest");

router.route("/")
    .get(function(req, res) {
        myTdsRequest.Read(res, 'SELECT * FROM dbo.Users;');
    })
    .post(function(req, res) {
        myTdsRequest.Write(res,
            'INSERT INTO dbo.Users (AuthUID, AuthDisplayName) ' +
            'VALUES (@AuthUID, @AuthDisplayName);', req.body);
    });

router.route("/:AuthUID")
    .get(function(req, res) {
        myTdsRequest.Read(res,
            'SELECT Id, AuthUID, AuthDisplayName FROM dbo.Users ' +
            'WHERE AuthUID = @AuthUID;', req.params);
    });

module.exports = router;
