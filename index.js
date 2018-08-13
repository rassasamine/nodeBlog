
const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post')
const fileUpload = require('express-fileupload');

const app = express();

//  connecting to local database
//  if the database doesn't exist mongodb will create it for us
mongoose.connect('mongodb://localhost/nodeblog');

app.use(express.static('public'));
app.use(expressEdge);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());


/* app.get('/', (req, res) => {
    //  without templating
    //  res.sendFile(path.resolve(__dirname, 'pages/about.html'));
    res.render('index');
}) */

//  async/await (es8 features) 
app.get('/', async(req, res) => {
    const posts = await Post.find({});
    console.log(posts)
    res.render('index', {posts: posts});

})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {post: post});
})

app.get('/posts/new', (req, res) => {
    res.render('create');
})

app.post('/posts/store', (req, res) => {
    const {image} = req.files;
    image.mv(path.resolve(__dirname,'public/posts',image.name), (error) => {
        console.log(error);
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            res.redirect('/');
        })
    });
})

app.listen(4000, () => {
    console.log('app listening on port 4000');
})