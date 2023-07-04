import * as model from './model.js';
import RecipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';
import paginationView from './Views/paginationView.js'; 
import recipeView from './Views/recipeView.js';
import bookmarkView from './Views/bookmarkView.js';


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};



// recipes
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if(!id) return;
    RecipeView.renderSpinner();
    
    // 0. Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1. Loading recipe
    await model.loadRecipe(id);
    // 2. Rendering recipe
    RecipeView.render(model.state.recipe); // imported the object exported from view and here passing the data in the render method.

  } catch (error) {
    console.log(error);
    RecipeView.renderError();
  }
}


// search result
const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if(!query) return;
    await model.searchRecipe(query);
    // searchView.renderSpinner();
    resultsView.render(model.getSearchResultsPage(1));
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
}

const controlPagination = function (gotoPage) {
  
  // Get new pages
  resultsView.render(model.getSearchResultsPage(gotoPage));
  // show new pages
  paginationView.render(model.state.search);
}


const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);
  // update the recipe view
  RecipeView.render(model.state.recipe);
  // RecipeView.update(model.state.recipe);
}


const controlAddBookmark = function() {
  // 1) Add/remove bookmark

  if(!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.deleteBookmarks(model.state.recipe.id);

  // // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // // 3) Render bookmarks
  bookmarkView.render(model.state.bookmarks);
}

const controlBookmarks = function(){
  bookmarkView.render(model.state.bookmarks)
}


// calling same function on every event insted of repeating.
const init = function() {
  bookmarkView.addHandlerRender(controlBookmarks);
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();

