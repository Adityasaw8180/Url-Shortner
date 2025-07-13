const express = require('express');
const router = express.Router();
const { handleGenereateNewShortUrl } = require('../controllers/url.cjs')
router.get('/about', (req, res) => {
    res.send('This is about page');
})
    .post('/', handleGenereateNewShortUrl);

module.exports = router;