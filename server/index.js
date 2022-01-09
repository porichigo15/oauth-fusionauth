const express = require("express");
const cors = require("cors");
const session = require("express-session"); // use for store access_token not expose to client

// dotenv
require("dotenv").config();

const app = express();

// Setup middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(session(
    {
        secret: '1234567890', // don't use this secret in prod
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: 'auto',
            httpOnly: true,
            maxAge: 3600000
        }
    }
));

// Previde default port
const port = process.env.SERVER_PORT || 3000;

// Listen to server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.use('/user', require('./routes/user'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/oauth-callback', require('./routes/oauth-callback'));