'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Prof extends Model {
    static associate({Matiere, Message, Reponse}) {
      // Un prof enseigne plusieurs matières
      this.hasMany(Matiere, {
        foreignKey: 'idProf',
        as: 'matieres'
      });

      // Un prof peut recevoir plusieurs messages
      this.hasMany(Message, {
        foreignKey: 'idRecipient',
        as: 'messages'
      });

      // Un prof peut avoir plusieurs réponses
      this.hasMany(Reponse, {
        foreignKey: 'idProf',
        as: 'reponses'
      });
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.motDePasse; // Sécurité
      return values;
    }
  }

  Prof.init({
    nom: {
      allowNull: false,
      type: DataTypes.STRING
    },
    prenom: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    motDePasse: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    matricule: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'Prof',
    modelName: 'Prof',
  });

  return Prof;
};
