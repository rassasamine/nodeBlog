
const express = require('express');
const expressEdge = require('express-edge');
const edge = require('edge.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash'); 

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

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(connectFlash());

// Midlleware

app.use('*', (req, res, next) => {
    // auth variable is registred globaly
    // auth will be available in all views and its value equal to userId 
    edge.global('auth', req.session.userId);
    next();
})

const validateCreatePostMidlleware = require('./midlleware/storePost')
const authMidlleware = require('./midlleware/auth');
const redirectIfAuthMidlleware = require('./midlleware/redirectIfAuth');

//  specify when we want the midlleware be called. Example:
//  app.use('/posts/store', validateCreatePostMidlleware);
//  or :
//  app.get('/posts/new', authMidlleware, createPostController)


//  Controllers
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const aboutPageController = require('./controllers/aboutPage');
const ContactPageController = require('./controllers/contactPage');
const storePosteController = require('./controllers/storePost');
const getPosteController = require('./controllers/getPost');
const createUserController = require('./controllers/createUserPage');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');


app.get('/', homePageController);

app.get('/about', aboutPageController);

app.get('/contact', ContactPageController);

app.get('/posts/new', authMidlleware, createPostController);

app.post('/posts/store', authMidlleware, validateCreatePostMidlleware, storePosteController);

app.get('/post/:id', getPosteController);

app.get('/auth/register', redirectIfAuthMidlleware, createUserController);

app.post('/users/register', redirectIfAuthMidlleware, storeUserController);

app.get('/auth/login', redirectIfAuthMidlleware, loginController);

app.post('/users/login', redirectIfAuthMidlleware, loginUserController);

app.get('/auth/logout', authMidlleware, logoutController)

app.listen(4000, () => {
    console.log('app listening on port 4000');
})