const express = require('express');
const router = express.Router();

router.get('/student/', function(req, res) {
  req.getConnection(function(error, conn) {
    var search, get_atr, sort;
    if (req.query.search === undefined || req.query.get_atr === undefined || req.query.sort === undefined) {
      search = '';
      get_atr = 'id_student';
      sort = 'DESC';
    } else {
      search =req.query.search;
      get_atr = req.query.get_atr;
      sort = req.query.sort;
    }
    var sql_select_student = "SELECT * FROM student WHERE ?? LIKE CONCAT('%', ? ,'%') ORDER BY ?? "+sort;
    var query = conn.query(sql_select_student, [get_atr, search, get_atr], function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(500).json({"status_code": 500,"status_message": "internal server error"});
      } else {
        var notif, notif2;
        var number = rows.length;
        if (number === 0) {
          notif = 'data "'+search+'" from "'+get_atr+'" not found';
        } else {
          notif2 = 'found '+number+' data based on character "'+search+'" from column "'+get_atr+'"';
        }
      res.render('index', {title: 'Student List', data: rows, notif: notif, notif2: notif2});
      }
    });
    console.log(query.sql)
  })
});

module.exports = router;
