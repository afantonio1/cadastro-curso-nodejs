//Usar constantes evita que essas variáveis sejam sobrescritas
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Curso = require('./models/Curso');
const moment = require('moment');
app.use(express.static(__dirname + '/public/css/'));
app.use('/edit', express.static(__dirname + '/public/css/'));

let id;

//config
   //Template Engine
   app.engine('handlebars', handlebars({
      defaultLayout: 'main',
      helpers:{
         formatDate: (date) =>{
            return moment(date).format('DD/MM/YYYY')
         }
      }
   }));
   app.set('view engine', 'handlebars');

   //bodyParser
   app.use(bodyParser.urlencoded({extended: false}));
   app.use(bodyParser.json());

   //Rota para cadastrar um novo curso
   app.get('/cadastrar', function(req, res){
      res.render(__dirname +'/views/formulario');
   });

 //Rota para cadastrar um novo curso
 app.get('/registrar', function(req, res){
   res.render(__dirname +'/views/form-usuarios');
});

 //Rota para cadastrar um novo curso
 app.get('/login', function(req, res){
   res.render(__dirname +'/views/login');
});

 //Rota para cadastrar um novo curso
 app.get('/relembrar-senha', function(req, res){
   res.render(__dirname +'/views/relembrar-senha');
});


   //rota para lista cursos cadastrados
   app.get('/listar', function(req, res){
      Curso.findAll({order: [['id','desc']]}).then(function(cursos){
         res.render('lista-cursos', {cursos: cursos});
   });
});

   app.get('/', function(req, res){
      Curso.findAll({order: [['id','desc']]}).then(function(cursos){
         res.render('lista-cursos', {cursos: cursos});
      });
   });

   //Adicionar para gravar o registro no banco
   app.post('/add', function(req, res){
      Curso.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
     }).then(function(){
         res.redirect('/listar');
     }).catch(function(){
        res.send('Houve um erro ao enviar o curso.');
     });
   });

   //Rota para excluir um registro da lista
   app.get('/excluir/:id', function(req, res){
      Curso.destroy({where: {'id' : req.params.id}}).then(function(){
          res.redirect('/listar');
      }).catch(function(erro){
         res.send('Curso não encontrado.');
      })
   })

   //Rota para editar um registro a partir da lista
   app.get('/edit/:id', function(req, res){
      id = req.params.id;
      Curso.findByPk(id)
      .then(curso => {
         res.render('editar',{
            titulo: curso.titulo,
            conteudo: curso.conteudo
       })
      }).catch(function(erro){
         res.send('Curso não localizado.');
      })
    })

    app.post('/editado', function(req, res){
      Curso.update({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
      },
      {
        where: { id: id}
      }).then(function(){
        res.redirect('/listar')
      }).catch(function(err){
        console.log(err);
      })
    })


//Geralmente essa deve ser a última linha de código
app.listen(8081, function(){
    console.log('Servidor rodando na URL..: http://localhost:8081/')
});