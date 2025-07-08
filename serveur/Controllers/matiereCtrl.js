const db = require('../models');

const matiereController = {
  // Création d'une Matière
  createMatiere: function (req, res) {
    const { nom, idProf } = req.body;
    
    // Vérification des paramètres
    if (!nom || !idProf) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    // Création de la Matière
    db.Matiere.create({
      nom: nom,
      idProf: idProf // corrected the field from sigle to idProf
    })
      .then((createdMatiere) => {
        res.status(200).json(createdMatiere);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Matière creation' });
      });
  },

  // Récupération de toutes les Matières
  getAllMatieres: function (req, res) {
    db.Matiere.findAll()
      .then((Matieres) => {
        res.status(200).json(Matieres);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred while retrieving Matieres' });
      });
  },

  // Récupération d'une Matière par son ID
  getMatiereById: function (req, res) {
    const MatiereId = req.params.id;

    db.Matiere.findByPk(MatiereId)
      .then((Matiere) => {
        if (!Matiere) {
          return res.status(404).json({ 'error': 'Matière not found' });
        }

        res.status(200).json(Matiere);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Matière retrieval' });
      });
  },

  // Mise à jour d'une Matière
  updateMatiere: function (req, res) {
    const MatiereId = req.params.id;
    const { nom, idProf } = req.body;

    // Vérification des paramètres
    if (!nom || !idProf) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    db.Matiere.findByPk(MatiereId)
      .then((Matiere) => {
        if (!Matiere) {
          return res.status(404).json({ 'error': 'Matière not found' });
        }

        // Mise à jour de la Matière
        Matiere.update({ nom: nom, idProf: idProf })
          .then((updatedMatiere) => {
            res.status(200).json(updatedMatiere);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ 'error': 'An error occurred during Matière update' });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ 'error': 'An error occurred during Matière retrieval' });
      });
  },

  // Suppression d'une Matière (Marquage comme supprimé)
  deleteMatiere: function (req, res) {
    let MatiereId = req.params.id;

    db.Matiere.findOne({ where: { id: MatiereId } })
      .then(async (Matiere) => {
        if (Matiere) {
          // Marquer la Matière comme supprimée
          db.Matiere.update({
            delete: true,
            updatedAt: new Date()
          }, {
            where: { id: MatiereId }
          }).then(() => {
            res.status(200).json({ message: 'Matière supprimée avec succès' });
          }).catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la suppression de la Matière' });
          });

        } else {
          res.status(404).json({ error: 'Matière non trouvée' });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
      });
  },
};

module.exports = matiereController;
