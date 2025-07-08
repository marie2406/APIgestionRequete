const express = require('express');
const specialiteController = require('./../controllers/specialiteCtrl');
const router = express.Router();

// // Routes pour les specialites

const authMiddleware = require('../middlewares/authMiddleware');
/**
 * @swagger
 * tags:
 *   name: Specialties
 *   description: Gestion des spécialités dans le système
 */

/**
 * @swagger
 * /api/specialites:
 *   post:
 *     summary: Créer une spécialité
 *     description: Crée une nouvelle spécialité avec un nom et un sigle.
 *     tags: [Specialties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Le nom de la spécialité
 *               sigle:
 *                 type: string
 *                 description: Le sigle de la spécialité
 *     responses:
 *       200:
 *         description: Spécialité créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 sigle:
 *                   type: string
 *       400:
 *         description: Paramètres manquants
 *       500:
 *         description: Erreur interne lors de la création de la spécialité
 */
router.post('/specialites', authMiddleware, specialiteController.createSpecialite);
/**
 * @swagger
 * /api/specialites:
 *   get:
 *     summary: Récupérer toutes les spécialités
 *     description: Retourne la liste de toutes les spécialités existantes dans le système.
 *     tags: [Specialties]
 *     responses:
 *       200:
 *         description: Liste des spécialités récupérée avec succès
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
 *                   sigle:
 *                     type: string
 *       500:
 *         description: Erreur interne lors de la récupération des spécialités
 */
router.get('/specialites', specialiteController.getAllSpecialites);
/**
 * @swagger
 * /api/specialites/{id}:
 *   get:
 *     summary: Récupérer une spécialité par son ID
 *     description: Retourne une spécialité spécifique en fonction de son ID unique.
 *     tags: [Specialties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de la spécialité
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Spécialité récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 sigle:
 *                   type: string
 *       404:
 *         description: Spécialité non trouvée
 *       500:
 *         description: Erreur interne lors de la récupération de la spécialité
 */
router.get('/specialites/:id', specialiteController.getSpecialiteById);
/**
 * @swagger
 * /api/specialites/{id}:
 *   put:
 *     summary: Mettre à jour une spécialité
 *     description: Met à jour le nom et le sigle d'une spécialité en fonction de son ID unique.
 *     tags: [Specialties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de la spécialité
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
 *               sigle:
 *                 type: string
 *     responses:
 *       200:
 *         description: Spécialité mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nom:
 *                   type: string
 *                 sigle:
 *                   type: string
 *       400:
 *         description: Paramètres manquants
 *       404:
 *         description: Spécialité non trouvée
 *       500:
 *         description: Erreur interne lors de la mise à jour de la spécialité
 */
router.put('/specialites/:id', authMiddleware, specialiteController.updateSpecialite);
/**
 * @swagger
 * /api/specialites/{id}:
 *   delete:
 *     summary: Supprimer une spécialité
 *     description: Supprime une spécialité en fonction de son ID unique.
 *     tags: [Specialties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de la spécialité
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Spécialité supprimée avec succès
 *       404:
 *         description: Spécialité non trouvée
 *       500:
 *         description: Erreur interne lors de la suppression de la spécialité
 */

router.delete('/specialites/:id', authMiddleware, specialiteController.deleteSpecialite);

module.exports = router;