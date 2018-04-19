const express = require('express');
const router = express.Router();
const validateJoi = require('../joi-validate/joi-student');
const alert = require('alert-node');
const moment = require('moment');
const Sequelize = require('sequelize');
const student = require('../sequelize/models/seq-students');

router.get('/student/:id', function(req, res, next) {
  student.findAll({
    where: {
      id_student: req.params.id
    }
  })
  .then(rows => {
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
        val_birth_of_date: moment(rows[0].date_of_birth).format('YYYY-MM-DD'),
        nameTag : req.user.user
      });
    }
  })
  .catch(() => {
    res.status(500).json({"status_code": 500,"status_message": "internal server error"});
  })
});

router.post('/update', function(req, res, next) {
  var age = moment().diff(req.body.date_of_birth, 'years');

  validateJoi.validate({name: req.body.name, address: req.body.address, email_student: req.body.email_student, gender: req.body.gender, date_of_birth: req.body.date_of_birth, age: age}, function( errors, value) {
    if (!errors ) {
      var atrStudent = {
        id_student: req.body.id_student,
        name: req.body.name,
        address:req.body.address,
        email_student: req.body.email_student,
        gender: req.body.gender,
        date_of_birth: req.body.date_of_birth
      }

      student.update(
        atrStudent,
        { where: {
          id_student: req.body.id_student
        }
      })
      .then(() => {
        req.flash('success', 'Successful update student')
        res.redirect('/student');
      })
    } else {
      req.flash('error', errors);
      res.render('update', {
        title: 'Update Student',
        val_id_student: req.body.id_student,
        val_name: req.body.name,
        val_address: req.body.address,
        val_gender: req.body.gender,
        val_email_student: req.body.email_student,
        val_birth_of_date: moment(req.body.date_of_birth).format('YYYY-MM-DD')
      });
    }
  })
});

module.exports = router;
