const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API RequeteNote',
      description: 'Cette API permet de gérer les requêtes de notes, les échanges entre étudiants et professeurs, et d’envoyer des notifications par email.',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Etudiant: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            idSpecialite: { type: 'integer' },
            nom: { type: 'string' },
            prenom: { type: 'string' },
            matricule: { type: 'string' },
            email: { type: 'string', format: 'email' },
            niveau: { type: 'integer' },
            motDePasse: { type: 'string', format: 'password' }
          }
        },
        Matiere: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nom: { type: 'string' },
            idProf: { type: 'integer' }
          }
        },
        Message: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            contenu: { type: 'string' },
            idRequete: { type: 'integer' },
            idRecipient: { type: 'integer' },
            recipientType: {
              type: 'string',
              enum: ['Prof', 'Etudiant']
            },
            dateCreation: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Prof: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nom: { type: 'string' },
            prenom: { type: 'string' },
            email: { type: 'string', format: 'email' },
            motDePasse: { type: 'string', format: 'password' },
            matricule: { type: 'string' }
          }
        },
        requete: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            idEtudiant: { type: 'integer' },
            idMatiere: { type: 'integer' },
            motif: { type: 'string' },
            type: { type: 'string' },
            etat: { type: 'string' },
            dateRequete: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        specialite: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nom: { type: 'string' },
            sigle: { type: 'string' }
          }
        },
        reponse: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            idProf: { type: 'integer' },
            idRequete: { type: 'integer' },
            dateReponse: {
              type: 'string',
              format: 'date-time'
            },
            contenu: { type: 'string' }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
          name: 'authorization'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js'],
};

module.exports = options;
