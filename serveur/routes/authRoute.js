const express = require('express');
const authCtrl = require('../Controllers/authCtrl');  // Import the auth controller

const router = express.Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authentifie un utilisateur et retourne un token JWT.
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: utilisateur@example.com
 *               password:
 *                 type: string
 *                 example: monMotDePasse123
 *     responses:
 *       200:
 *         description: Connexion réussie, JWT retourné.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR...
 *       400:
 *         description: Données d'identification manquantes ou invalides.
 *       401:
 *         description: Échec de l'authentification.
 */
router.post('/login', authCtrl.login);
router.post('/forgot-password', authCtrl.forgotPassword);
router.post('/reset-password', authCtrl.resetPassword);


module.exports = router;
