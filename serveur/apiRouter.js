// Imports
var express = require('express');
//const { verifyUserToken } = require('../middlewares/verifyUserToken');
// var userCtrl    = require('./routes/userCtrl');
// var categorieCtrl    = require('./routes/categorieCtrl');
// var messageCtrl    = require('./routes/messageCtrl');
// var objetCtrl    = require('./routes/objetCtrl');
// var champCtrl    = require('./routes/champCtrl');
// var photoCtrl    = require('./routes/photoCtrl');

// Router
exports.router = (function() {
    var apiRouter = express.Router();
    console.log('ici');
    
//      apiRouter.route('/users').post(userCtrl.register);// on fait appels a la methode route,on la renseigne puis on utilise le verbe HTTP POST(on veut enregistrer un nouvel utilisateur)puis suivie de la fonction a executer
//      apiRouter.route('/users/:id').post(userCtrl.login);
//      apiRouter.route('/users').get(userCtrl.findAll);//recuperer tout les utilisateur en appelant la fonction findAll
//      apiRouter.route('/users/:id').put(userCtrl.update);//mettre à jour les informations d'un utilsateur precis
//      apiRouter.route('/users/:id').delete(userCtrl.delete);//supprimer un utilisateur precis
//      apiRouter.route('/users/:id').get(userCtrl.findById);// utilisée pour récupérer les informations d'un utilisateur spécifique en appelant la fonction findById du contrôleur userCtrl.

//     // Messages routes
//     apiRouter.route('/messages').post(messageCtrl.createMessage);
//     apiRouter.route('/messages').get(messageCtrl.getAllMessages);
//     apiRouter.route('/messages').get(messageCtrl.getUserMessages);
//     apiRouter.route('/messages/:id').delete(messageCtrl.deleteMessage);

//    // Categories routes
//    apiRouter.route('/categories').post(categorieCtrl.createCategorie);
//    apiRouter.route('/categories').get(categorieCtrl.getAllCategories);
//    apiRouter.route('/categories').get(categorieCtrl.getCategorieById);
//    apiRouter.route('/categories/:id').put(categorieCtrl.updateCategorie);
//    apiRouter.route('/categories/:id').delete(categorieCtrl.deleteCategorie);

//    // Objets routes
//    apiRouter.route('/objets').post(objetCtrl.createObjet);
//    apiRouter.route('/objets').get(objetCtrl.getAllObjets);
//    apiRouter.route('/objets').get(objetCtrl.getObjetById);
//    apiRouter.route('/objets/:id').put(objetCtrl.updateObjet);
//    apiRouter.route('/objets/:id').delete(objetCtrl.deleteObjet);

//     // Photos routes
//     apiRouter.route('/photos').post(photoCtrl.createPhoto);
//     apiRouter.route('/photos').get(photoCtrl.getAllPhotos);
//     apiRouter.route('/photos').get(photoCtrl.getPhotoById);
//     apiRouter.route('/photos/:id').put(photoCtrl.updatePhoto);
//     apiRouter.route('/photos/:id').delete(photoCtrl.deletePhoto);

//     // Champs routes
//     apiRouter.route('/champs').post(champCtrl.createChamp);
//     apiRouter.route('/champs').get(champCtrl.getAllChamps);
//     apiRouter.route('/champs').get(champCtrl.getChampById);
//     apiRouter.route('/champs/:id').put(champCtrl.updateChamp);
//     apiRouter.route('/champs/:id').delete(champCtrl.deleteChamp);


    return apiRouter;
})();//les deux parentheses servent à instancier notre routeur