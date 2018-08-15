//  creating a custom midlleware

module.exports = (req, res, next) => {
    if(!req.files.image || !req.body.title || !req.body.title || !req.body.subtitle || !req.body.content){
        res.redirect('/posts/new')
    }
    next();
}