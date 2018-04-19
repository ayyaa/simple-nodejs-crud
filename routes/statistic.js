const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const student = require('./sequelize/models/seq-students');

router.get('/chart/:year', function(req, res) {
  var getMonth = ['January','February','March','April','May','June','July','August','September','October','November','December'],
    getFrek = [0,0,0,0,0,0,0,0,0,0,0,0],
    getFrek_gen = [], 
    getGender = [], 
    temp_Frek, 
    temp_Frek_gen, 
    temp_Month, 
    temp_Gen;

  student.findAll({
    attributes: [
      [Sequelize.fn('month', Sequelize.col('date_time')), 'month'],
      [Sequelize.fn('count', Sequelize.col('id_student')), 'Frek']
    ],
    where: 
      Sequelize.where(Sequelize.fn('year', Sequelize.col('date_time')), [req.params.year])
    ,
    group: 
      [Sequelize.fn('month', Sequelize.col('date_time'))]
  })
  .then(rows => {
    console.log(rows);
    for (var i = 0; i < rows.length; i++) {
      var month = rows[i].dataValues.month;
      console.log(month);
      getFrek.fill(rows[i].dataValues.Frek, (month-1), month);
    }      
    console.log(getMonth);
    console.log(getFrek);
    temp_Frek = JSON.stringify(getFrek);
    temp_Month = JSON.stringify(getMonth);

    student.findAll({
      attributes: [
        [Sequelize.col('gender'), 'gender'],
        [Sequelize.fn('count', Sequelize.col('id_student')), 'frek_gen']
      ],
      group: ['gender']
    }).then(rows => {
      for (var j = 0; j < rows.length; j++) {
        if (rows[j].gender == "M") {
          getGender.push("Male");
        } else if (rows[j].gender == "F") {
          getGender.push("Female");
        }
        getFrek_gen.push(rows[j].dataValues.frek_gen)
      }  
      console.log(getFrek_gen);

      temp_Gen = JSON.stringify(getGender);
      temp_Frek_gen = JSON.stringify(getFrek_gen);
      res.render('statistic', {title: req.params.id, title_chart2:'Chart of Ratio Gender', title_chart1:'Student Ratio Chart', getFrek: temp_Frek, getFrekGen: temp_Frek_gen, getMonth: temp_Month, getGender: temp_Gen, nameTag: req.user.user});
    })
  })
  .catch(() => {
  })
});

module.exports = router;