const express = require('express');
const router = express.Router();
const flash2 = require('express-flash');
const flash = require('connect-flash');
const express_validator = require('express-validator');
const script = require('../public/javascripts/scripts');
const alert = require('alert-node');
const moment = require('moment');

router.get('/student/:id', function(req, res) {
  req.getConnection(function(error, conn) {
    var sql_select_some_student = 'SELECT * FROM student WHERE id_student = ?';
    conn.query(sql_select_some_student, [req.params.id], function (err, rows, fields) {
      if(err) throw err;

      if(rows.length <= 0) {
        req.flash('error', 'student not found with id '+ [req.params.id]);
        res.redirect('/student');
      } else {
        res.render('update', {
          title: 'Update Student',
          val_id_student: rows[0].id_student,
          val_name: rows[0].name,
          val_address: rows[0].address,
          val_gender: rows[0].gender,
          val_email_student: rows[0].email_student,
          val_birth_of_date: moment(rows[0].date_of_birth).format('YYYY-MM-DD')
        });
      }
    }) 
  })
});

router.post('/update', function(req, res) {
  var notif, stat;
  var date_of_birth1 = req.body.date_of_birth;
  stat = script.dateValidateGetAge(date_of_birth1);
  req.assert('name', 'Name is required').notEmpty();          
  req.assert('address', 'address is required').notEmpty();             
  req.assert('email_student', 'email is not Valid').isEmail();
  req.assert('date_of_birth', 'date is required').notEmpty();

  var errors = req.validationErrors();

  if (!errors && stat == true) {
    var atrStudent = {
      id_student: req.body.id_student,
      name: req.body.name,
      address:req.body.address,
      email_student: req.body.email_student,
      gender: req.body.gender,
      date_of_birth: req.body.date_of_birth
    }
    req.getConnection(function(error, conn) {
      var sql_select_some_student = 'SELECT * FROM student WHERE id_student = ?';
      conn.query(sql_select_some_student, [req.body.id_student], function(err, rows, fields) {
        if (stat == false) {
          notif = 'you are not old enough for school';
          res.render('update', {
            notif: notif,
            title: 'Update Student',
            val_id_student: rows[0].id_student,
            val_name: rows[0].name,
            val_address: rows[0].address,
            val_gender: rows[0].gender,
            val_email_student: rows[0].email_student,
            val_birth_of_date: moment(rows[0].date_of_birth).format('YYYY-MM-DD')
          });
        } else {
          var sql_update_student = 'UPDATE student SET ? WHERE id_student = ?';
          conn.query(sql_update_student, [atrStudent, req.body.id_student], function(err, res) {
            if (err) throw err;
          });  
          res.redirect('/student');
        }
      }); 
    })
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
