import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import './App.css';

import RecipesCards from './components/RecipesCards';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: ({command, recipes}) => {
        // eslint-disable-next-line default-case
        switch (command) {
          case "newRecipes":
            setRecipes(recipes)
            break;
        }
      }
    })
  }, []);

  return (
    <div className="App">
      <h1>Acoustic Recipe</h1>
      <RecipesCards recipes={recipes} />
    </div>
  );
}

export default App;
