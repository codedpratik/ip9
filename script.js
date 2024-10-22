const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/reviews', (req, res) => {
fs.readFile('reviews.json', 'utf8', (err, data) => {
if (err) {
return res.status(500).json({ message: 'Error reading reviews' });
}
const reviews = JSON.parse(data || '[]');
res.json(reviews);
});
});
app.post('/reviews', (req, res) => {
const { name, comment } = req.body;
if (!name || !comment) {
return res.status(400).json({ message: 'Name and comment are required' });
}
fs.readFile('reviews.json', 'utf8', (err, data) => {
if (err) {
return res.status(500).json({ message: 'Error reading reviews' });
}
const reviews = JSON.parse(data || '[]');
const newReview = { name, comment, date: new Date().toLocaleString() };
reviews.push(newReview);
fs.writeFile('reviews.json', JSON.stringify(reviews), (err) => {
if (err) {
return res.status(500).json({ message: 'Error saving review' });
}
res.status(201).json(newReview);
});
});
});
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});