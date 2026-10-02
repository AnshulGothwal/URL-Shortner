const Url = require("../models/Url");

const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                message: "URL is required"
            });
        }

        const shortCode = Math.random().toString(36).slice(2, 8);

        const newUrl = await Url.create({
            originalUrl: originalUrl,
            shortCode: shortCode
        });

        res.status(201).json({
           shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}`
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


const redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({
            shortCode: shortCode
        });

        if (!url) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }

        res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createShortUrl,
    redirectToOriginalUrl
};