let template = `
<!DOCTYPE html>
<html>
<head>
  <title>Réinitialisation de mot de passe</title>
</head>
<body>
  <h1>Réinitialisation de mot de passe</h1>
  <form action="/reset_password" method="post">
    <label for="email">Adresse e-mail :</label>
    <input type="email" id="email" name="email" required>
    <input type="submit" value="Réinitialiser le mot de passe">
  </form>
</body>
</html>
`;
module.exports = template;