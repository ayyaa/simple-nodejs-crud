const express = require('express');
const router = express.Router();
const alert = require('alert-node');
const config = require('../../config');
const validateJoi = require('../joi-validate/joi-users');
const Sequelize = require('sequelize');
const users = require('../sequelize/models/seq-users');
var twoFactor = require('node-2fa');
const passport = require('passport');

router.get('/user', function(req, res, next) {
  users.findAll()
  .then(rows => {
    res.render('admin_list', {title: 'User List', data: rows, nameTag: req.user.user});
  })
  .catch(() => {
    res.status(500).json({"status_code": 500,"status_message": "internal server error"});
  })
});

router.post('/addUser', function(req, res, next) {
  validateJoi.validate({uname: req.body.uname, pass: req.body.pass, mail: req.body.mail}, function(errors, value) {
    if (!errors) {
      var salt = config.salt.value;
      var password = value.pass;
      password = salt+''+password;
      var username = value.uname;
      var email_address = value.mail;

      users.findAll({
        attributes: ['user'],
        where: {
          user: username
        }
      })
      .then(rows => {
        if (rows.length > 0) {
          concole.log(rows)
          alert("Duplicate entry username !\nPlease input another username");          
        } else {
          users.findAll({
            attributes: ['email'],
            where: {
              email: email_address
            }
          })
          .then(rows => {
            if (rows.length > 0){
              alert("Duplicate entry email !\nPlease input another email");
            } else {
              users.create({ 
                user: username, 
                password: Sequelize.fn('sha1', password), 
                email: email_address 
              })
              .then(rows => {
                req.flash('success', 'Successful added user.');
                res.redirect('/user');
                console.log(rows);
              })
            }
          })
        }
      })
      .catch(() => {
        res.status(500).json({"status_code": 500,"status_message": "internal server error"});
      })

    } else {
      alert(errors);
    } 
  })
});

router.get('/two-factor-auth', function(req, res, next) {
  users.findOne({
    attributes: ['user', 'secret_code'],
    where: {
      user: req.user.user
    }
  })
  .then(rows => {
    console.log(rows.user);
    res.render('two-factor-auth', {title: 'Security', nameTag: req.user.user, val_user: req.user.user});
  })
  .catch(() => {
    res.status(500).json({"status_code": 500,"status_message": "internal server error"});
  })
});

router.post('/two-factor-auth', function(req, res, next) {
  users.findOne({
    attributes: ['user', 'secret_code'],
    where: {
      user: req.user.user
    }
  })
  .then(rows => {
    console.log(rows.user);
    res.render('two-factor-auth', {title: 'Security', nameTag: req.user.user, val_user: req.user.user});
  })
  .catch(() => {
    res.status(500).json({"status_code": 500,"status_message": "internal server error"});
  })
});

// router.post('/two-factor-auth', passport.authenticate('local', {
//   // successRedirect: '/home',
//   failureRedirect: '/',
//   failureFlash: true
// }), function(req, res) {
//   // req.flash('info', 'Welcome, '+ req.user.user+ ' you successfully login');
//   res.redirect('/btn-enable');
// });

router.get('/btn-enable', function(req, res, next) {
  users.findOne({
    attributes: ['user', 'secret_code', 'url_qr', 'status_two_fa'],
    where: {
      user: req.user.user
    }
  })
  .then(function (rows) {
    console.log(rows.dataValues.secret_code);
    if (rows.dataValues.status_two_fa === 'disable') {
      var newSecret = twoFactor.generateSecret({name: 'Student Database', account: req.user.user});
      var atrUsers = {
        secret_code: newSecret.secret,
        url_qr: newSecret.qr
      }
      users.update(
        atrUsers,
        {
        where: {
          user: req.user.user
        }
      })
      .then(update => {
        req.flash('enable', newSecret);
        res.render('two-factor-auth', {title: 'Security', nameTag: rows.dataValues.user, uri_barcode: newSecret.qr, secret_code: newSecret.secret, 'enable': req.flash('enable')});
      })
    } else {
      console.log(rows);
      req.flash('enable', newSecret);
      res.render('two-factor-auth', {title: 'Security', nameTag: rows.dataValues.user, uri_barcode: rows.dataValues.url_qr, secret_code: rows.dataValues.secret_code, 'enable': req.flash('enable')});
    }
  })
});

