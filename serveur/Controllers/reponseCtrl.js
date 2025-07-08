const db = require('../models');

const reponseController = {
  // Création d'une Réponse
  createReponse: function (req, res) {
    const { idRequete, idProf, contenu, dateReponse } = req.body;

    // Vérification des paramètres
    if (!idRequete || !idProf || !contenu || !dateReponse) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    // Création de la Réponse
    db.Reponse.create({
      idRequete: idRequete,
      idProf: idProf,
      contenu: contenu,
      dateReponse: dateReponse
    })
      .then((createdReponse) => {
        res.status(200).json(createdReponse);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Reponse creation' });
      });
  },

  // Récupération de toutes les Réponses
  getAllReponses: function (req, res) {
    db.Reponse.findAll({
      include: [
        {
          model: db.Requete,
          as: 'requetes',  // Includes the associated Requete
        },
        {
          model: db.Prof,
          as: 'profs',  // Includes the associated Prof
        }
      ]
    })
      .then((Reponses) => {
        res.status(200).json(Reponses);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred while retrieving reponses' });
      });
  },

  // Récupération d'une Réponse par son ID
  getReponseById: function (req, res) {
    const reponseId = req.params.id;

    db.Reponse.findByPk(reponseId, {
      include: [
        {
          model: db.Requete,
          as: 'requetes',  // Includes the associated Requete
        },
        {
          model: db.Prof,
          as: 'profs',  // Includes the associated Prof
        }
      ]
    })
      .then((Reponse) => {
        if (!Reponse) {
          return res.status(404).json({ 'error': 'Reponse not found' });
        }

        res.status(200).json(Reponse);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Reponse retrieval' });
      });
  },

  // Mise à jour d'une Réponse
  updateReponse: function (req, res) {
    const reponseId = req.params.id;
    const { contenu, dateReponse } = req.body;

    // Vérification des paramètres
    if (!contenu || !dateReponse) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    db.Reponse.findByPk(reponseId)
      .then((Reponse) => {
        if (!Reponse) {
          return res.status(404).json({ 'error': 'Reponse not found' });
        }

        // Mise à jour de la Réponse
        Reponse.update({ contenu, dateReponse })
          .then((updatedReponse) => {
            res.status(200).json(updatedReponse);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ 'error': 'An error occurred during Reponse update' });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Reponse retrieval' });
      });
  },

  // Suppression d'une Réponse
  deleteReponse: function (req, res) {
    const reponseId = req.params.id;

    db.Reponse.findByPk(reponseId)
      .then((Reponse) => {
        if (!Reponse) {
          return res.status(404).json({ 'error': 'Reponse not found' });
        }

        // Suppression de la Réponse
        Reponse.destroy()
          .then(() => {
            res.status(200).json({ message: 'Reponse deleted successfully' });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ 'error': 'An error occurred during Reponse deletion' });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Reponse retrieval' });
      });
  },
};

module.exports = reponseController;
