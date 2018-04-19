const Sequelize = require('sequelize');
const sequelize = require('../seq-config');

// sequelize.authenticate()
// .then(() => {
//   console.log('connected');
// })
// .catch(() => {
//   console.error('error con', err);
// })

var user = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  reset_password_token: Sequelize.STRING,
  reset_password_expires: Sequelize.DATE,
  confirm_token: Sequelize.STRING,
  secret_code: Sequelize.STRING,
  status_two_fa: Sequelize.ENUM('enable','disable'),
  url_qr: Sequelize.STRING
});

module.exports = user;