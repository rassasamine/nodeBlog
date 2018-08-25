const Post = require('../database/models/Post')

/* app.get('/', (req, res) => {
    //  without templating
    //  res.sendFile(path.resolve(__dirname, 'pages/about.html'));
    res.render('index');
}) */

//  async/await (es8 features) 
module.exports = async (req, res) => {
    const posts = await Post.find({});
    console.log(req.session);
    res.render('index', {posts: posts});
}