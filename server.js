const express = require('express');
const app = express();

// Middleware pour analyser le corps des requêtes (en JSON)
app.use(express.json());

// Données utilisateur fictives sans hachage (mots de passe en clair)
const validUsername = 'admin';
const validPassword = 'password123'; // Mot de passe en clair

// Route pour l'authentification
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Vérification des identifiants sans hachage
    if (username === validUsername && password === validPassword) {
        res.json({ message: 'Connexion réussie' });
    } else {
        res.status(401).json({ message: 'Identifiant ou mot de passe incorrect' });
    }
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
