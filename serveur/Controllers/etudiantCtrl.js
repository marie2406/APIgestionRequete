const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;  // Nombre de tours pour le hachage (plus il est élevé, plus c'est sécurisé mais plus long)

const etudiantController = {
  // Création d'un étudiant
  createEtudiant: function (req, res) {
    const { idSpecialite, nom, prenom, matricule, email, niveau, motDePasse } = req.body;

    // Vérification des paramètres
    if (!idSpecialite || !nom || !prenom || !matricule || !email || !niveau || !motDePasse) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    // Hachage du mot de passe
    bcrypt.hash(motDePasse, saltRounds)
      .then((hashedPassword) => {
        // Création de l'étudiant avec le mot de passe haché
        db.Etudiant.create({
          idSpecialite: idSpecialite,
          nom: nom,
          prenom: prenom,
          matricule: matricule,
          email: email,
          niveau: niveau,
          motDePasse: hashedPassword
        })
          .then((createdEtudiant) => {
            res.status(200).json(createdEtudiant);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ 'error': 'An error occurred during student creation' });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during password hashing' });
      });
  },

  // Récupération de tous les étudiants
  getAllEtudiants: function (req, res) {
    db.Etudiant.findAll()
      .then((etudiants) => {
        res.status(200).json(etudiants);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred while retrieving students' });
      });
  },

  // Récupération d'un étudiant par son ID
  getEtudiantById: function (req, res) {
    const etudiantId = req.params.id;

    db.Etudiant.findByPk(etudiantId)
      .then((etudiant) => {
        if (!etudiant) {
          return res.status(404).json({ 'error': 'Student not found' });
        }

        res.status(200).json(etudiant);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during student retrieval' });
      });
  },

  // Mise à jour d'un étudiant
  updateEtudiant: function (req, res) {
    const etudiantId = req.params.id;
    const { idSpecialite, nom, prenom, matricule, email, niveau, motDePasse } = req.body;

    // Vérification des paramètres
    if (!idSpecialite || !nom || !prenom || !matricule || !email || !niveau || !motDePasse) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    db.Etudiant.findByPk(etudiantId)
      .then((etudiant) => {
        if (!etudiant) {
          return res.status(404).json({ 'error': 'Student not found' });
        }

        // Hachage du nouveau mot de passe avant de le mettre à jour
        bcrypt.hash(motDePasse, saltRounds)
          .then((hashedPassword) => {
            // Mise à jour de l'étudiant avec le mot de passe haché
            etudiant.update({
              idSpecialite,
              nom,
              prenom,
              matricule,
              email,
              niveau,
              motDePasse: hashedPassword
            })
              .then((updatedEtudiant) => {
                res.status(200).json(updatedEtudiant);
              })
              .catch((err) => {
                console.error(err);
                res.status(500).json({ 'error': 'An error occurred during student update' });
              });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ 'error': 'An error occurred during password hashing' });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during student retrieval' });
      });
  },

  // Suppression d'un étudiant
  deleteEtudiant: function (req, res) {
    const etudiantId = req.params.id;

    db.Etudiant.findByPk(etudiantId)
      .then((etudiant) => {
        if (!etudiant) {
          return res.status(404).json({ 'error': 'Student not found' });
        }

        // Suppression de l'étudiant
        etudiant.destroy()
          .then(() => {
            res.status(200).json({ message: 'Student deleted successfully' });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred during student deletion' });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching the student' });
      });
  }
};

module.exports = etudiantController;
