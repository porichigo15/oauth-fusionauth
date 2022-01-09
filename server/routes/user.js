const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const qs = require("query-string");

const introspectUrl = `http://localhost:${process.env.FUSIONAUTH_PORT}/oauth2/introspect`;
const config = {
    headers: {
        Authorization: process.env.API_KEY,
    }
}

router.get("/", (req, res) => {
    // Store token in session
    const queryString = qs.stringify({
        client_id: process.env.CLIENT_ID,
        token: req.session.token
    });

    console.log("token = " + req.session.token);
   if (req.session.token) {
       axios.post(introspectUrl, queryString).then((response) => {
        let introspectResponse = response.data;
        // Valid token -> get more user data and send it back to vue app
        if (introspectResponse) {
            // Get user data by userId
            const registrationUrl = `http://localhost:${process.env.FUSIONAUTH_PORT}/api/user/registration/${introspectResponse.sub}/${process.env.APPLICATION_ID}`;
            axios.get(registrationUrl, config).then((response) => {
                res.send({
                    introspectResponse: introspectResponse,
                    body: response.data.registration,
                });
            }).catch((error) => {
                console.log(error);
            });
        } else {
            // Expire token
            req.session.destroy();
            res.send({});
        }
       }).catch((error) => {
           console.log(error);
       });
   } else {
       // No token send nothing
       res.send({});
   }
});

module.exports = router;