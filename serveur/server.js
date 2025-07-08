
//import
let express =require('express');
let bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
let apiEtudiantRouter   = require('./routes/etudiantRoute');
let apiProfRouter   = require('./routes/profRoute');
let apiMessageRouter   = require('./routes/messageRoute');
let apiMatiereRoute   = require('./routes/matiereRoute');
let apiRequeteRouter   = require('./routes/requeteRoute');
let apiReponseRouter   = require('./routes/reponseRoute');
let apiSpecialiteRouter   = require('./routes/specialiteRoute');
let apiAuthRouter   = require('./routes/authRoute');
let path = require("path");
const cors = require('cors');

let optionSwaggers = require('./swagger');


const CORS_OPTS = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE'
    ],
  };



//instantiate server
let server = express();

server.use(cors(CORS_OPTS));
//Body Parser configuration ou Middleware qui permet de traiter les donnees de la Request
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'public')));

// Configure routes
server.get('/', function (req, res) {//appele la variable server on utilise get parcequ'on veut recuperer l'infornmation
    res.setHeader('Content-Type', 'text/html');//renvoyer un texte qui sera en html
    res.status(200).send('<h1>Bonjour sur mon super server</h1>');
});

const specs = swaggerJsdoc(optionSwaggers);

server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs)); //middleware + la fonction à recuperer
server.use('/api', apiEtudiantRouter);//le chemin que tout mes dossiers prendront
server.use('/api', apiProfRouter);
server.use('/api', apiMessageRouter);
server.use('/api', apiRequeteRouter);
server.use('/api', apiReponseRouter);
server.use('/api', apiSpecialiteRouter);
server.use('/api', apiMatiereRoute);
server.use('/api', apiAuthRouter);

const db = require('./models');

db.sequelize.sync().then(() => {
  server.listen(3000, ()=> console.log(`application start good in port ${3000}`));
});


// Launch server

