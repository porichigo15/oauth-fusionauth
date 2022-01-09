const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    // delete the session
    req.session.destroy();

    // end FusionAuth session
    const url = `http://localhost:${process.env.FUSIONAUTH_PORT}/oauth2/logout?client_id=${process.env.CLIENT_ID}`;
    res.redirect(url);
});

module.exports = router;