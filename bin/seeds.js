const mongoose     = require('mongoose');
const Item       = require('../models/Item');
const Schema = mongoose.Schema;

mongoose
  .connect('mongodb://localhost/barter-app', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  // title: String,
  // price : String,
  // category: Array,
  // description: String,
  // image: String,
  // owner: { type: Schema.Types.ObjectId, ref: "UserModel"}


  const blah = [
    {
        title: "New Rag & Bone Jeans",
        price: "50",
        category: ['mens', 'pants'],
        description: "New Rag & Bone Jeans",
        image: " https://images.media-allrecipes.com/images/75131.jpg",
        owner: mongoose.Types.ObjectId('5d2ca012b9ab7407caf4826e')
    },
    {
      title: "Rag & Bone",
      price: "34",
      category: ['womens', 'clothing', 'tops', 'holiday'],
      description: "Sneakers",
      image: " https://images.media-allrecipes.com/images/75131.jpg",
      owner: mongoose.Types.ObjectId('5d2ca012b9ab7407caf4826e')
    },
    {
      title: "Iphone 6 used",
        price: "150",
        category: Array,
        description: "Iphone 6X unlocked",
        image: " https://images.media-allrecipes.com/images/75131.jpg",
        owner: mongoose.Types.ObjectId('5d2ca012b9ab7407caf4826e');
    },
    {
      title: "Nike backpack",
        price: "20",
        category: Array,
        description: "New Nike backpack",
        image: " https://images.media-allrecipes.com/images/75131.jpg",
        owner: mongoose.Types.ObjectId('5d2ca012b9ab7407caf4826e')
    }
    
 
];

Item.create(blah)
  .then(()=>{
      console.log('it worked')
  })
  .catch((e)=>{
      console.log('it didnt work');
      console.log(e);
  })
  