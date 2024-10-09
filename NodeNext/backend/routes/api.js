const express = require('express');
const Quote = require('../models/Quote');
const router = express.Router();

// Fetch all quotes
router.get('/quotes', async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.json(quotes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new quote
router.post('/quotes', async (req, res) => {
    const { character, quote } = req.body;
    try {
        const newQuote = new Quote({ character, quote });
        await newQuote.save();
        res.status(201).json(newQuote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;