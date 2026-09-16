## Documentation détaillée du projet
Voici un document Markdown prêt à copier dans un fichier comme README.md ou un fichier de documentation du projet.

# Music App - Documentation technique

## 1. Présentation générale
Ce projet est une application web complète composée de :

- un frontend Angular
- un backend Spring Boot
- une base de données MySQL
- une configuration Kubernetes pour le déploiement
- un ingress NGINX pour routage des requêtes HTTP
Le projet est organisé en deux applications principales :

- [web-site-music-frontend](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
- [web-site-music-backend-](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
et une configuration d’orchestration dans [k8s](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html), avec notamment :

- [music-ingress.yaml](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
- [backend-deployment.yaml](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
- [frontend-deployment.yaml](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
- [mysql-deployment.yaml](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)

---

## 2. Architecture globale
Le système suit une architecture 3-tiers :

1. Frontend

- Angular
- affiche les pages publiques et l’administration
- communique avec le backend via API REST
2. Backend

- Spring Boot
- expose les endpoints API
- gère l’authentification JWT
- gère les spectacles, épisodes, médias
- stocke les métadonnées en base MySQL
3. Base de données

- MySQL 8
- persistance avec PVC Kubernetes
- contient les données métier de l’application
La configuration Docker Compose montre bien le flux :

- MySQL sur le port 3306
- backend sur le port 8080
- frontend sur le port 4200
- le backend dépend de MySQL
- le frontend dépend du backend
Le fichier [docker-compose.yaml](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) confirme ce schéma de fonctionnement.

---

## 3. Stack technique

### Frontend

- Angular 16
- TypeScript
- Angular Material
- RxJS
- Routing Angular
- Services HTTP
Le fichier [package.json](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) montre les dépendances principales :

- @angular/core
- @angular/router
- @angular/material
- rxjs
- typescript

### Backend

- Java 17
- Spring Boot 4.0.6
- Spring Web
- Spring Data JPA
- Spring Security
- Validation
- JWT
- MySQL Connector
- Cloudinary SDK
Le backend est déclaré dans [pom.xml](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html).

### Base de données

- MySQL 8
- stockage persistant via PVC

---

## 4. Structure du projet

### Frontend
Le dossier [app](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) contient :

- [app-routing.module.ts](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
- [app.module.ts](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
- modules/public
- modules/auth
- modules/admin
- core/services
- core/guards
- core/interceptors
- core/models
Les modules principaux :

- Public : pages visibles par tout le monde

- accueil
- spectacles
- détail d’un spectacle
- podcast
- détail d’un épisode
- Auth : connexion admin

- page login
- auth guard
- JWT interceptor
- Admin : espace d’administration

- formulaire spectacle
- formulaire épisode
- dashboard

### Backend
Le dossier [backend](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) contient :

- controller
- service
- repository
- entity
- dto
- config
Les contrôleurs principaux sont :

- AuthController
- EpisodeController
- SpectacleController
Les services principaux :

- AuthService
- EpisodeService
- SpectacleService
- CloudinaryService
- JwtService
Les entités :

- Admin
- Spectacle
- EpisodePodcast
- Photo
- Reel

---

## 5. Fonctionnement du backend
Le fichier [application.properties](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) contient la configuration de base :

- port du serveur : 8080
- datasource MySQL
- URL JDBC
- nom de la base : hkayet8ram
- utilisateur Spring datasource
- mot de passe
- configuration JPA
- JWT secret
- Cloudinary
- CORS
- taille maximale de fichiers uploadés

### Paramètres importants

#### Base de données
La configuration JDBC est :

- DB_HOST
- DB_PORT
- DB_NAME
- SPRING_DATASOURCE_USERNAME
- SPRING_DATASOURCE_PASSWORD
La connexion est construite avec un fallback local :

- host par défaut : localhost
- port : 3306
- base : hkayet8ram

#### JWT
Le backend utilise JWT pour sécuriser les endpoints admin.

Configuration détectée :

- clé secrète configurable via JWT_SECRET
- expiration : 86400000 ms (24h)

#### Cloudinary
Le backend utilise Cloudinary pour :

- uploader des affiches
- uploader des photos
- uploader des reels vidéos
C’est un bon choix pour stocker des médias externes sans les conserver localement dans le serveur.

#### CORS
La configuration de sécurité autorise plusieurs origines locales :

- [http://localhost](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html):*
- [http://127.0.0.1](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html):*
- [http://192.168](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html).*.*
- [http://music.local](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html):*
Cela permet un accès correct depuis le frontend local ou le domaine interne Kubernetes.

---

## 6. Sécurité backend
Le fichier [SecurityConfig.java](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) montre la logique de sécurité.

### Règles observées

- /api/auth/** : public
- /api/spectacles/** : public
- /api/episodes/** : public
- /api/admin/** : authentifié
- tout le reste : authentifié
Cela signifie que :

- la connexion admin est publique
- la consultation publique des spectacles et épisodes est ouverte
- les actions admin sont protégées
La configuration désactive aussi le CSRF, utilise un mode stateless, et ajoute un filtre JWT avant Spring Security.

---

## 7. API du backend

### Authentification
Endpoint :

- POST /api/auth/login
Le contrôleur [AuthController.java](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) montre un flux simple :

- reçoit LoginRequest
- appelle AuthService
- retourne LoginResponse ou 401 si échec

### Spectacles
Endpoint public :

- GET /api/spectacles
- GET /api/spectacles/{id}
Endpoint admin :

- POST /api/admin/spectacles
- PUT /api/admin/spectacles/{id}
- DELETE /api/admin/spectacles/{id}
Uploads médias :

- POST /api/admin/spectacles/{id}/affiche
- POST /api/admin/spectacles/{id}/photos
- POST /api/admin/spectacles/{id}/reels

### Episodes
Endpoint public :

- GET /api/episodes
- GET /api/episodes/{id}
Endpoint admin :

- POST /api/admin/episodes
- PUT /api/admin/episodes/{id}
- DELETE /api/admin/episodes/{id}
Uploads médias :

- POST /api/admin/episodes/{id}/affiche
- POST /api/admin/episodes/{id}/reels

---

## 8. Frontend routing
Le fichier [app-routing.module.ts](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) définit les routes principales :

- /
- /login
- /admin
- wildcard vers /
Le module public :

- /
- /spectacles
- /spectacles/:id
- /podcast
- /podcast/:id
Le module public est visible dans [public-routing.module.ts](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html).

Cela montre bien le site :

- page d’accueil
- liste des spectacles
- détail d’un spectacle
- podcast et détail d’un épisode

---

## 9. Déploiement Kubernetes

### Namespace
Le namespace utilisé est :

- music-app

### Ingress
Le fichier [music-ingress.yaml](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) configure :

- host : music.local
- /api → backend-service:8080
- / → frontend-service:80
Cela permet de router :

- les appels API vers le backend
- les pages web vers le frontend

### Services
Les services Kubernetes sont :

- [backend-service.yaml](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
- [frontend-service.yaml](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
- [mysql-service.yaml](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
Ils permettent la communication interne au sein du cluster.

### Deployments
Les déploiements définis sont :

- backend:

- app label: music-backend
- image: music-backend:1.1
- port: 8080
- variables d’environnement récupérées depuis ConfigMap et Secret
- frontend:

- app label: music-frontend
- image: music-frontend:1.1
- port: 80
- MySQL:

- app label: mysql
- image: mysql:8.0
- port: 3306
- volume persistant via PVC

### ConfigMap
Le ConfigMap utilisé est :

- [backend-configmap.yaml](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
Il définit :

- DB_HOST = mysql-service
- DB_PORT = 3306
- DB_NAME = hkayet8ram

### Secret
Le Secret est :

- [mysql-secret.yaml](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
Il contient :

- username
- password
- root-password

### PVC
Le stockage MySQL se fait via :

- [mysql-pvc.yaml](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html)
Il demande un volume :

- accessModes: ReadWriteOnce
- stockage: 2Gi

---

## 10. Flux d’exécution complet

### Cas d’utilisation classique

1. L’utilisateur ouvre le site sur music.local
2. Le frontend Angular s’affiche
3. Le frontend appelle l’API backend
4. Le backend lit les données dans MySQL
5. Le backend renvoie les données JSON au frontend
6. Le frontend les affiche à l’utilisateur

### Cas administration

1. L’administrateur se connecte via /login
2. Le backend vérifie les identifiants
3. Un JWT est retourné
4. Le frontend stocke le token
5. Les requêtes admin portent ce token
6. Le backend valide le token
7. Les opérations CRUD sont autorisées

---

## 11. Points forts du projet

- architecture claire en 3 couches
- séparation frontend/backend
- usage de Spring Security et JWT
- utilisation de Cloudinary pour les médias
- configuration Kubernetes bien structurée
- persistance MySQL avec PVC
- routage HTTP via Ingress

---

## 12. Points à vérifier / améliorations possibles
Quelques éléments méritent un contrôle :

- le port ou nom d’image Docker peut varier entre compose et Kubernetes
- le backend est configuré avec des valeurs sensibles dans des fichiers de configuration
- le Secret MySQL est bien présent, mais il faudrait sécuriser encore plus les secrets en production
- l’Ingress est configuré pour music.local ; il faut le mapping local / hosts
- le projet pourrait être enrichi d’un Helm chart ou de manifests plus complets
- il faudrait ajouter des probes readiness/liveness dans les deployments Kubernetes
- il serait utile d’ajouter un NetworkPolicy, un Namespace plus propre, et des ressources CPU/RAM

---

## 13. Conclusion
Ce projet est un site web de type média / spectacle / podcast avec :

- un frontend Angular
- un backend Spring Boot
- une base MySQL
- des uploads de médias Cloudinary
- une sécurité JWT
- un déploiement Kubernetes avec Ingress et services
Il est bien structuré pour un petit projet SaaS / portail culturel, avec une base solide pour évolutions et mise en production.  