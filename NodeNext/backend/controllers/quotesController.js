const Quote = require('../models/Quote');

// Get all quotes
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new quote
exports.createQuote = async (req, res) => {
  const { text, author } = req.body;
  try {
    const newQuote = new Quote({ text, author });
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};