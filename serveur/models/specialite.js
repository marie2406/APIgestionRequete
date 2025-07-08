'use strict';
const { Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class Specialite extends Model {
    static associate({Etudiant}) {
      // Une spécialité a plusieurs étudiants
      this.hasMany(Etudiant, { foreignKey: 'idSpecialite', as: 'etudiants' });
    }

    toJSON() {
      const values = { ...this.get() };
      // Si tu veux cacher des informations sensibles ici
      delete values.id; // Par exemple, cacher l'ID de la spécialité
      return values;
    }
  };

  Specialite.init({
    nom: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sigle: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'Specialite',
    modelName: 'Specialite',
  });

  return Specialite;
};
