const express = require('express');
const router = express.Router();
const flash = require('express-flash');
const express_validator = require('express-validator');
const alert = require('alert-node');
const script = require('../public/javascripts/scripts');

router.get('/add', function(req, res) {
  res.render('form', {title: 'Input Student'});
});

router.post('/add', function(req, res) {
  var stat, notif;
  var date_of_birth = req.body.date_of_birth;
  stat = script.dateValidateGetAge(date_of_birth);
  req.assert('name', 'Name is required').notEmpty();          
  req.assert('address', 'address is required').notEmpty();             
  req.assert('email_student', 'email is not Valid').isEmail();
  req.assert('date_of_birth', 'date is required').notEmpty();

  var errors = req.validationErrors();

  if(!errors && stat == true) {
    req.getConnection(function(error, conn) {
      var atrStudent = {
        name: req.body.name,
        address:req.body.address,
        email_student: req.body.email_student,
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth
      }
      var sql_insert_student = 'INSERT INTO student SET ?';
      conn.query(sql_insert_student, [atrStudent], function(err, res) {
        if (err) throw err;
      });
    })
    res.redirect('/student');
  } else {
    var error_msg = '';
    if (errors && stat == false){
      error_msg = 'you are is under 18 years old \n';
      errors.forEach(function(error) {
        error_msg += error.msg + '\n'
      })
    } else {
      if (!errors && stat == false ) {
        error_msg = 'you are is under 18 years old \n';
      } else {
        errors.forEach(function(error) {
          error_msg += error.msg + '\n';
        })
      }
    }
    alert( error_msg)
  }
});

module.exports = router;
