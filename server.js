const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the 'dist' folder (Webpack output)
app.use(express.static(path.join(__dirname, 'dist')));

// Endpoint to get list of card files
app.get('/api/cards', (req, res) => {
  const cardsDir = path.join(__dirname, 'src/cards');
  fs.readdir(cardsDir, (err, files) => {
    if (err) {
      console.error('Failed to read cards directory:', err);
      res.status(500).send('Server error');
      return;
    }
    const txtFiles = files.filter(file => file.endsWith('.txt'));
    res.json(txtFiles);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

