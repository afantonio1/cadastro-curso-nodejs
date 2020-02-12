   //Conexao banco de dados MySQL
   const Sequelize = require('sequelize');
   const sequelize = new Sequelize('cursos','root','masterkey',{
       host: "localhost",
       dialect: "mysql"
   });

   module.exports = {
       Sequelize: Sequelize,
       sequelize: sequelize
   };