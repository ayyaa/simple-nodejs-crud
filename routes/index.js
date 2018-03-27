const express = require('express');
const router = express.Router();

router.get('/home', function(req, res) {
  res.render('home', {title: 'Web Information Student', define: 'Student of Wonderlabs Academy', about: 'by Tsurayya Ats Tsauri'});
});

module.exports = router;
