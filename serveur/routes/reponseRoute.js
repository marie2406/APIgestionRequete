const express = require('express');
const reponseController = require('./../controllers/reponseCtrl');
const router = express.Router();

// // Routes pour les reponses

const authMiddleware = require('../middlewares/authMiddleware');
/**
 * @swagger
 * tags:
 *   name: Responses
 *   description: Gestion des réponses dans le système
 */

/**
 * @swagger
 * /api/reponses:
 *   post:
 *     summary: Créer une réponse
 *     description: Crée une réponse pour une requête spécifique, avec les informations du professeur et le contenu de la réponse.
 *     tags: [Responses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idRequete:
 *                 type: integer
 *                 description: L'ID de la requête à laquelle la réponse est liée
 *               idProf:
 *                 type: integer
 *                 description: L'ID du professeur qui fournit la réponse
 *               contenu:
 *                 type: string
 *                 description: Le contenu de la réponse
 *               dateReponse:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure de la réponse
 *     responses:
 *       200:
 *         description: Réponse créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 idRequete:
 *                   type: integer
 *                 idProf:
 *                   type: integer
 *                 contenu:
 *                   type: string
 *                 dateReponse:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Paramètres manquants
 *       500:
 *         description: Erreur interne lors de la création de la réponse
 */

router.post('/reponses', authMiddleware, reponseController.createReponse);
/**
 * @swagger
 * /api/reponses:
 *   get:
 *     summary: Récupérer toutes les réponses
 *     description: Retourne la liste de toutes les réponses dans le système, avec les informations sur la requête et le professeur associés.
 *     tags: [Responses]
 *     responses:
 *       200:
 *         description: Liste des réponses récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   idRequete:
 *                     type: integer
 *                   idProf:
 *                     type: integer
 *                   contenu:
 *                     type: string
 *                   dateReponse:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erreur interne lors de la récupération des réponses
 */
router.get('/reponses', reponseController.getAllReponses);

/**
 * @swagger
 * /api/reponses/{id}:
 *   get:
 *     summary: Récupérer une réponse par son ID
 *     description: Retourne une réponse spécifique en fonction de son ID unique, avec les informations sur la requête et le professeur associés.
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de la réponse
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Réponse récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 idRequete:
 *                   type: integer
 *                 idProf:
 *                   type: integer
 *                 contenu:
 *                   type: string
 *                 dateReponse:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Réponse non trouvée
 *       500:
 *         description: Erreur interne lors de la récupération de la réponse
 */
router.get('/reponses/:id', reponseController.getReponseById);
/**
 * @swagger
 * /api/reponses/{id}:
 *   put:
 *     summary: Mettre à jour une réponse
 *     description: Met à jour les informations d'une réponse (contenu, date) en fonction de son ID unique.
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de la réponse
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenu:
 *                 type: string
 *               dateReponse:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Réponse mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 idRequete:
 *                   type: integer
 *                 idProf:
 *                   type: integer
 *                 contenu:
 *                   type: string
 *                 dateReponse:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Paramètres manquants
 *       404:
 *         description: Réponse non trouvée
 *       500:
 *         description: Erreur interne lors de la mise à jour de la réponse
 */
router.put('/reponses/:id', authMiddleware, reponseController.updateReponse);
/**
 * @swagger
 * /api/reponses/{id}:
 *   delete:
 *     summary: Supprimer une réponse
 *     description: Supprime une réponse du système en fonction de son ID unique.
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de la réponse
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Réponse supprimée avec succès
 *       404:
 *         description: Réponse non trouvée
 *       500:
 *         description: Erreur interne lors de la suppression de la réponse
 */

router.delete('/reponses/:id', authMiddleware, reponseController.deleteReponse);

module.exports = router;