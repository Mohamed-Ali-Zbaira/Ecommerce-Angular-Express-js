# Projet E-commerce Angular Express.js

Le projet E-commerce Angular Express.js est une application web complète qui offre des fonctionnalités de gestion d'une plateforme de commerce électronique. L'application utilise le framework Angular pour le côté client et Express.js pour le côté serveur. Elle intègre également une base de données MongoDB pour stocker les informations liées aux articles, catégories, sous-catégories et utilisateurs.
## Captures d'écran
### login
![Capture d'écran 1](https://res.cloudinary.com/dkrfmqbj1/image/upload/v1705951582/Ecommerce-Angular-Express-js/screencapture-localhost-4200-login-2023-12-10-19_16_00_w2llue.png)
### Register
![Capture d'écran 2](https://res.cloudinary.com/dkrfmqbj1/image/upload/v1705951582/Ecommerce-Angular-Express-js/screencapture-localhost-4200-login-2023-12-10-19_16_00_w2llue.png)
### Produits
![Capture d'écran 3](https://res.cloudinary.com/dkrfmqbj1/image/upload/v1705951592/Ecommerce-Angular-Express-js/screencapture-localhost-4200-ecommerce-2023-12-10-19_13_57_zkdruj.png)
### Payment
![Capture d'écran 3](https://res.cloudinary.com/dkrfmqbj1/image/upload/v1705951590/Ecommerce-Angular-Express-js/screencapture-localhost-4200-ecommerce-2023-12-10-19_17_36_ol6wvb.png)
### Administrateur
![Capture d'écran 4](https://res.cloudinary.com/dkrfmqbj1/image/upload/v1705951581/Ecommerce-Angular-Express-js/screencapture-localhost-4200-products-2023-12-10-19_15_01_px2ecm.png)
## Caractéristiques Principales

### Gestion des Articles :

- Les articles sont représentés par le modèle `article.js`.
- Chaque article a des propriétés telles que la référence, la désignation, le prix, la marque, la quantité en stock, et une image associée.
- Les articles peuvent être recherchés par sous-catégorie (`/articles/scat/:scategorieID`), affichés en liste générale (`/articles/`), paginés par page (`/articles/productspage/`), filtrés par désignation (`/articles/filtres/`), créés (POST `/articles/`), modifiés (PUT `/articles/:articleId`), et supprimés (DELETE `/articles/:articleId`).

### Gestion des Catégories et Sous-catégories :

- Les catégories sont représentées par le modèle `categorie.js` et les sous-catégories par le modèle `scategorie.js`.
- Chaque catégorie a un nom et une éventuelle image associée.
- Chaque sous-catégorie a un nom, une image et est liée à une catégorie parente.
- Les catégories et sous-catégories peuvent être récupérées en liste générale (`/categories/` et `/subcategories/`), créées (POST `/categories/` et POST `/subcategories/`), modifiées (PUT `/categories/:categorieId` et PUT `/subcategories/:scategorieId`), et supprimées (DELETE `/categories/:categorieId` et DELETE `/subcategories/:scategorieId`).

### Gestion des Utilisateurs :

- Les utilisateurs sont représentés par le modèle `user.js`.
- Chaque utilisateur a une adresse e-mail, un mot de passe, un prénom, un nom, un rôle par défaut ("user"), un statut d'activation par défaut (actif), et une éventuelle image d'avatar.
- Les utilisateurs peuvent s'inscrire (POST `/users/register`), se connecter (POST `/users/login`), et leur compte peut être activé ou désactivé (PUT `/users/status/edit`).

### Authentification et Sécurité :

- L'authentification est gérée via JWT (JSON Web Tokens).
- Un middleware (`auth.js`) est utilisé pour vérifier la validité des tokens, assurant ainsi l'accès sécurisé à certaines routes.

### Paiement :

- La fonctionnalité de paiement est intégrée via Stripe. Les utilisateurs peuvent effectuer des paiements en fournissant un token et un montant (POST `/payment/`).

## Organisation du Code

Le code est organisé en différents modules :

- **Models :** Les modèles définissent la structure des données stockées dans la base de données.
- **Middleware :** Le middleware (`auth.js`) fournit des fonctionnalités de vérification du token pour assurer la sécurité des routes.
- **Routes :** Les routes définissent les points d'accès de l'API pour la gestion des articles, catégories, sous-catégories, utilisateurs et paiements.

Le projet suit une architecture MVC (Modèle-Vue-Contrôleur) avec Angular côté client et Express.js côté serveur.

## Comment Contribuer

Le fichier README explique également comment d'autres contributeurs peuvent participer au projet, facilitant ainsi le développement collaboratif.

## Licence

Le projet est sous licence Mohamed Ali zbaira, ce qui permet aux utilisateurs de connaître les conditions d'utilisation de l'application.
