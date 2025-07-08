'use strict';
const { Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Requete extends Model {
    static associate({Message, Etudiant, Matiere, Reponse}) {
      // Association avec Message (Une requête peut avoir plusieurs messages)
      this.hasMany(Message, {
        foreignKey: 'idRequete',
        as: 'messages',
      });

      // Association avec Etudiant (Une requête appartient à un étudiant)
      this.belongsTo(Etudiant, {
        foreignKey: 'idEtudiant',
        as: 'etudiant',
      });

      // Association avec Matiere (Une requête appartient à une matière)
      this.belongsTo(Matiere, {
        foreignKey: 'idMatiere',
        as: 'matiere',
      });

      // Association avec Reponse (Une requête peut avoir plusieurs réponses)
      this.hasMany(Reponse, {
        foreignKey: 'idRequete',
        as: 'reponses',
      });
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.idEtudiant;  // Masquer l'id de l'étudiant
      delete values.idMatiere;   // Masquer l'id de la matière
      delete values.idRequete;   // Masquer l'id de la requête
      return values;
    }
  };

  Requete.init({
    idEtudiant: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    idMatiere: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    motif: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    etat: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    dateRequete: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    tableName: 'Requete',
    modelName: 'Requete',
  });

  return Requete;
};
