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
        }
    },
    options: {
      database: 'master'
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

module.exports = connection;
