const User = require('../database/models/User');
const bcryt = require('bcrypt');

module.exports = (req, res) => {
    const {email, password} = req.body;
    
    // try find the user
    User.findOne({email}, (error, user) => {
        if (user) {
            // compare user password
            bcryt.compare(password, 
                user.password, (error, same) => {
                // if user password is correct, then, 
                // login user and store user session
                if (same) {
                    req.session.userId = user._id;
                    res.redirect('/');
                }
                // else redirect user back
                else res.redirect('/auth/login');
            })
        }
        else {
            res.redirect('/auth/login')
        }
    })      
}