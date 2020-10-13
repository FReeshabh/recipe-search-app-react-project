import React,{useEffect, useState} from 'react';
import Recipe from './Recipe'
import './App.css';

const App = () => {
  const APP_ID=""
  const APP_KEY=""

  // const [counter, setCounter] = useState(0);

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')

 //[] to make it run only once, [counter] only runs when counter updates 
  useEffect(() => {
    getRecipes();
  }, [query]); //useEffect only runs when the quert changes


  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits)
  }
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault(); //To stop the page refresh everytime
    setQuery(search);
    setSearch('')
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <h1 className ="title-text">Recipe Search App</h1> 
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>

      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>

    </div>
  );
};
export default App;
