import React, { useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import './App.css';

function App() {

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: ({command, recipes}) => {
        // eslint-disable-next-line default-case
        switch (command) {
          case "newRecipes":
            console.log(recipes);
            console.log(recipes.count);
            break;
        }
      }
    })
  }, []);

  return (
    <div className="App">
      <h1>Acoustic Recipe</h1>
    </div>
  );
}

export default App;
