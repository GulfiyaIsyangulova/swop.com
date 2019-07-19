const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');
const Item = require('../models/Item');
const User = require('../models/User');



/* GET home page */
router.get('/new-offer/:idOfOwner', (req, res, next) => {

  // get item by id 
  //get all item of current user
  Item.find({ owner: req.params.idOfOwner }).populate('owner')
    .then((allTheItemsFromTheOwner) => {
      
      let proposer = req.user._id;
      Item.find({ owner: proposer })
        .then((ownerItems) => {
          let data = {
            theirItems: allTheItemsFromTheOwner,
            myItems: ownerItems,
            theirId: req.params.idOfOwner
          };
          res.render('offer-views/new-offer', data);
        }).catch((err) => {
          next(err)
        });

    })
    .catch((err) => {
      console.log(" I am an error!!", err)
      next(err);
    })



});




router.post('/makeoffer/:id', (req, res, next) => {

  const myId = req.user._id;
  const theirId = req.params.id
  const myItems = req.body.myItems;
  const theirItems = req.body.theirItems;


  Offer.create({
    proposer: myId,
    receiver: theirId,
    proposerItems: myItems,
    receiverItems: theirItems,
    date: new Date(),
    isFinal: false,
    accepted: false,
    active: true
  })
    .then(() => {
      res.redirect('/profile');
    })
    .catch((err) => {
      next(err);
    })


})



router.get('/offers-section', (req, res, next) => {
  // console.log(req.session.currentUser);
  // if(!req.session.currentUser){
  //     res.redirect('/login')
  // }

  Offer.find().populate('proposer').populate('receiver').populate('proposerItems').populate('receiverItems')
    .then((allOffers) => {
      console.log(allOffers)
      res.render('offer-views/offers-section', { theOffers: allOffers })
    })
    .catch((err) => {
      next(err);
    })
})


router.get('/each-offer/detail/:idOftheOffer', (req, res, next) => {
  // console.log(req.session.currentUser);
  // if(!req.session.currentUser){
  //     res.redirect('/login')
  // }
  Offer.findById(req.params.idOftheOffer).populate('proposer').populate('receiver').populate('proposerItems').populate('receiverItems')
    .then((oneSingleOffer) => {
      // var theDay = new Date(oneSingleOffer.date);
      // console.log("====================== ", theDay.getMonth())
      res.render('offer-views/each-single-offer', { theOffer: oneSingleOffer })
    })
    .catch((err) => {
      next(err);
    })
})



router.post('/accept-offer/:theId', (req, res, next) => {

  let offerId = req.params.theId;
  let accepted = req.body.accepted;

  Offer.findByIdAndUpdate(offerId, { accepted: true })


    .then(() => {
      res.redirect('/profile');
    })
    .catch((err) => {
      next(err);
    })


})

router.post('/deny-offer/:theId', (req, res, next) => {

  let offerId = req.params.theId;
  let active = req.body.active;

  Offer.findByIdAndUpdate(offerId, { active: false })


    .then(() => {
      res.redirect('/profile');
    })
    .catch((err) => {
      next(err);
    })


})







router.post('/offer/delete/:id', (req, res, next) => {

  Offer.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/profile');
    })
    .catch((err) => {
      next(err);
    })


})


module.exports = router;
