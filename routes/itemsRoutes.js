const express = require('express');
const router  = express.Router();
const Item   = require('../models/Item');
const ensureLogin = require("connect-ensure-login");
const uploadMagic = require('../config/cloudinary');


//   res.render('items-views/items-all-categories');
// });

// need a get route to render to do Item.find() and get all the items
// and render an hbs file and pass all the items into that file

// need hbs file to do a {{#each}} loop over the items and show them all

// need links on the page to each category the links will go to this route:

// get /items/categories/:theCategory

// this route is going to render the same hbs file as the previous one,
//  but the difference is its gonna do Item.find({category: req.params.theCategory})
//  and pass in the result to the hbs file so it wont be all the items only.

router.get('/categories', (req, res, next)=>{
  console.log(req.session.currentUser);
  // if(!req.session.currentUser){
  //     res.redirect('/login')
  // }
     Item.find()
      .then((allItems)=>{
        console.log(allItems)
          res.render('items-views/items-all-categories', {theItems: allItems})
      })
      .catch((err)=>{
          next(err);
      })
  })

  
  router.get('/categories/detail/:theCategory', (req, res, next)=>{
    Item.find({category: req.params.theCategory}).populate('owner')
    .then((allTheItems)=>{
      console.log(allTheItems)
      res.render('items-views/items-all-categories', {theItems:allTheItems})
    })
    .catch((err)=>{
      console.log(" I am an error!!", err)
      next(err);
    })
  })
  
  router.get('/one-item/:idOfItem', (req, res, next)=>{
    console.log(req.params.idOfItem)
   Item.findById(req.params.idOfItem).populate('owner')
     .then((oneSingleItem)=>{
       console.log("---------------------- ", oneSingleItem.owner);
       
         res.render('items-views/one-item', {theItem:oneSingleItem})
     })
     .catch((err)=>{
       console.log(" I am an error!!", err)
         next(err);
     })
 })
 router.get('/profile', (req, res, next)=>{
  console.log(req.session.currentUser);
  // if(!req.session.currentUser){
  //     res.redirect('/login')
  // }
     Item.find()
      .then((allItems)=>{
        console.log(allItems)
          res.render('profile', {items: allItems})
      })
      .catch((err)=>{
          next(err);
      })
  })


  router.get('/createNewListing', (req, res, next) => {
    res.render('items-views/creat-item')
  })

  router.post('/createNewListing', uploadMagic.single('thePic'), (req, res, next)=>{
    const {theTitle, thePrice, theCategory, theDescription} = req.body;
    const theOwner = req.user._id;
    const theImg = req.file.url;
    let newItem = {
      title: theTitle,
      price: thePrice, 
      category: theCategory, 
      description: theDescription, 
      image: theImg, 
      owner: theOwner
    }

    Item.create(newItem)
    .then((response)=>{
      console.log(newItem)
        res.redirect('/profile')
    })
    .catch((err)=>{
        console.log(newItem)
        res.json(err);
    })
})

router.post('/oneItem/delete/:id', (req, res, next)=>{

  Item.findByIdAndRemove(req.params.id)
  .then(()=>{
      res.redirect('/profile');
  })
  .catch((err)=>{
      next(err);
  })


})

router.get('/oneItem/edit/:id', (req, res, next)=>{
  Item.findById(req.params.id)
  .then((ItemFromDb)=>{
          res.render('partials/editListing', {item: ItemFromDb})
  })
  .catch((err)=>{
      next(err);
  })
})
router.post('/oneItem/update/:itemID', uploadMagic.single('thePic'), (req, res, next)=>{
  let theID = req.params.itemID;
  const theTitle = req.body.title;
  const thePrice = req.body.price;
  const theCategory = req.body.category;
  const theDescription = req.body.description;
  const theOwner = req.user._id;
  
  if(req.file){

    const theImg = req.file.url;
  }

 
  Item.findByIdAndUpdate(theID, {

      title: theTitle,
      price: thePrice, 
      category: theCategory, 
      description: theDescription, 
      image: theImg, 
      owner: theOwner
    


  })
  .then((apple)=>{
      res.redirect('/one-item/'+theID)
  })
  .catch((err)=>{
      next(err);
  })
})









 
  

module.exports = router;
