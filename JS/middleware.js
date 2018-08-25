module.exports = {
  // only routes with session.cart can view
  hasCartSession: function(req, res, next){
    if(!req.session.cart){
      res.redirect('/');
    }else{
      return next();
    }
  },
  //protect routes, can only access them when logged in
  isLoggedIn: function(req, res, next){
    if(req.isAuthenticated()){ //isAuthenticated() is managed by passport.js
      return next(); //you may pass
    }
    else{
      res.redirect('/'); //you shall not pass
    }
  },
  // routes only user who are not logged in can rech
  notLoggedIn: function (req, res, next){
    if(!req.isAuthenticated()){ //isAuthenticated() is managed by passport.js
      return next(); //you may pass
    }
    else{
      res.redirect('/'); //you shall not pass
    }
  },
  //checks if logged in? if already logged in continue. if not prior logged in then store old url and go to signing page.
  indexIsLoggedIn: function(req, res, next){
    if(req.isAuthenticated()){ //isAuthenticated() is managed by passport.js
      return next(); //you may pass
    }
    else{
      req.session.oldUrl = req.url;
      res.redirect('/user/signin'); //you shall not pass
    }
  },
  //check input from sendBestilling
  checkBestillingBody: function(req, res, next){
    req.checkBody('inputStateBetaling', 'Vælg venligts betalingsform').notEmpty();
    req.sanitizeBody('inputName').escape().trim();
    req.checkBody('inputName', 'Indtast venligst dit navn').notEmpty();
    req.sanitizeBody('inputAddress').escape().trim();
    req.checkBody('inputAddress', 'Indtast venligts din adresse').notEmpty();
    req.sanitizeBody('inputZip').escape().trim();
    req.checkBody('inputZip', 'Indtast venligst dit postnummer').notEmpty();
    req.sanitizeBody('inputPhone').escape().trim();
    req.checkBody('inputPhone', 'Indtast venligst dit telefonnummer').notEmpty();
    var errors = req.validationErrors(); //extracts any errors from checkBody
    if(errors){
      var messages = [];
      errors.forEach(function(error){
        messages.push(error.msg); //.msg is also added by express-validator
      })
      req.flash('errors', messages);
      res.redirect('/bestilling');
      return;
    }//end if errors validation
    return next();
  }
}
