var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var middleware = require('./../JS/middleware');

var csrfProtection = csrf({cookie:true});
router.use(csrfProtection);

router.get('/logout', middleware.isLoggedIn, function(req, res, next) {
  req.logout(); //logout() is added and managed by passport
  res.redirect('/');
});

router.get('/profile', middleware.isLoggedIn, (req, res)=>{
  res.render('user/profile');
});

//all routes after this following router, can only be accessed if one is not logged in.
router.use('/', middleware.notLoggedIn, function(req, res, next){
  next();
});

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup',{
  csrfToken: req.csrfToken(),
  messages,
  hasErrors: messages.length > 0
  });
});

//signup user
router.post('/signup', passport.authenticate('local.signup', {
  failureRedirect: '/user/signup',
  failureFlash: true
}),(req, res)=>{
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }else{
    res.redirect('/user/profile');
  }
});

router.get('/signin', function(req,res,next){
  var messages = req.flash('error');
  res.render('user/signin',{
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
})

router.post('/signin', passport.authenticate('local.signin', {
  failureRedirect: '/user/signin',
  failureFlash: true
}),(req, res)=>{
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }else{
    res.redirect('/user/profile');
  }
});

module.exports = router;
