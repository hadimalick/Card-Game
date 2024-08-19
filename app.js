const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to show all cards
app.get('/show-cards', (req, res) => {
    const cards = [
        '2@', '2#', '2^', '2*', '3@', '3#', '3^', '3*',
        '4@', '4#', '4^', '4*', '5@', '5#', '5^', '5*',
        '6@', '6#', '6^', '6*', '7@', '7#', '7^', '7*',
        '8@', '8#', '8^', '8*', '9@', '9#', '9^', '9*',
        '10@', '10#', '10^', '10*', 'J@', 'J#', 'J^', 'J*',
        'Q@', 'Q#', 'Q^', 'Q*', 'K@', 'K#', 'K^', 'K*',
        'A@', 'A#', 'A^', 'A*'
    ];
    res.json(cards);
});

// Route to show a specific card by index
app.post('/show-card', (req, res) => {
    const cards = [
        '2@', '2#', '2^', '2*', '3@', '3#', '3^', '3*',
        '4@', '4#', '4^', '4*', '5@', '5#', '5^', '5*',
        '6@', '6#', '6^', '6*', '7@', '7#', '7^', '7*',
        '8@', '8#', '8^', '8*', '9@', '9#', '9^', '9*',
        '10@', '10#', '10^', '10*', 'J@', 'J#', 'J^', 'J*',
        'Q@', 'Q#', 'Q^', 'Q*', 'K@', 'K#', 'K^', 'K*',
        'A@', 'A#', 'A^', 'A*'
    ];
    const cardNo = parseInt(req.body.cardNo, 10);
    if (cardNo >= 0 && cardNo < cards.length) {
        res.json({ card: cards[cardNo] });
    } else {
        res.json({ error: 'Invalid card index' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
