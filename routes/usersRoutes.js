const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');
const Item = require('../models/Item');
const passport = require('passport');

const ensureLogin = require("connect-ensure-login");


router.get('/signup', (req, res, next)=>{

  res.render('user-views/signup-view');
})


router.post('/signup', (req, res, next)=>{

  const theUsername = req.body.theUsername;
  const thePassword = req.body.thePassword;


  const salt = bcrypt.genSaltSync(10);
  const hashedPassWord =  bcrypt.hashSync(thePassword, salt);

  User.create({
      username:theUsername,
      password: hashedPassWord
  })
  .then(()=>{
      console.log('yay');
      req.flash('success'," User succesfully created. You may now login.")
      res.redirect('/')
  })
  .catch((err)=>{
      next(err);
  })
})


router.get('/login', (req, res, next)=>{
  res.render('user-views/login-view')
})


router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
  failureFlash: true,
  passReqToCallback: true
}));


router.post('/logout', (req, res, next)=>{
  req.logout();
  res.redirect("/login");
})

router.get('/profile', (req, res, next)=>{
  console.log('-=-=-=-=-=-', req.user)
  if(!req.user) {
    res.redirect('/login')
  }
  Item.find({"owner": req.user._id})
  .then(userItems => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",req.user_id)

    res.render('user-views/profile', {items: userItems})
  }).catch(err => next(err))
})




module.exports = router;