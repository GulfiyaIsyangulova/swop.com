const express = require('express');
const router  = express.Router();



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', { message: req.flash('holy cow flash worked') });
});



module.exports = router;
