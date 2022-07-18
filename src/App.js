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
      <h3>Discover over 3 million recipes using only voice.</h3>
      <h3>Click the microphone button in the bottom-right corner to get started.</h3>
      <br /><br /><br />

      <RecipesCards recipes={recipes} />

      <br /><br /><br /><br /><br /><br />
      <img src="https://i0.wp.com/synqqblog.wpcomstaging.com/wp-content/uploads/2019/11/preview.jpg?fit=1200%2C630&ssl=1" alt="Alan" height="150px"></img>
      <img src="https://www.ontotext.com/wp-content/uploads/2014/08/edamam_logo-1024x682.jpg" alt="Edamam" height="150px"></img>
    </div>
  );
}

export default App;
