const express = require('express');
const requeteController = require('./../controllers/requeteCtrl');
const router = express.Router();

// // Routes pour les requetes

const authMiddleware = require('../middlewares/authMiddleware');
/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Gestion des requêtes dans le système
 */

/**
 * @swagger
 * /api/requetes:
 *   post:
 *     summary: Créer une requête
 *     description: Crée une requête avec les informations de l'étudiant, de la matière, du motif et de l'état.
 *     tags: [Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idEtudiant:
 *                 type: integer
 *                 description: L'ID de l'étudiant qui fait la requête
 *               idMatiere:
 *                 type: integer
 *                 description: L'ID de la matière concernée
 *               motif:
 *                 type: string
 *                 description: Le motif de la requête
 *               etat:
 *                 type: string
 *                 description: L'état de la requête (par exemple, "en attente", "acceptée", etc.)
 *               type:
 *                 type: string
 *                 description: Le type de la requête (par exemple, "urgence", "révision", etc.)
 *               dateRequete:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure de la création de la requête
 *     responses:
 *       200:
 *         description: Requête créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 idEtudiant:
 *                   type: integer
 *                 idMatiere:
 *                   type: integer
 *                 motif:
 *                   type: string
 *                 etat:
 *                   type: string
 *                 type:
 *                   type: string
 *                 dateRequete:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Paramètres manquants
 *       500:
 *         description: Erreur interne lors de la création de la requête
 */
router.post('/requetes', authMiddleware, requeteController.createRequete);
/**
 * @swagger
 * /api/requetes:
 *   get:
 *     summary: Récupérer toutes les requêtes
 *     description: Retourne la liste de toutes les requêtes dans le système.
 *     tags: [Requests]
 *     responses:
 *       200:
 *         description: Liste des requêtes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   idEtudiant:
 *                     type: integer
 *                   idMatiere:
 *                     type: integer
 *                   motif:
 *                     type: string
 *                   etat:
 *                     type: string
 *                   type:
 *                     type: string
 *                   dateRequete:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Erreur interne lors de la récupération des requêtes
 */

router.get('/requetes', requeteController.getAllRequetes);
/**
 * @swagger
 * /api/requetes/{id}:
 *   get:
 *     summary: Récupérer une requête par son ID
 *     description: Retourne une requête spécifique en fonction de son ID unique.
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de la requête
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Requête récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 idEtudiant:
 *                   type: integer
 *                 idMatiere:
 *                   type: integer
 *                 motif:
 *                   type: string
 *                 etat:
 *                   type: string
 *                 type:
 *                   type: string
 *                 dateRequete:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Requête non trouvée
 *       500:
 *         description: Erreur interne lors de la récupération de la requête
 */
router.get('/requetes/:id', requeteController.getRequeteById);
/**
 * @swagger
 * /api/requetes/{id}:
 *   put:
 *     summary: Mettre à jour une requête
 *     description: Met à jour les informations d'une requête en fonction de son ID unique.
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de la requête
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motif:
 *                 type: string
 *               etat:
 *                 type: string
 *               type:
 *                 type: string
 *               dateRequete:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Requête mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 idEtudiant:
 *                   type: integer
 *                 idMatiere:
 *                   type: integer
 *                 motif:
 *                   type: string
 *                 etat:
 *                   type: string
 *                 type:
 *                   type: string
 *                 dateRequete:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Paramètres manquants
 *       404:
 *         description: Requête non trouvée
 *       500:
 *         description: Erreur interne lors de la mise à jour de la requête
 */
router.put('/requetes/:id', authMiddleware, requeteController.updateRequete);
/**
 * @swagger
 * /api/requetes/{id}:
 *   delete:
 *     summary: Supprimer une requête
 *     description: Supprime une requête en fonction de son ID unique.
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de la requête
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Requête supprimée avec succès
 *       404:
 *         description: Requête non trouvée
 *       500:
 *         description: Erreur interne lors de la suppression de la requête
 */

router.delete('/requetes/:id', authMiddleware, requeteController.deleteRequete);

module.exports = router;