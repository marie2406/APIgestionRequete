const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');  // Import the models
const crypto = require('crypto');
const transporter = require('../mails');  // Importation du transporteur Nodemailer


const authCtrl = {
  // Login for Etudiant or Prof
  login: async (req, res) => {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
      return res.status(400).json({ error: 'Email ou Mot de passe manquant' });
    }

    try {
      // Check if it's an Etudiant
      let user = await db.Etudiant.findOne({ where: { email } });
      if (!user) {
        // If no Etudiant, check Prof
        user = await db.Prof.findOne({ where: { email } });
      }

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      // Compare provided password with stored hash
      const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Mot de passe invalide' });
      }

      // Create JWT token
      const payload = { id: user.id, email: user.email, role: user instanceof db.Etudiant ? 'Etudiant' : 'Prof' };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send response with token
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  },


forgotPassword: async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email est nécessaire' });

  try {
    let user = await db.Etudiant.findOne({ where: { email } }) ||
               await db.Prof.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: 'Ulisateur non trouvé' });

    const payload = { id: user.id, email: user.email };
    const resetToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });

    const resetLink = `http://localhost:8080/api/reset-password?token=${resetToken}`;

    // Send email
    await transporter.sendMail({
      from: '"Support Gestion des requetes" <marie-stage@siga-fsjp.gdt-core.com>',
      to: user.email,
      subject: 'Réinitialisation du mot de passse',
      html: `<p>Vous avez démandé une réinitialisation de votre mot de passe.</p>
             <p>Click <a href="${resetLink}">here</a> Pour réinitialiser votre mot de passe. Celà expire dans 15min.</p>`
    });

    res.status(200).json({ message: resetLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
},

resetPassword: async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'nouveau mot de passe ou token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email } = decoded;

    let user = await db.Etudiant.findOne({ where: { id, email } }) ||
               await db.Prof.findOne({ where: { id, email } });

    if (!user) return res.status(404).json({ error: 'Ulisateur non trouvé' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.motDePasse = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Le mot de passe a été réinitialisé avec succès.' });
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ error: 'Votre token a expiré' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

};
module.exports = authCtrl;
