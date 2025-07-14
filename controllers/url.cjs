const shortid = require('shortid');
const URL = require('../models/urlSchema.cjs'); // Assuming this path is correct

async function handleGenereateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "Please provide URL" });
    }

    try {
        const shortID = shortid(); // Generate short ID before database operation
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: []
        });
        console.log('Short URL created successfully:', shortID);
        return res.json({ shortId: shortID });
    } catch (error) {
        console.error('Error creating short URL:', error);
        return res.status(500).json({ error: "Failed to generate short URL" });
    }
}

async function handleRedirectByShortId(req, res) {
    const shortId = req.params.shortId;

    if (!shortId) {
        return res.status(400).send('Please provide shortId');
    }

    try {
        const entry = await URL.findOne({ shortId });

        if (!entry) {
            return res.status(404).send('Short URL not found');
        }

        // Push new visit and save
        entry.visitHistory.push({ timestamp: new Date() });
        await entry.save();

        return res.redirect(entry.redirectURL);
    } catch (error) {
        console.error('Error while redirecting:', error);
        return res.status(500).send('Internal Server Error');
    }
}

async function handleAnalytics(req, res) {
    const shortId = req.params.shortId;
    if (!shortId) {
        return res.status(400).send('Please provide shortId');
    }

    try {
        const entry = await URL.findOne({ shortId });

        if (!entry) {
            return res.status(404).send('Short URL not found');
        }

        const visits = entry.visitHistory.map(visit => ({
            // Using toISOString for a standardized date format in API response
            visitedAt: visit.timestamp.toISOString()
        }));

        return res.json({
            totalVisits: visits.length,
            visits
        });
    } catch (error) {
        console.error('Error while fetching analytics:', error); // More specific error message
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    handleGenereateNewShortUrl,
    handleRedirectByShortId,
    handleAnalytics
};
