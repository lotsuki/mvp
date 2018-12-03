const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Document = require('../db/Document.js');
const db = require('../db/index.js');
const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../public`));

app.post('/', (req, res) => {
  Document.create({
    title: req.body.title,
    url: req.body.url,
    subject: req.body.subject,
    date: req.body.date
  })
  .then(() => {
    db.close();
    res.send('Document posted');
  })
  .catch(err => res.status(500).send('Could not post document', err))
});

app.get('/docs', (req, res) => {
  Document.find().exec((err, results) => {
    if (err) { res.status(500).send('Could not get document') }
    else { res.send(results) }
  })
});



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});