const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérification de la présence du header Authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant ou mal formaté' });
  }

  // Extraction du token après "Bearer "
  const token = authHeader.split(' ')[1];

  // Vérification du token JWT
  jwt.verify(token, process.env.JWT_SECRET || 'AFRFhgdrecHGDFTYFVu', (err, decoded) => {
    if (err) {
      console.error('Erreur de vérification du token :', err);
      return res.status(401).json({ error: 'Token invalide' });
    }

    // Token valide, attacher les infos décodées à la requête
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
