const express = require("express");

const router = express.Router();

const {
    createShortUrl,
    redirectToOriginalUrl
} = require("../controllers/urlController");

router.post("/urls", createShortUrl);

router.get("/:shortCode", redirectToOriginalUrl);

module.exports = router;