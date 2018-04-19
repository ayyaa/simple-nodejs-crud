const Sequelize = require('sequelize');
const sequelize = require('../seq-config');

// sequelize.authenticate()
// .then(() => {
//   console.log('connected');
// })
// .catch(() => {
//   console.error('error con', err);
// })

var student = sequelize.define('student', {
  id_student: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  address: Sequelize.STRING,
  email_student: Sequelize.STRING,
  gender: Sequelize.ENUM('M','F'),
  date_of_birth: Sequelize.DATE,
  date_time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.Now,
  }
});

module.exports = student;
