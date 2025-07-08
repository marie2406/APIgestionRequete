const db = require('../models');
const bcrypt = require('bcrypt');

const profController = {
  // Création d'un Professeur
  createProf: function (req, res) {
    const { nom, prenom, email, motDePasse, matricule } = req.body;

    // Vérification des paramètres
    if (!nom || !prenom || !email || !motDePasse || !matricule) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    // Hashing du mot de passe
    bcrypt.hash(motDePasse, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ 'error': 'Error hashing password' });
      }

      // Création du Professeur avec le mot de passe haché
      db.Prof.create({
        nom: nom,
        prenom: prenom,
        email: email,
        motDePasse: hashedPassword,
        matricule: matricule
      })
        .then((createdProf) => {
          res.status(200).json(createdProf);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ 'error': 'An error occurred during Prof creation' });
        });
    });
  },
  // Récupération de tous les Professeurs
  getAllProfs: function (req, res) {
    db.Prof.findAll()
      .then((Profs) => {
        res.status(200).json(Profs);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred while retrieving professeurs' });
      });
  },

  // Récupération d'un Professeur par son ID
  getProfById: function (req, res) {
    const profId = req.params.id;

    db.Prof.findByPk(profId)
      .then((Prof) => {
        if (!Prof) {
          return res.status(404).json({ 'error': 'Professeur not found' });
        }

        res.status(200).json(Prof);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Prof retrieval' });
      });
  },

  // Mise à jour d'un Professeur
  updateProf: function (req, res) {
    const profId = req.params.id;
    const { nom, prenom, email, motDePasse, matricule } = req.body;

    // Vérification des paramètres
    if (!nom || !prenom || !email || !motDePasse || !matricule) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    db.Prof.findByPk(profId)
      .then((Prof) => {
        if (!Prof) {
          return res.status(404).json({ 'error': 'Professeur not found' });
        }

        // Mise à jour du Professeur
        Prof.update({ nom: nom, prenom: prenom, email: email, motDePasse: motDePasse, matricule: matricule })
          .then((updatedProf) => {
            res.status(200).json(updatedProf);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ 'error': 'An error occurred during Prof update' });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Prof retrieval' });
      });
  },

  // Suppression d'un Professeur
  deleteProf: function (req, res) {
    const profId = req.params.id;

    db.Prof.findByPk(profId)
      .then((Prof) => {
        if (!Prof) {
          return res.status(404).json({ 'error': 'Professeur not found' });
        }

        // Suppression du Professeur
        Prof.destroy()
          .then(() => {
            res.status(200).json({ message: 'Professeur deleted successfully' });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ 'error': 'An error occurred during Prof deletion' });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Prof retrieval' });
      });
  },
};

module.exports = profController;
