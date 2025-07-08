const express = require('express');
const messageController = require('./../controllers/messageCtrl');
const router = express.Router();

// // Routes pour les messages
const authMiddleware = require('../middlewares/authMiddleware');
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Gestion des messages dans le système
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Créer un message
 *     description: Crée un nouveau message, envoie un email au destinataire avec les informations de la requête.
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idRecipient:
 *                 type: integer
 *                 description: L'identifiant du destinataire du message
 *               idRequete:
 *                 type: integer
 *                 description: L'identifiant de la requête associée au message
 *               recipientType:
 *                 type: string
 *                 description: Le type de destinataire ('Prof' ou 'Etudiant')
 *               dateCreation:
 *                 type: string
 *                 format: date-time
 *                 description: La date de création du message
 *               contenu:
 *                 type: string
 *                 description: Le contenu du message
 *     responses:
 *       201:
 *         description: Message créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 idRecipient:
 *                   type: integer
 *                 idRequete:
 *                   type: integer
 *                 recipientType:
 *                   type: string
 *                 dateCreation:
 *                   type: string
 *                   format: date-time
 *                 contenu:
 *                   type: string
 *       400:
 *         description: Paramètres manquants ou invalides
 *       500:
 *         description: Erreur interne lors de la création du message
 */
router.post('/messages', authMiddleware, messageController.createMessage);
/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Récupérer tous les messages
 *     description: Retourne la liste de tous les messages dans le système.
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Liste des messages récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   idRecipient:
 *                     type: integer
 *                   idRequete:
 *                     type: integer
 *                   recipientType:
 *                     type: string
 *                   dateCreation:
 *                     type: string
 *                     format: date-time
 *                   contenu:
 *                     type: string
 *       500:
 *         description: Erreur interne lors de la récupération des messages
 */


router.get('/messages', messageController.getAllMessages);
/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Récupérer les messages d'un utilisateur spécifique
 *     description: Retourne les messages associés à un utilisateur spécifique (étudiant ou professeur) en fonction de son identifiant.
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique de l'utilisateur pour récupérer ses messages
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des messages de l'utilisateur récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   idRecipient:
 *                     type: integer
 *                   idRequete:
 *                     type: integer
 *                   recipientType:
 *                     type: string
 *                   dateCreation:
 *                     type: string
 *                     format: date-time
 *                   contenu:
 *                     type: string
 *       404:
 *         description: Utilisateur non trouvé ou aucun message associé
 *       500:
 *         description: Erreur interne lors de la récupération des messages de l'utilisateur
 */

router.get('/messages/:id', authMiddleware, messageController.getUserMessages);

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Supprimer un message
 *     description: Supprime un message spécifique en fonction de son identifiant.
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identifiant unique du message à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Message supprimé avec succès
 *       404:
 *         description: Message non trouvé
 *       500:
 *         description: Erreur interne lors de la suppression du message
 */
router.delete('/messages/:id', authMiddleware, messageController.deleteMessage);

module.exports = router;