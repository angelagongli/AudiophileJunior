/* Pattern for making a correctly formatted tedious request */

const cnx = require("./connection");
const tdsRequest = require('tedious').Request;
const TYPES = require('tedious').TYPES;

module.exports = {
    Read: function(res, sql, params) {
        let request = new tdsRequest(sql,
            function(err, rowCount, rows) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                    return;
                } else {
                    console.log(rowCount + ' row(s) returned');
                    console.log("Rows: " + JSON.stringify(rows, null, 2));
                    // Always return an array to be uniform, even if only one
                    // Row is expected
                    res.json(resultJSONs);
                    return;
                }
            });
        let resultJSONs = [];
        request.on('row', function(columns) {
            let resultJSON = {};
            columns.forEach(function(column) {
                resultJSON[column.metadata.colName] = column.value;
            });
            resultJSONs.push(resultJSON);
        });
        // Tedious is not strict about the data type of the query params passed in,
        // But is strict about/validates the data type of the data being written
        for (let param in params) {
            request.addParameter(param, TYPES.VarChar, params[param]);
        }
        cnx.execSql(request);
    },
    Write: function(res, sql, params) {
        let request = new tdsRequest(sql,
            function(err) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                    return;
                } else {
                    // Unlike sequelize, tedious without orm returns no rows for post,
                    // Query the db again to find the new row if we need this.
                    res.status(200).end();
                    return;
                }
            });
        for (let param in params) {
            if (typeof(params[param]) == "number") {
                if (param.slice(-2) == "ID" || param.slice(-2) == "Id") {
                    request.addParameter(param, TYPES.Int, params[param]);
                } else {
                    request.addParameter(param, TYPES.Decimal, params[param]);
                }
            } else {
                request.addParameter(param, TYPES.VarChar, params[param]);
            }
        }
        cnx.execSql(request);
    }
};
