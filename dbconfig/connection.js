const Connection = require("tedious").Connection;

const config = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            /* Why does the login repeatedly fail? What should the authentication
            type be? I create the login and the user for the login with T-SQL,
            I create the user with SSMS, every time it still fails to go through,
            it fails with sqlcmd too, I can only query the db locally with Windows auth */
            userName: 'angela',
            password: 'password'
            /* This was as simple as specifying SQL Server and Windows Authentication mode
            and not the Windows Authentication mode that was set in the MSSQL installation. */
        }
    },
    options: {
        database: 'master',
        trustServerCertificate: true,
        /* With such a small request usually for a kid's app, turning this on
        will not cause a memory problem, and looking at the rows can be helpful: */
        rowCollectionOnRequestCompletion: true
    }
};

const connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected');
    }
});

connection.connect();

module.exports = connection;
