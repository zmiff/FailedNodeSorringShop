var passport = require('passport');
var User = require('../models/user');
var localStrategy = require('passport-local').Strategy;

// tells pasport how to store the user.
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use('local.signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
},
  function(req, email, password, done) {
    //validation checkBody .notEmpty() .isEmail() .isLength() validationErrors() is added by express-validator
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.sanitizeBody('email').escape().trim();
    req.checkBody('password', 'Invalid pasword').notEmpty().escape().trim();
    req.sanitizeBody('password').escape().trim();
    req.checkBody('name', 'Indtast venligst dit navn').notEmpty().escape().trim();
    req.sanitizeBody('name').escape().trim();
    req.checkBody('address', 'Indtast venligst dit navn').notEmpty().escape().trim();
    req.sanitizeBody('address').escape().trim();
    req.checkBody('zip', 'Indtast venligst dit postnummer').notEmpty().escape().trim();
    req.sanitizeBody('zip').escape().trim();
    req.checkBody('city', 'Indtast venligst din by').notEmpty().escape().trim();
    req.sanitizeBody('city').escape().trim();
    req.checkBody('phone', 'Indtast venligst dit telefonnummer').notEmpty().escape().trim();
    req.sanitizeBody('phone').escape().trim();

    var errors = req.validationErrors(); //extracts any errors from checkBody
    if(errors){
      var messages = [];
      errors.forEach(function(error){
        messages.push(error.msg); //.msg is also added by express-validator
      })
      return done(null, false, req.flash('error', messages))
    }//end validation
    User.findOne({ 'email': email }, function (err, user) {
      if (err) { return done(err); }
      if (user) { return done(null, false, {message: 'Email is already in use'}); }
      var newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.name = req.body.name;
      newUser.address = req.body.address;
      newUser.zip = req.body.zip;
      newUser.city = req.body.city;
      newUser.phone = req.body.phone;
      newUser.save(function(err, result){
        if(err){
          return done(err);
        }
        return done(null, newUser);
      })
    });
  }
));

passport.use('local.signin', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
}, function(req, email, password, done){
  //start validation
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.sanitizeBody('email').escape().trim();
  req.checkBody('password', 'Invalid pasword').notEmpty().isLength({min:4});
  req.sanitizeBody('password').escape().trim();
  var errors = req.validationErrors(); //extracts any errors from checkBody
  if(errors){
    var messages = [];
    errors.forEach(function(error){
      messages.push(error.msg); //.msg is also added by express-validator
    })
    return done(null, false, req.flash('error', messages))
  }//end validation
  User.findOne({ 'email': email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, {message: 'No user with that email found'});
    }
    if(!user.validPassword(password)){ //validPassword() is helper function created in user.js
      return done(null, false, {message: 'Incorrect password'});
    }

      return done(null, user);
  });
}));
