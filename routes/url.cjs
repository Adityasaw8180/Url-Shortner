const express = require('express');
const router = express.Router();

const {
  handleGenereateNewShortUrl,
  handleRedirectByShortId,
  handleAnalytics,
} = require('../controllers/url.cjs');


router.get('/about', (req, res) => {
  res.send('This is about page');
});

router.post('/', handleGenereateNewShortUrl);

router.get('/analytics/:shortId', handleAnalytics);

router.get('/:shortId', handleRedirectByShortId);

module.exports = router;
