const db = require('../models');
const transporter = require('../mails');  // Importation du transporteur Nodemailer
const moment = require('moment');


const messageController = {
   // Création d'un message
   createMessage: async function (req, res) {
    const { idRecipient, idRequete, recipientType, dateCreation, contenu } = req.body;

    // Vérification des paramètres
    if (!idRecipient || !idRequete || !recipientType || !dateCreation || !contenu) {
      return res.status(400).json({ error: 'missing parameters' });
    }

    // Vérification que le recipientType est valide
    if (!['Prof', 'Etudiant'].includes(recipientType)) {
      return res.status(400).json({ error: 'Invalid recipient type' });
    }

    try {
      // Création du message
      const createdMessage = await db.Message.create({
        idRecipient: idRecipient,
        idRequete: idRequete,
        recipientType: recipientType,
        dateCreation: dateCreation,
        contenu: contenu
      });

     // 🔍 Charger les données associées à la requête pour enrichir le contenu de l'email

      // Récupère la requête liée à ce message via son ID
      const requete = await db.Requete.findByPk(idRequete);

      // Si la requête n'existe pas, on arrête ici avec une erreur 404
      if (!requete) return res.status(404).json({ error: 'Requete not found' });

      // Récupère la matière associée à la requête
      const matiere = await db.Matiere.findByPk(requete.idMatiere);

      // Récupère l'étudiant qui a créé la requête
      const etudiant = await db.Etudiant.findByPk(requete.idEtudiant);

      // 🧠 Convertit le code numérique de l'état en une version lisible pour affichage
      const etatLabel = {
        0: 'En attente',
        1: 'En cours',
        2: 'Traité',
        3: 'Rejeté'
      }[requete.etat] || 'Inconnu'; // Si l'état n'est pas reconnu, on affiche 'Inconnu'

      // 🕒 Formatte la date de la requête dans un format clair (jour/mois/année à heure:minute)
      const dateFormatted = moment(requete.dateRequete).format('DD/MM/YYYY à HH:mm');

      // 📧 Récupère l'email du destinataire en fonction de son type (Prof ou Étudiant)
      let recipientEmail = '';

      if (recipientType === 'Prof') {
        // Si le destinataire est un Prof, on va chercher son email dans la table Prof
        const prof = await db.Prof.findByPk(idRecipient);
        recipientEmail = prof.email;
      } else if (recipientType === 'Etudiant') {
        // Si le destinataire est un Étudiant, on va chercher son email dans la table Etudiant
        const etudiant = await db.Etudiant.findByPk(idRecipient);
        recipientEmail = etudiant.email;
      }

     // 📧 Email enrichi
      const mailOptions = {
        from: '"Gestion Requete" <marie-stage@siga-fsjp.gdt-core.com>',
        to: recipientEmail,
        subject: 'Vous avez reçu un nouveau message lié à une requête',
        html: `
          <p>Bonjour Grand Prof,</p>

          <p>Vous avez reçu un nouveau message concernant une requête.</p>

          <h4>Détails de la requête :</h4>
          <ul>
            <li><strong>Motif :</strong> ${requete.motif}</li>
            <li><strong>Type :</strong> ${requete.type}</li>
            <li><strong>État :</strong> ${etatLabel}</li>
            <li><strong>Date :</strong> ${dateFormatted}</li>
            <li><strong>Matière :</strong> ${matiere?.nom || 'N/A'}</li>
          </ul>

          <h4>Message :</h4>
          <blockquote style="border-left: 4px solid #ccc; margin: 10px 0; padding-left: 10px;">
            ${contenu}
          </blockquote>

          <p>Merci de consulter votre espace personnel pour voir la suite de cette requête.</p>

          <p style="color: gray; font-size: 0.9em;">Ce message est généré automatiquement, merci de ne pas y répondre.</p>
        `
      };

      // Envoi de l'email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
        } else {
          console.log('Email envoyé : ' + info.response);
        }
      });

      return res.status(201).json(createdMessage);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred during message creation' });
    }
  },

  // Récupération de tous les messages
  getAllMessages: async function (req, res) {
    try {
      const messages = await db.Message.findAll();
      return res.status(200).json(messages);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while retrieving messages' });
    }
  },

  // Récupération des messages d'un utilisateur (étudiant ou professeur)
  getUserMessages: async function (req, res) {
    const userId = req.params.id;

    try {
      const messages = await db.Message.findAll({
        where: {
          $or: [
            { idRecipient: userId, recipientType: 'Prof' },
            { idRecipient: userId, recipientType: 'Etudiant' }
          ]
        }
      });

      return res.status(200).json(messages);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while retrieving user messages' });
    }
  },

  // Suppression d'un message
  deleteMessage: async function (req, res) {
    const messageId = req.params.id;

    try {
      const message = await db.Message.findByPk(messageId);

      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      // Suppression du message
      await message.destroy();
      return res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred during message deletion' });
    }
  }
};

module.exports = messageController;
