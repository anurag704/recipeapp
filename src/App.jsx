import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';
import './index.css';
import Image from './recipe.webp';


const App = () => {

const APP_ID = 'd196abcf';
const APP_KEY ='9db13064d8f0d87a7d54d4e0a709ce40';

const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState("");
const [query, setQuery] = useState("chicken");


useEffect (() => {
getRecipe();
}, [query]);

const getRecipe = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
};

const updateSearch = e => {
    setSearch(e.target.value);
};

const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
}

return (
    <div className="App">
        <img className="img" src={Image} alt="RECIPE"/>
        <form onSubmit={getSearch} className="search-form">
            <input type="text" className="search-bar" 
            value={search} onChange={updateSearch}/>
            <button type="submit" className="search-button">
                Search
            </button>
        </form>
        <div className="recipe"> 
        {recipes.map(recipe =>(
            <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories ={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            />
        )) }
        </div>
    </div>

);
};


export default App;