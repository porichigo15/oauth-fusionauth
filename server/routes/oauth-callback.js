const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const qs = require("query-string");

const url = `http://localhost:${process.env.FUSIONAUTH_PORT}/oauth2/token`;
const defaultUrl = `http://localhost:8080`;
const config = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
};

router.get("/", (req, res) => {
    // Validate State from Server
    const stateFromServer = req.query.state;
    if (stateFromServer !== req.session.stateValue) {
        console.log("State doesn't match. uh-oh.");
        console.log(`Saw: ${stateFromServer}, but expected: &{req.session.stateValue}`);
        res.redirect(302, '/');
        return;
    }

    const queryString = qs.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: process.env.REDIRECT_URI,
    });

    axios.post(url, queryString, config).then((response) => {
        // Save token to session
        req.session.token = response.data.access_token;
        console.log(response);

        // Redirect to home page
        res.redirect(defaultUrl);
    }).catch((error) => {
        console.log(error);
    });
});

module.exports = router;