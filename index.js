
const express = require('express');
const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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



const validateCreatePostMidlleware = require('./midlleware/storePost')

//  specify when we want the midlleware be called
app.use('/posts/store', validateCreatePostMidlleware);



//  Controllers
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const aboutPageController = require('./controllers/aboutPage');
const ContactPageController = require('./controllers/contactPage');
const storePosteController = require('./controllers/storePost');
const getPosteController = require('./controllers/getPost');
const createUserController = require('./controllers/createUserPage');
const storeUserController = require('./controllers/storeUser');

app.get('/', homePageController)

app.get('/about', aboutPageController)

app.get('/contact', ContactPageController)

app.get('/posts/new', createPostController)

app.post('/posts/store', storePosteController)

app.get('/post/:id', getPosteController)

app.get('/auth/register', createUserController)

app.post('/users/register', storeUserController)

app.listen(4000, () => {
    console.log('app listening on port 4000');
})