const db = require('./db');

const Curso = db.sequelize.define('cursos',{
   titulo: {
       type: db.Sequelize.STRING,
   },
   conteudo:{
       type: db.Sequelize.TEXT
   }
})

module.exports = Curso;

//Curso.sync({force: true}); // Após executar esse comando deve-se comentá-lo