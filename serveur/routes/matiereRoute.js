const express = require('express');
const matiereController = require('./../controllers/matiereCtrl');
const router = express.Router();

// // Routes pour les matieres

const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Matières
 *   description: Gestion des matières dans le système
 */

/**
 * @swagger
 * /api/matieres:
 *   post:
 *     summary: Créer une nouvelle Matière
 *     description: Crée une nouvelle Matière dans le système avec le nom et l'idProf spécifiés.
 *     tags: [Matières]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Le nom de la matière
 *               idProf:
 *                 type: integer
 *                 description: L'identifiant du professeur lié à la matière
 *     responses:
 *       200:
 *         description: Matière créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 idProf:
 *                   type: integer
 *       400:
 *         description: Paramètres manquants ou incorrects
 *       500:
 *         description: Erreur interne lors de la création de la matière
 */
router.post('/matieres', authMiddleware, matiereController.createMatiere);
/**
 * @swagger
 * /api/matieres:
 *   get:
 *     summary: Récupérer toutes les Matières
 *     description: Retourne une liste de toutes les Matières disponibles dans le système.
 *     tags: [Matières]
 *     responses:
 *       200:
 *         description: Liste des matières récupérée avec succès
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
 *                   idProf:
 *                     type: integer
 *       500:
 *         description: Erreur interne lors de la récupération des matières
 */

router.get('/matieres', matiereController.getAllMatieres);
/**
 * @swagger
 * /api/matieres/{id}:
 *   get:
 *     summary: Récupérer une Matière par son ID
 *     description: Retourne les détails d'une Matière spécifiée par son identifiant.
 *     tags: [Matières]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de la matière à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Matière récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 idProf:
 *                   type: integer
 *       404:
 *         description: Matière non trouvée
 *       500:
 *         description: Erreur interne lors de la récupération de la matière
 */
router.get('/matieres/:id', matiereController.getMatiereById);
/**
 * @swagger
 * /api/matieres/{id}:
 *   put:
 *     summary: Mettre à jour une Matière
 *     description: Met à jour les informations d'une Matière existante avec les nouvelles valeurs.
 *     tags: [Matières]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de la matière à mettre à jour
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
 *               idProf:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Matière mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 idProf:
 *                   type: integer
 *       400:
 *         description: Paramètres manquants ou incorrects
 *       404:
 *         description: Matière non trouvée
 *       500:
 *         description: Erreur interne lors de la mise à jour de la matière
 */

router.put('/matieres/:id', authMiddleware, matiereController.updateMatiere);

/**
 * @swagger
 * /api/matieres/{id}:
 *   delete:
 *     summary: Supprimer une Matière
 *     description: Supprime une Matière en la marquant comme supprimée dans le système.
 *     tags: [Matières]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de la matière à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Matière supprimée avec succès
 *       404:
 *         description: Matière non trouvée
 *       500:
 *         description: Erreur interne lors de la suppression de la matière
 */

router.delete('/matieres/:id', authMiddleware, matiereController.deleteMatiere);

module.exports = router;