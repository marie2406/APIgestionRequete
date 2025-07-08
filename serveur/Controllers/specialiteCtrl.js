const db = require('../models');

const specialiteController = {
  // Création d'une spécialité
  createSpecialite: function (req, res) {
    const { nom, sigle } = req.body;

    // Vérification des paramètres
    if (!nom || !sigle) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    // Création de la spécialité
    db.Specialite.create({
      nom: nom,
      sigle: sigle
    })
      .then((createdSpecialite) => {
        res.status(200).json(createdSpecialite);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Specialite creation' });
      });
  },

  // Récupération de toutes les spécialités
  getAllSpecialites: function (req, res) {
    db.Specialite.findAll()
      .then((specialites) => {
        res.status(200).json(specialites);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred while retrieving specialites' });
      });
  },

  // Récupération d'une spécialité par son ID
  getSpecialiteById: function (req, res) {
    const specialiteId = req.params.id;

    db.Specialite.findByPk(specialiteId)
      .then((specialite) => {
        if (!specialite) {
          return res.status(404).json({ 'error': 'Specialite not found' });
        }

        res.status(200).json(specialite);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Specialite retrieval' });
      });
  },

  // Mise à jour d'une spécialité
  updateSpecialite: function (req, res) {
    const specialiteId = req.params.id;
    const { nom, sigle } = req.body;

    // Vérification des paramètres
    if (!nom || !sigle) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    db.Specialite.findByPk(specialiteId)
      .then((specialite) => {
        if (!specialite) {
          return res.status(404).json({ 'error': 'Specialite not found' });
        }

        // Mise à jour de la spécialité
        specialite.update({ nom, sigle })
          .then((updatedSpecialite) => {
            res.status(200).json(updatedSpecialite);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ 'error': 'An error occurred during Specialite update' });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Specialite retrieval' });
      });
  },

  // Suppression d'une spécialité
  deleteSpecialite: function (req, res) {
    const specialiteId = req.params.id;

    db.Specialite.findByPk(specialiteId)
      .then((specialite) => {
        if (!specialite) {
          return res.status(404).json({ 'error': 'Specialite not found' });
        }

        // Suppression de la spécialité
        specialite.destroy()
          .then(() => {
            res.status(200).json({ message: 'Specialite deleted successfully' });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ 'error': 'An error occurred during Specialite deletion' });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Specialite retrieval' });
      });
  },
};

module.exports = specialiteController;
