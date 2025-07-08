'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reponse extends Model {
    static associate({Requete, Prof}) {
      // Une réponse appartient à une requête
      this.belongsTo(Requete, {
        foreignKey: 'idRequete',
        as: 'requete'
      });

      // Une réponse appartient à un professeur
      this.belongsTo(Prof, {
        foreignKey: 'idProf',
        as: 'prof'
      });
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.idRequete;  // Masquer idRequete
      delete values.idProf;     // Masquer idProf
      return values;
    }
  }

  Reponse.init({
    idRequete: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    idProf: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    contenu: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    dateReponse: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'Reponse',
    modelName: 'Reponse',
  });

  return Reponse;
};
