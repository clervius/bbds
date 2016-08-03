// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var config = require('./config');
var sg = require('sendgrid').SendGrid('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');
var mail = sg.emptyRequest();


// load up the user model
var User = require('../api/users/user.model');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err){ return done(err); }

            // check to see if theres already a user with that email
            if (user) {
                console.log('User already exists')
            } else {

                // if there is no user with that email
                var code = req.body.code;
                // create the user
                var newUser  = new User();

                // set the user's local credentials
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);
                newUser.fname = req.body.fname;
                newUser.lname = req.body.lname;
                newUser.address.street = req.body.street
                newUser.address.city = req.body.city;
                newUser.address.state = req.body.state;
                newUser.address.zip = req.body.zip;
                newUser.phone = req.body.phone;

                // Mailchimp information
                // Email information
                mail.body = {
                    "personalizations": [
                        {
                            "to": [{"email":newUser.email}],
                            "subject": newUser.fname + " Congrats and welcome to Big Bodies!"
                        }
                    ],
                    "from": { "email": "support@bigbodies.com"},
                    "content": [{
                        "type": "text/html",
                        "value": "<b>Welcome to Big Bodies!</b><br><br><b>So what's next?</b><br><br><p>Login to the site with your email and password for access."
                    }]
                };
                mail.method = 'POST'
                mail.path = '/v3/mail/send'
                // save the user
                if(code === '12301988'){
                    newUser.save(function(err) {
                        if (err){
                            console.log('couldnt create user');
                            console.log(err)

                        }else{
                            
                            console.log('user created');
                            console.log(newUser);
                            sg.API(mail, function(response){
                                console.log(response.statusCode);
                                console.log(response.body);
                                console.log(response.headers);
                                console.log('email sent!')
                            });
                            return done(null, newUser);
                        }
                        
                    });
                }else {
                    return next()
                }
            }

        });    

        });

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true,
        //passResToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, next, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
                if (err){
                    console.log(err)
                }if (!user){
                   // return done(null, false); // req.flash is the way to set flashdata using connect-flash
                    console.log("User doesnt exist")
                    return next()
                }if (!user.validPassword(password)){
                    console.log("wrong password");
                    return next()
                    return done(null, false); // create the loginMessage and save it to session as flashdata
                    
                }else{
                    // all is well, return successful user
                    return done(null, user);
                    //return res.json(user)
                }
            }
        );

    }));

};