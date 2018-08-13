const mongoose = require('mongoose');

const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost/nodeblogtest');


/*  //  create() method creates a new document 
Post.create({
    title: 'second blog title',
    description: 'second lorem ipsum descreption',
    content: 'second lorem ipsum content'
}, (error, post) => {
    console.log(error, post);
}) */

/* //  find({}, (error, res) => {console.log(error, res)}) method with empty object return all docuemnts in the collection
Post.find({}, (error, posts) => {
    console.log(error, posts);
}) */

/* //  find({title : 'title name'}, (error, res) => {console.log(error, res)}) method with empty object return all docuemnts in the collection
Post.find({
    title: 'first blog title'
}, (error, posts) => {
    console.log(error, posts);
}) */

/* //  findById('5f56sd9', (error, res) => {console.log(error, res)}) method return the specific docuemnt with id send in the parameter
Post.findById('5b705d035d11da5d90ea570a', (error, post) => {
    console.log(error, post);
}) */

//  findByIdAndUpdate('5f56sd9', {title: 'new title name'}, (error, res) => {console.log(res)}) method update the specific docuemnt with new data send in the parameter as an object 
Post.findByIdAndUpdate('5b705d035d11da5d90ea570a', {
    title: 'My first blog title'
}, (error, post) => {
    console.log(error, post)
})