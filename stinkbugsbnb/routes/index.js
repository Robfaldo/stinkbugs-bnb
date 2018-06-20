var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


var mongoDB = 'mongodb://admin123:admin123@ds161700.mlab.com:61700/stinkbugs-bnb';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('../models/Property');
require('../models/User');
const Property = mongoose.model('Property');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('add-property');
});

router.post('/', function (req, res, next) {

  const data = req.body
  const test = new Property({
    property_name: data.property_name,
    price_per_night: data.price_per_night,
    //change this to new specs
    //property_specs: data.property_specs,
    guests: data.guests,
    bedrooms: data.bedrooms,
    beds: data.beds,
    bath: data.bath,
    location: data.property_specs,
    detailed_description: data.detailed_description,
    date_available: data.date_available,
    available_until: data.available_until,
    email_address: data.email_address
  })
  db.collection('properties').save(test, function (err) {
    if (err) return handleError(err);
    // saved!
  });
  res.redirect('display-property')
})

router.get('/display-property', function (req, res, next) {

 Property.find()
   .exec(function (err, list_properties) {
     if (err) {
       return next(err);
     }
     res.render('display-property', {
       title: 'Book List',
       data: list_properties
     });
   });
})

router.get('/signup', function (req, res, next) {
  	res.render('sign_up')
})

router.post('/signup_form', function (req, res, next) {
	const data = req.body
	const User = mongoose.model('User');
	new_user = new User({
		user_name: data.user_name,
		email_address: data.email_address,
		password: data.password
	})
	db.collection('users').save(new_user, function(err){
		if (err) return handleError(err);
	})
  	res.redirect('display-property')
})

router.get('/login', function (req, res, next) {
  res.render('login')
})

module.exports = router;
