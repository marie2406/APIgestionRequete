const db = require('../models');

const requeteController = {
  // Création d'une Requête
  createRequete: function (req, res) {
    const { idEtudiant, idMatiere, motif, etat, type, dateRequete } = req.body;

    // Vérification des paramètres
    if (!idEtudiant || !idMatiere || !motif || !etat || !type || !dateRequete) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    // Création de la Requête
    db.Requete.create({
      idEtudiant: idEtudiant,
      idMatiere: idMatiere,
      motif: motif,
      etat: etat,
      type: type,
      dateRequete: dateRequete
    })
      .then((createdRequete) => {
        res.status(200).json(createdRequete);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Requete creation' });
      });
  },

  // Récupération de toutes les Requêtes
  getAllRequetes: function (req, res) {
    db.Requete.findAll()
      .then((Requetes) => {
        res.status(200).json(Requetes);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred while retrieving requetes' });
      });
  },

  // Récupération d'une Requête par son ID
  getRequeteById: function (req, res) {
    const requeteId = req.params.id;

    db.Requete.findByPk(requeteId)
      .then((Requete) => {
        if (!Requete) {
          return res.status(404).json({ 'error': 'Requete not found' });
        }

        res.status(200).json(Requete);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Requete retrieval' });
      });
  },

  // Mise à jour d'une Requête
  updateRequete: function (req, res) {
    const requeteId = req.params.id;
    const { motif, etat, type, dateRequete } = req.body;

    // Vérification des paramètres
    if (!motif || !etat || !type || !dateRequete) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    db.Requete.findByPk(requeteId)
      .then((Requete) => {
        if (!Requete) {
          return res.status(404).json({ 'error': 'Requete not found' });
        }

        // Mise à jour de la Requête
        Requete.update({ motif, etat, type, dateRequete })
          .then((updatedRequete) => {
            res.status(200).json(updatedRequete);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ 'error': 'An error occurred during Requete update' });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Requete retrieval' });
      });
  },

  // Suppression d'une Requête
  deleteRequete: function (req, res) {
    const requeteId = req.params.id;

    db.Requete.findByPk(requeteId)
      .then((Requete) => {
        if (!Requete) {
          return res.status(404).json({ 'error': 'Requete not found' });
        }

        // Suppression de la Requête
        Requete.destroy()
          .then(() => {
            res.status(200).json({ message: 'Requete deleted successfully' });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ 'error': 'An error occurred during Requete deletion' });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Requete retrieval' });
      });
  },
};

module.exports = requeteController;
