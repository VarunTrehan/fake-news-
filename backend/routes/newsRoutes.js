const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/analyze', async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'No text provided' });
        }

        // Call the Python ML model API
        const response = await axios.post('http://localhost:5000/predict', {
            text: text
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error analyzing news:', error);
        res.status(500).json({ error: 'Error analyzing news' });
    }
});

module.exports = router; 