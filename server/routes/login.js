const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const stateValue = setStateValue();
    req.session.stateValue = stateValue;

    res.redirect(`http://localhost:${process.env.FUSIONAUTH_PORT}/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&state=${stateValue}`);
});

const setStateValue = () => {
    let value = "";
    for (let i = 0; i < 6; i++) {
        value += Math.random().toString(36).substring(2, 15);
    }

    return value;
}

module.exports = router;