
const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');

const app = express();

app.use(express.static('public'));

app.use(expressEdge);
app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {
    // without templating
    //  res.sendFile(path.resolve(__dirname, 'pages/about.html'));
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post', (req, res) => {
    res.render('post');
})

app.listen(4000, () => {
    console.log('app listening on port 4000');
})