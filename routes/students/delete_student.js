const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const student = require('../sequelize/models/seq-students');

router.post('/delete/:id', function(req, res, next) {
  student.destroy({ 
    where: {
      id_student: req.params.id
    },
    force: true })
  .then(() => {
    req.flash('success', 'Selected student has been removed.')
    res.redirect('/student');
  })
});

module.exports = router;
