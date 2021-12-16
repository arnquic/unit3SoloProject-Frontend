# Pokemon Master

## Overview
Battle other Pokemon, build your team, and become a pokemon master! You will signin as a unique user and pick a starter Pokemon. As you defeat pokemon, you will catch them and add them to your roster so that you may use them in your next battle!

## Wireframes
See planningStuff/Wireframes.dio

## User Stories
1. When I first visit the site, I see a home page with a description of the site and links to signup and login.
2. When I try to login without an existing account, it doesn't let me login.
3. When I try to signup by using an existing email address or username, it doesn't let me create the account.
4. After signing up, I'm greeted with an option to choose a starter pokemon.
5. Once I've picked a starter pokemon - or upon successful re-login - I'm taken to a page with all of my pokemon.
6. When I click on one of my pokemon I can choose to resume a previous battle, start a new one, or close those menu options.
7. When I enter a battle, I see my pokemon, it's name and health, and a random enemy pokemon, along with it's name and health.
8. While battling, I have the option to fight, or quit (, or save & quit - Stretch Goal).
9. When I defeat an enemy pokemon, it is added to My Pokemon.
10. When I leave the site without logging out, upon return I am still logged in.
11. When I logout, I have to re-login to be able to see my pokemon and start battles.

## Backend Routes
- '/user/signup' - Create a new user.
- '/user/login' - Login to an existing user account.
- '/user/verify' - Verify a user that currently has an auth token stored.
- '/myPokemon' - Get all of the currently logged-in user's pokemon.
- '/myPokemon/add' - Add a pokemon to the currently logged-in user's pokemon.
- (Stretch)'/myPokemon/saveBattle' - Save the logged-in user's current pokemon's battle.

## Backend MVP Checklist
1. [x] Create Backend Express App
    1. [x] npm init
    2. [x] npm installs (express, nodemon, pg, sequelize, dotenv, bcrypt, jsonwebtoken, cors, rowdy-logger)
    3. [x] sequelize init
    4. [x] .gitignore (node_modules, config, .env)
2. [x] Create DB models
    1. [x] Use singular names
3. [x] Migrate models
4. [x] Create routers and controllers for backend
5. [x] Create controller functions
6. [x] Hook-up server.js with routers and routers with controllers

## ERD (Entity Relationship Diagram)
See planningStuff/ERD.jpg

## Frontend Components Tree
See planningStuff/FrontendComponents.dio

## Frontend Routes
- '/' - Home page.
- '/signup' - Signup as a new user.
- '/login' - Login to an existing user account.
- '/selectStarter' - Page to select the logged-in user's starter pokemon.
- '/myPokemon' - Page to see all of the signed-in user's caught pokemon as well as initiate a new battle (or resume a saved one - Stretch Goal).
- '/battle' - Page that will hold the most fun part of the app/site - BATTLING!!!

## Frontend MVP Checklist
1. [x] Create React App (use '.' to specify that it should be made directly in frontend folder)
2. [x] Create all Component and Page folders, .js files, and .css files
3. [x] Create AppContext
4. [x] Wrap the App in BrowserRouter and AppContext
5. [x] Complete Components and Pages
    1. [x] Will need "https://pokeapi.co/api/v2/" calls

## Stretch Goals
1. [x] More complex game mechanics
    - [x] Mechanics do include move choices rather than just coin flips.
    - [ ] Could expand furhter with pokemon stats incorporation beyond just the selected move's power.
    - [ ] Could expand furhter with assigning more 'classic' pokemon moves for each pokemon, and not just the first 3 moves in the list of moves the pokemon can learn.
2. [ ] Pokemon Damaged Animations
3. [ ] Ability to filter/search My Pokemon
4. [ ] Implement Battle saving
5. [ ] Select the enemy pokemon you want to battle