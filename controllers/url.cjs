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

async function handleRedirectByShortId(req, res) {
   const shortId = req.params.shortId;

   if (!shortId) {
      return res.status(400).send('Please send shortId');
   }

   try {
      const entry = await URL.findOne({ shortId });

      if (!entry) {
         return res.status(404).send('Short URL not found');
      }
      entry.visitHistory.push({ timestamp: new Date() });

      await entry.save();

      return res.redirect(entry.redirectURL);
   }
   catch (error) {
      console.error('Error while redirecting:', error);
      return res.status(500).send('Internal Server Error');
   }
}


module.exports = {
   handleGenereateNewShortUrl,
   handleRedirectByShortId,
   
}