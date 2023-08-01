## Installation du projet en local : 
Clonez le projet : 
        https://github.com/belarif/bill-app.git


## Comment lancer l'application en local ?
### Etape 1 - Lancer le backend :

Acceder au répertoire du projet :

    cd Billed-app-FR-Back

Installer les dépendances du projet : 

    npm install

Lancer l'API : 

    npm run run:dev

### Etape 2 - Lancer le frontend : 
Allez au repo cloné :

    cd Billed-app-FR-Front

Installez les packages npm (décrits dans package.json) :
   
    npm install

Installez live-server pour lancer un serveur local :

    npm install -g live-server

Lancez l'application :

    live-server

Puis allez à l'adresse : 
    
    http://127.0.0.1:8080/

## Comment lancer tous les tests en local avec Jest ?
    npm run test

## Comment lancer un seul test ?
Installez jest-cli :

    npm i -g jest-cli
    jest src/__tests__/your_test_file.js

## Comment voir la couverture de test ?

    http://127.0.0.1:8080/coverage/lcov-report/

## Comptes et utilisateurs :
Vous pouvez vous connecter en utilisant les comptes:

administrateur : 

    utilisateur : admin@test.tld 
    mot de passe : admin

employé :

    utilisateur : employee@test.tld
    mot de passe : employee



