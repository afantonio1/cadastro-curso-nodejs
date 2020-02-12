const db = require('./db');

const Usuario = db.sequelize.define('usuarios',{
      usu_nome:{
          type: db.Sequelize.STRING,
          require: true
      },
      usu_email:{
          type: db.Sequelize.STRING,
          require: true
      },
      usu_senha:{
          type: db.Sequelize.STRING,
          require: true
      },
      usu_role: {
          type: db.Sequelize.INTEGER,
          require: true
      }
});

module.exports = Usuario;

// Usuario.sync({force: true});