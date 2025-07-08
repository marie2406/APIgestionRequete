'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Matiere extends Model {
    /**
     * Définition des associations
     */
    static associate({Prof, Requete}) {
      // Matière appartient à un professeur
      this.belongsTo(Prof, {
        foreignKey: 'idProf',
        as: 'prof'
      });

      // Matière a plusieurs requêtes
      this.hasMany(Requete, {
        foreignKey: 'idMatiere',
        as: 'requetes'
      });
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.idProf; // Optionnel si tu veux masquer ce champ
      return values;
    }
  }

  Matiere.init({
    idProf: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    nom: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: 'Matiere',
    modelName: 'Matiere',
  });

  return Matiere;
};
