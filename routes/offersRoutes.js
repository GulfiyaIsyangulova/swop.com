const express = require('express');
const router  = express.Router();
const Offer   = require('../models/Offer');
const Item   = require('../models/Item');
const User  = require('../models/User');


//idofownerofthethingthatiwanttoget
// get the id from params
// get your own id from req.user
// get all the items that are owned by you
// alsoe get all the items that are owned by the other person

// pass in all those items to this page

// put a list of your items on the left side
// put a list of their items on the right side

// each list of items is actually a form
// and each item is eactually a input type checkbox

/* GET home page */
router.get('/new-offer/:idOfOwner', (req, res, next) => {

  // get item by id 
  //get all item of current user
  Item.find({owner: req.params.idOfOwner}).populate('owner')
  .then((allTheItemsFromTheOwner)=>{
    let proposer = req.user._id;
    Item.find({owner:proposer})
    .then((ownerItems)=>{
        let data = {
          theirItems: allTheItemsFromTheOwner,
          myItems: ownerItems,
          theirId: req.params.idOfOwner
        };
        res.render('offer-views/new-offer', data);
    }).catch((err)=>{
      next(err)
    });
    
  })    
  .catch((err)=>{
    console.log(" I am an error!!", err)
      next(err);
  })   
  
  // Item.findById(req.param.idOftheUser)

  
});

// router.get('/categories/detail/:theCategory', (req, res, next)=>{
//   Item.find({category: req.params.theCategory}).populate('owner')
//   .then((allTheItems)=>{
//     console.log(allTheItems)
//     res.render('items-views/items-all-categories', {theItems:allTheItems})
//   })
//   .catch((err)=>{
//     console.log(" I am an error!!", err)
//     next(err);
//   })
// })




router.post('/whatever', (req, res, next)=>{

  console.log('123',req.user)
  console.log(req.body)

  // take the items in req body
  //  and create a new offer with those items
})


router.post('/makeoffer/:id', (req, res, next)=>{

  const myId = req.user._id;
  const theirId = req.params.id
  const myItems = req.body.myItems;
  const theirItems = req.body.theirItems;



  // proposer: { type: Schema.Types.ObjectId, ref: "User"},
  // receiver : { type: Schema.Types.ObjectId, ref: "User"},
  // proposerItems: { type: Schema.Types.ObjectId, ref: "Item"},
  // receiverItems: { type: Schema.Types.ObjectId, ref: "Item"},
  // date: Date,
  // message: String,
  // isFinal: Boolean,
  // accepted: Boolean,
  // active: Boolean,



  

  Offer.create({
    proposer: myId, 
    receiver : theirId,
    proposerItems : myItems,
    receiverItems: theirItems,
    date: new Date(),
    isFinal : false,
    accepted : false,
    active : true
  })
  .then(()=>{
    res.redirect('/profile');
})
.catch((err)=>{
    next(err);
})


  // take the items in req body
  //  and create a new offer with those items
})



router.get('/offer-section', (req, res, next)=>{
  res.render('/offers-views/offer-section')
})











router.post('/offer/delete/:id', (req, res, next)=>{

  Offer.findByIdAndRemove(req.params.id)
  .then(()=>{
      res.redirect('/profile');
  })
  .catch((err)=>{
      next(err);
  })


})


module.exports = router;
