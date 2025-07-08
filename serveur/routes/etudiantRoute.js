const express = require('express');
const etudiantController = require('./../controllers/etudiantCtrl');
const router = express.Router();

// // Routes pour les etudiants
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /api/etudiants:
 *   post:
 *     summary: Crée un nouvel étudiant avec un mot de passe haché.
 *     tags:
 *       - Étudiants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idSpecialite
 *               - nom
 *               - prenom
 *               - matricule
 *               - email
 *               - niveau
 *               - motDePasse
 *             properties:
 *               idSpecialite:
 *                 type: integer
 *                 example: 1
 *               nom:
 *                 type: string
 *                 example: "Dupont"
 *               prenom:
 *                 type: string
 *                 example: "Jean"
 *               matricule:
 *                 type: string
 *                 example: "A123456"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jean.dupont@example.com"
 *               niveau:
 *                 type: string
 *                 example: "L2"
 *               motDePasse:
 *                 type: string
 *                 example: "monMotDePasse"
 *     responses:
 *       200:
 *         description: Étudiant créé avec succès.
 *       400:
 *         description: Paramètres manquants ou invalides.
 *       500:
 *         description: Erreur serveur lors de la création de l'étudiant.
 */
router.post('/api/etudiants', etudiantController.createEtudiant);

/**
 * @swagger
 * /api/etudiants:
 *   get:
 *     summary: Récupère tous les étudiants.
 *     tags:
 *       - Étudiants
 *     responses:
 *       200:
 *         description: Liste de tous les étudiants.
 *       500:
 *         description: Erreur serveur lors de la récupération des étudiants.
 */
router.get('/api/etudiants', etudiantController.getAllEtudiants);

/**
 * @swagger
 * /api/etudiants/{id}:
 *   get:
 *     summary: Récupère un étudiant par son ID.
 *     tags:
 *       - Étudiants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'étudiant à récupérer.
 *     responses:
 *       200:
 *         description: L'étudiant a été trouvé.
 *       404:
 *         description: L'étudiant n'a pas été trouvé.
 *       500:
 *         description: Erreur serveur lors de la récupération de l'étudiant.
 */
router.get('/api/etudiants/:id', etudiantController.getEtudiantById);

/**
 * @swagger
 * /api/etudiants/{id}:
 *   put:
 *     summary: Met à jour les informations d'un étudiant.
 *     tags:
 *       - Étudiants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'étudiant à mettre à jour.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idSpecialite
 *               - nom
 *               - prenom
 *               - matricule
 *               - email
 *               - niveau
 *               - motDePasse
 *             properties:
 *               idSpecialite:
 *                 type: integer
 *                 example: 1
 *               nom:
 *                 type: string
 *                 example: "Dupont"
 *               prenom:
 *                 type: string
 *                 example: "Jean"
 *               matricule:
 *                 type: string
 *                 example: "A123456"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jean.dupont@example.com"
 *               niveau:
 *                 type: string
 *                 example: "L2"
 *               motDePasse:
 *                 type: string
 *                 example: "nouveauMotDePasse"
 *     responses:
 *       200:
 *         description: Étudiant mis à jour avec succès.
 *       400:
 *         description: Paramètres manquants ou invalides.
 *       404:
 *         description: Étudiant non trouvé.
 *       500:
 *         description: Erreur serveur lors de la mise à jour de l'étudiant.
 */
router.put('/api/etudiants/:id', authMiddleware, etudiantController.updateEtudiant);

/**
 * @swagger
 * /api/etudiants/{id}:
 *   delete:
 *     summary: Supprime un étudiant par son ID.
 *     tags:
 *       - Étudiants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'étudiant à supprimer.
 *     responses:
 *       200:
 *         description: Étudiant supprimé avec succès.
 *       404:
 *         description: Étudiant non trouvé.
 *       500:
 *         description: Erreur serveur lors de la suppression de l'étudiant.
 */
router.delete('/api/etudiants/:id', authMiddleware, etudiantController.deleteEtudiant);



module.exports = router;