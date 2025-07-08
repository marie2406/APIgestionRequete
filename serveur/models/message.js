'use strict';
const { Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ Requete, Prof, Etudiant }) {
      this.belongsTo(Requete, { foreignKey: 'idRequete', as: 'requete' });

      // Association conditionnelle en fonction du type de destinataire
      this.belongsTo(Prof, {
        foreignKey: 'idRecipient',
        as: 'profRecipient',
        constraints: false, // Ne pas imposer une contrainte de clé étrangère
        scope: {
          recipientType: 'Prof'
        }
      });

      this.belongsTo(Etudiant, {
        foreignKey: 'idRecipient',
        as: 'etudiantRecipient',
        constraints: false, // Ne pas imposer une contrainte de clé étrangère
        scope: {
          recipientType: 'Etudiant'
        }
      });
    }

    toJSON() {
      return { ...this.get() };
    }
  }

  Message.init({
    idRequete: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    idRecipient: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    recipientType: {
      allowNull: false,
      type: DataTypes.ENUM('Prof', 'Etudiant')
    },
    dateCreation: {
      allowNull: false,
      type: DataTypes.DATE
    },
    contenu: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    tableName: 'Message',
    modelName: 'Message',
  });

  return Message;
};
