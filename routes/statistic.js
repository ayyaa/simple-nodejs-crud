const express = require('express');
const router = express.Router();

router.get('/chart/:year', function(req, res) {
  var getMonth = ['January','February','March','April','May','June','July','August','September','October','November','December'],
    getFrek = [0,0,0,0,0,0,0,0,0,0,0,0],
    getFrek_gen = [], 
    getGender = [], 
    temp_Frek, 
    temp_Frek_gen, 
    temp_Month, 
    temp_Gen;

  req.getConnection(function(error, conn) {
    var sql_get_data_chart_student = "select month(date_time) as month, count(id_student) as Frek from student where year(date_time) = ? group by month(date_time)";
    conn.query(sql_get_data_chart_student, [req.params.year], function (err, rows, fields) {  
      if (err) {
        console.log(err);
      } else  {
        for (var i = 0; i < rows.length; i++) {
          var month = rows[i].month;
          console.log(month);
          getFrek.fill(rows[i].Frek, (month-1), month);
        }      
        console.log(getMonth);
        console.log(getFrek);
        temp_Frek = JSON.stringify(getFrek);
        temp_Month = JSON.stringify(getMonth);
      }

      var sql_get_data_chart_gender_student = "select gender as gender, count(id_student) as frek_gen from student group by gender";
      conn.query(sql_get_data_chart_gender_student, function (err, rows, fields) {
        if (err) {
          console.log(err);
        } else  {
          for (var j = 0; j < rows.length; j++) {
            if (rows[j].gender == "M") {
              getGender.push("Male");
            } else if (rows[j].gender == "F") {
              getGender.push("Female");
            }
            getFrek_gen.push(rows[j].frek_gen)
          }  
          console.log(getFrek_gen);

          temp_Gen = JSON.stringify(getGender);
          temp_Frek_gen = JSON.stringify(getFrek_gen);
          res.render('statistic', {title: req.params.id, title_chart2:'Chart of Ratio Gender', title_chart1:'Student Ratio Chart', getFrek: temp_Frek, getFrekGen: temp_Frek_gen, getMonth: temp_Month, getGender: temp_Gen});
        }
      }) 
    })   
  })
});

module.exports = router;