// router.get('/btn-enable', function(req, res, next) {
//   users.findOne({
//     attributes: ['user', 'secret_code', 'url_qr', 'status_two_fa'],
//     where: {
//       user: req.user.user
//     }
//   })
//   .then(function (rows) {
//     console.log(rows.dataValues.secret_code);
//     if (rows.dataValues.status_two_fa === 'disable') {
//       var newSecret = twoFactor.generateSecret({name: 'Student Database', account: req.user.user});
//       var atrUsers = {
//         secret_code: newSecret.secret,
//         url_qr: newSecret.qr
//       }
//       users.update(
//         atrUsers,
//         {
//         where: {
//           user: req.user.user
//         }
//       })
//       .then(update => {
//         req.flash('enable', newSecret);
//         res.render('two-factor-auth', {title: 'Security', nameTag: rows.dataValues.user, uri_barcode: newSecret.qr, secret_code: rows.dataValues.secret_code, 'enable': req.flash('enable'), id:"#active"});
//       })
//     } else {
//       console.log(rows);
//       req.flash('enable', newSecret);
//       res.render('two-factor-auth', {title: 'Security', nameTag: rows.dataValues.user, uri_barcode: rows.dataValues.url_qr, secret_code: rows.dataValues.secret_code, 'enable': req.flash('enable')});
//     }
//   })
// });

router.get('/btn-disable', function(req, res, next) {
  users.findOne({
    attributes: ['user', 'secret_code', 'url_qr', 'status_two_fa'],
    where: {
      user: req.user.user
    }
  })
  .then(function (rows) {
    console.log(rows.dataValues.secret_code);
    // if (rows.dataValues.status_two_fa === 'enable') {
      var atrUsers = {
        secret_code: rows.dataValues.secret_code,
        url_qr: rows.dataValues.url_qr,
        status_two_fa: 'disable'
      }
      users.update(
        atrUsers,
        {
        where: {
          user: req.user.user
        }
      })
      .then(update => {
        res.render('two-factor-auth', {title: 'Security', nameTag: rows.dataValues.user});
      })
    // } else {




    // }
  })
});

router.post('/activated-two-fa', function(req, res, next) {
  users.findOne({
    attributes: ['user', 'secret_code', 'url_qr', 'status_two_fa'],
    where: {
      user: req.user.user
    }
  })
  .then(function (rows) {
    console.log(rows.dataValues.secret_code);
    // if (rows.dataValues.status_two_fa === 'disable') {
      var newToken = twoFactor.generateToken(rows.dataValues.secret_code);
      var status = twoFactor.verifyToken(rows.dataValues.secret_code, req.body.security_code);
      console.log(newToken.token);
      console.log(status);

      if (status === null ) {
        req.flash('enable');
        req.flash('error', 'try again !');
        res.render('two-factor-auth', {title: 'Security', nameTag: rows.dataValues.user, uri_barcode: rows.dataValues.url_qr, secret_code: rows.dataValues.secret_code, 'error': req.flash('error'), 'enable': req.flash('enable')});
      } else  {
        var atrUsers = {
          status_two_fa: 'enable'
        }
        users.update(
          atrUsers,
          {
          where: {
            user: req.user.user
          }
        })
        .then(update => {
          req.flash('info', 'two factor authentication enabled');
          res.render('two-factor-auth', {title: 'Security', nameTag: rows.dataValues.user,  'info': req.flash('info')});
          alert('berhasil');
        })
      }

      // if (status.delta === 0 ) {
      //   var atrUsers = {
      //     status_two_fa: 'enable'
      //   }
      //   users.update(
      //     atrUsers,
      //     {
      //     where: {
      //       user: req.user.user
      //     }
      //   })
      //   .then(update => {
      //     alert('berhasil')
      //   })
      // } else if (status === null) {
      //   req.flash('error', 'token did not work');
      //   res.render('two-factor-auth', {title: 'Security', nameTag: rows.dataValues.user, uri_barcode: rows.dataValues.url_qr, secret_code: rows.dataValues.secret_code, 'error': req.flash('error')});
      // }
    // } else {
      
    // }
  })
});



// router.post('/two_fa/', function(req, res) {
//   console.log(req.body.username)
//   users.findAll({
//     where: {
//       username: [req.body.username]
//     }
//   }).then(function(rows) {
//     var verifytoken = twoFactor.verifyToken(rows[0].secretkey, req.body.token);
//     console.log(req.body.token)
//     var newToken = twoFactor.generateToken(rows[0].secretkey)
//     console.log(newToken)
//     if (verifytoken !== null) {
//       users.findOne({
//         where: {
//           user: [req.body.username]
//         },
//         attributes: ['id', 'username', 'password']
//       }).then(user => 
//         req.login(user, function (err) {
//           if (err) {
//             req.flash('error', err.message);
//             console.log('user',user)
//             return res.redirect('back');
//           }
//           console.log('Logged user in using Passport req.login()');
//           console.log('username',req.user.username);
//           req.flash('info', 'Hi '+req.user.username+', you successfully logged in')
//           res.redirect('/')
//         })
//       ) 
//     } else {
//       req.flash('failed','wrong token, try again !')
//       res.render('login/two_fa',{'error': req.flash('failed'),stoken: req.body.token, susername: req.body.username})
//     }
//   }).catch(error => {
//     req.flash('failed','wrong token, try again !')
//     res.render('login/two_fa',{'error': req.flash('failed'),stoken: req.body.token, susername: req.body.username})
//   })
// })

module.exports = router;
