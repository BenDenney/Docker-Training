const express = require('express');
const app = express();
const HOST = '0.0.0.0';
const PORT = 80;

app.get('/', (req, res) => {
    res.json({
        players: ['Billy','Joe','Emma','Bob','Helen','Balthesar','Jason']
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);