const express = require('express');
const router = express.Router();
const express_validator = require('express-validator');
const alert = require('alert-node');
const config = require('../config');
const validateJoi = require('./joi-validate/joi-users');

router.get('/user', function(req, res, next) {
  var userList = [];
  req.getConnection(function(error, conn) {
    if (error) return next(err);

    conn.query('SELECT * FROM user', function(err, rows, fields) {
      if (err) {
        res.status(500).json({"status_code": 500,"status_message": "internal server error"});
      } else {
      res.render('admin_list', {title: 'User List', data: rows});
      }
    });   
  })
});

router.post('/addUser', function(req, res, next) {
  validateJoi.validate({uname: req.body.uname, pass: req.body.pass, mail: req.body.mail}, function( errors, value) {
    console.log(value);
    if (!errors) {
      var salt = config.salt.value;
      var password = value.pass;
      password = salt+''+password;
      var username = value.uname;
      var email_address = value.mail;
      req.getConnection(function(error, conn) {
        if (error) return next(error);

        conn.query("SELECT user FROM user WHERE user = ?", [username], function(err, rows, fields) {
          if (err) return next(err);

          if (rows.length > 0) {
            alert("Duplicate entry username !\nPlease input another username");          
          } else {
            conn.query("SELECT email FROM user WHERE email = ?", [email_address], function(err, rows, fields){
              if (err) return next(err);

              if (rows.length > 0){
                alert("Duplicate entry email !\nPlease input another email");
              } else {
                conn.query("INSERT INTO user (user, password, email) VALUES (?, sha1(?), ?)", [username, password, email_address], function(err, result) {
                  if (err) throw err;
                  req.flash('success', 'Successful added user.');
                  res.redirect('/user');
                });
              }
            });  
          }  
        }); 
      })
    } else {
      alert(errors);
    } 
  })
});

module.exports = router;
