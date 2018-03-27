const express = require('express');
const router = express.Router();

router.post('/delete/:id', function(req, res, next) {
  req.getConnection(function(error, conn) {
    if (error) return next(error);

    conn.query('DELETE FROM student WHERE id_student = ?', [req.params.id], function(err, result) {
      if (err) return next(err);
      req.flash('success', 'Selected student has been removed.')
      res.redirect('/student');
    });  
  })
});

module.exports = router;
