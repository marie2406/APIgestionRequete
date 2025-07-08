const express = require('express');
const profController = require('./../controllers/profCtrl');
const router = express.Router();

// // Routes pour les profs

const authMiddleware = require('../middlewares/authMiddleware');
/**
 * @swagger
 * tags:
 *   name: Professors
 *   description: Gestion des professeurs dans le système
 */

/**
 * @swagger
 * /api/profs:
 *   post:
 *     summary: Créer un professeur
 *     description: Crée un professeur avec un mot de passe haché et retourne les informations du professeur créé.
 *     tags: [Professors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Le nom du professeur
 *               prenom:
 *                 type: string
 *                 description: Le prénom du professeur
 *               email:
 *                 type: string
 *                 description: L'email du professeur
 *               motDePasse:
 *                 type: string
 *                 description: Le mot de passe du professeur (sera haché avant d'être enregistré)
 *     responses:
 *       200:
 *         description: Professeur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 prenom:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Paramètres manquants
 *       500:
 *         description: Erreur interne lors de la création du professeur
 */
router.post('/profs', profController.createProf);
/**
 * @swagger
 * /api/profs:
 *   get:
 *     summary: Récupérer tous les professeurs
 *     description: Retourne la liste de tous les professeurs dans le système.
 *     tags: [Professors]
 *     responses:
 *       200:
 *         description: Liste des professeurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nom:
 *                     type: string
 *                   prenom:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Erreur interne lors de la récupération des professeurs
 */
router.get('/profs', profController.getAllProfs);
/**
 * @swagger
 * /api/profs/{id}:
 *   get:
 *     summary: Récupérer un professeur par son ID
 *     description: Retourne les informations d'un professeur en fonction de son ID unique.
 *     tags: [Professors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique du professeur
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Professeur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 prenom:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Professeur non trouvé
 *       500:
 *         description: Erreur interne lors de la récupération du professeur
 */

router.get('/profs/:id', profController.getProfById);
/**
 * @swagger
 * /api/profs/{id}:
 *   put:
 *     summary: Mettre à jour les informations d'un professeur
 *     description: Met à jour les informations d'un professeur (nom, prénom, email, mot de passe).
 *     tags: [Professors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique du professeur
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               motDePasse:
 *                 type: string
 *     responses:
 *       200:
 *         description: Professeur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 prenom:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Paramètres manquants
 *       404:
 *         description: Professeur non trouvé
 *       500:
 *         description: Erreur interne lors de la mise à jour du professeur
 */
router.put('/profs/:id', authMiddleware, profController.updateProf);
/**
 * @swagger
 * /api/profs/{id}:
 *   delete:
 *     summary: Supprimer un professeur
 *     description: Supprime un professeur du système en fonction de son ID unique.
 *     tags: [Professors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique du professeur
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Professeur supprimé avec succès
 *       404:
 *         description: Professeur non trouvé
 *       500:
 *         description: Erreur interne lors de la suppression du professeur
 */

router.delete('/profs/:id', authMiddleware, profController.deleteProf);

module.exports = router;