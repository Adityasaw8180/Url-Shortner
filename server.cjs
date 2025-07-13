const express = require('express');
const app = express();
const PORT = 5000;

const urlRouter = require('./routes/url.cjs');
const connectMongo = require('./connectDb/urlConnection.cjs');

// ✅ Middleware to parse JSON body — must come BEFORE routes
app.use(express.json());

app.use('/api/url', urlRouter);

connectMongo('mongodb://127.0.0.1:27017/url-Shortner');

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
