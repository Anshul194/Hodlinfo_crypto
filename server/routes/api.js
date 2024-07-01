const express = require('express');
const axios = require('axios');
const Ticker = require('../models/Ticker');

const router = express.Router();

// Function to fetch and store tickers
const fetchAndStoreTickers = async () => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        
        const tickers = Object.values(response.data).slice(0, 10);
                console.log('dghjgrhf');
                console.log(tickers);
        await Ticker.deleteMany({});
        await Ticker.insertMany(tickers.map(ticker => ({
            name: ticker.name,
            last: ticker.last,
            buy: ticker.buy,
            sell: ticker.sell,
            volume: ticker.volume,
            base_unit: ticker.base_unit,
        })));

        console.log('Tickers fetched and stored successfully');
    } catch (error) {
        console.error('Error fetching tickers:', error);
    }
};

// Route to fetch and store tickers manually
router.get('/fetch-tickers', async (req, res) => {
    try {
        await fetchAndStoreTickers();
        res.send('Tickers fetched and stored successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching tickers');
    }
});

// Route to get stored tickers
router.get('/tickers', async (req, res) => {
    try {
        const tickers = await Ticker.find({});
        res.setHeader('Cache-Control', 'no-cache');
        console.log(tickers)
        res.json(tickers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving tickers');
    }
});

// Set interval to fetch and store tickers every minute
setInterval(fetchAndStoreTickers, 60 * 1000);

module.exports = router;
