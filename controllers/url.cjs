const shortid = require('shortid');
const URL = require('../models/urlSchema.cjs');

async function handleGenereateNewShortUrl(req, res) {
   const body = req.body;
   if (!body.url) {
      return res.status(400).json({ error: "Please provide URL" });
   }

   console.log('short url generated successfully');
   const shortID = shortid();
   await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: []
   }).then(() => { console.log('short url generated') }).catch((error) => { console.log('error occured') });

   return res.json({ shortId: shortID });
}

module.exports = {
   handleGenereateNewShortUrl
}