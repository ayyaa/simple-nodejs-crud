const express = require('express');
const router = express.Router();
const express_validator = require('express-validator');
const alert = require('alert-node');
const config = require('../config');

router.get('/user', function(req, res) {
  var userList = [];
  req.getConnection(function(error, conn) {
    var sql_select_user = 'SELECT * FROM user';
    conn.query(sql_select_user, function(err, rows, fields) {
      if (err) {
        res.status(500).json({"status_code": 500,"status_message": "internal server error"});
      } else {
      res.render('admin_list', {title: 'User List', data: rows});
      }
    });   
  })
});

router.post('/addUser', function(req, res) {
  req.assert('uname', 'username is required').notEmpty()          
  req.assert('pass', 'password is required').notEmpty()             
  req.assert('mail', 'email is not Valid').isEmail()

  var errors = req.validationErrors();

  if (!errors) {
    var salt = config.salt.value;
    var password = req.body.pass;
    password = salt+''+password;
    var username = req.body.uname;
    var email_address = req.body.mail;
    req.getConnection(function(error, conn) {
      var sql_select_user_by_username = "SELECT user FROM user WHERE user = ?";
      conn.query(sql_select_user_by_username, [username], function(err, rows, fields) {
        console.log(rows.length);
        if (rows.length > 0) {
          alert("Duplicate entry username !\nPlease input another username");          
        } else {
          var sql_select_email_by_email = "SELECT email FROM user WHERE email = ?";
          conn.query(sql_select_email_by_email, [email_address], function(err, rows, fields){
            if (rows.length > 0){
              alert("Duplicate entry email !\nPlease input another email");
            } else {
              var sql_insert_user = "INSERT INTO user (user, password, email) VALUES (?, sha1(?), ?)";
              conn.query(sql_insert_user, [username, password, email_address], function(err, res) {
                if (err) throw err;
              });
              res.redirect('/user');
            }
          });  
        }  
      }); 
    })
  } else {
    var error_msg = '';
    errors.forEach(function(error) {
      error_msg += error.msg + '\n'
    });
    alert(error_msg);
  } 
});

module.exports = router;
