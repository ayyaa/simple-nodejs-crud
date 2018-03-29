const express = require('express');
const router = express.Router();
const validateJoi = require('./joi-validate/joi-student');
const moment = require('moment');

router.get('/add', function(req, res) {
  res.render('form', {title: 'Input Student'});
});

router.post('/add', function(req, res, next) {
  var age = moment().diff(req.body.date_of_birth, 'years');

  validateJoi.validate({name: req.body.name, address: req.body.address, email_student: req.body.email_student, gender: req.body.gender, date_of_birth: req.body.date_of_birth, age: age}, function( errors, value) {
    if(!errors) {
      req.getConnection(function(error, conn) {
        if (error) return next(error);
  
        var atrStudent = {
          name: req.body.name,
          address:req.body.address,
          email_student: req.body.email_student,
          gender: req.body.gender,
          date_of_birth: req.body.date_of_birth
        }
        conn.query('INSERT INTO student SET ?', [atrStudent], function(err, result) {
          if (err) return next(err);

          req.flash('success', 'Successful inserted student')
          res.redirect('/student');
        });
      })
    } else {
      req.flash('error', errors)
      res.render('form', { 
        val_name: req.body.name,
        val_address:req.body.address,
        val_email: req.body.email_student,
        val_gender: req.body.gender,
        val_birth: req.body.date_of_birth
      })
    }
  })
});

module.exports = router;
