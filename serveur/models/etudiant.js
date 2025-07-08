'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Etudiant extends Model {
    /**
     * Définition des associations
     */
    static associate({ Requete, Specialite, Message }) {
      // Etudiant appartient à une spécialité
      this.belongsTo(Specialite, {
        foreignKey: 'idSpecialite',
        as: 'specialite'
      });

      // Etudiant peut recevoir plusieurs messages
      this.hasMany(Message, {
        foreignKey: 'idRecipient',
        constraints: false,
        scope: {
          recipientType: 'Etudiant'
        },
        as: 'messages'
      });

      // Etudiant peut avoir plusieurs requêtes
      this.hasMany(Requete, {
        foreignKey: 'idEtudiant',
        as: 'requetes'
      });
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.motDePasse; // Par sécurité
      return values;
    }
  }

  Etudiant.init({
    idSpecialite: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    nom: {
      allowNull: false,
      type: DataTypes.STRING
    },
    prenom: {
      allowNull: false,
      type: DataTypes.STRING
    },
    matricule: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    niveau: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    motDePasse: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    tableName: 'Etudiant',
    modelName: 'Etudiant',
  });

  return Etudiant;
};
