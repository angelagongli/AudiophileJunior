const router = require("express").Router();
const myTdsRequest = require("../../dbconfig/tdsRequest");

router.route("/")
    .post(function(req, res) {
        myTdsRequest.Write(res,
            'INSERT INTO dbo.Subusers (ParentID, Name) ' +
            'VALUES (@ParentID, @Name);', req.body);
    });

router.route("/parent/:ParentID")
    .get(function(req, res) {
        myTdsRequest.Read(res,
            'SELECT * FROM dbo.Subusers WHERE ParentID = @ParentID;', req.params);
    });

router.route("/:Id")
    .get(function(req, res) {
        myTdsRequest.Read(res,
            'SELECT * FROM dbo.Subusers WHERE Id = @Id;', req.params);
    });

module.exports = router;
