# Pokedex Frontend

Our Pokedex application is a dynamic and interactive platform that allows users to explore, manage, and expand their knowledge of Pokémon. The app features a sleek, user-friendly interface where users can search for Pokémon by type, view detailed profiles of individual Pokémon, and add new Pokémon to the database. The /search page lets users filter Pokémon by their types with color-coded buttons that match their elemental attributes. Clicking on a Pokémon directs the user to the pokemon's profile page, which displays comprehensive details about the Pokémon, including its stats, moves, and types. Users can also access a carousel view of moves and open a pop-up with move-specific details, ensuring a rich and immersive browsing experience.

When adding pokemon, users can add newly discovered Pokémon to the database. The page allows for seamless input of Pokémon details such as species, types, moves, and stats, with real-time searchable dropdown menus for species and moves. Users can optionally upload an image for their Pokémon, which is stored securely in an AWS S3 bucket. The app also features a consistent and modern design with visually appealing elements like a floating blue circle for navigation and a polished start page with a vibrant welcome interface. The backend architecture supports these features with RESTful API endpoints for creating, updating, and retrieving Pokémon data, making the application both robust and highly customizable.

## Table of Contents

- [Pokedex Frontend](#pokedex-frontend)
  - [Table of Contents](#table-of-contents)
  - [Setup Instructions](#setup-instructions)
  - [Technologies Used](#technologies-used)

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ericmlantz/pokedex.git
   cd pokedex
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure backend variable**:

   - In the `global.js` file, update the BACKEND variable's value to be the url of the connected backend server

4. **Run the server**:
   ```bash
   npm run start
   ```
   The server will start on the specified port (default: `3000`).

## Technologies Used

- **Node.js**
- **React**
- **HTML/CSS**
- **AWS**
