import {API_URL, RESULT_PER_PAGE} from "./config.js";
import {getJSON}  from "./helper.js";

export let state = {
    recipe : {},
    search : {
        query : '',
        results : [],
        page : 1,
        resultsPerPage: RESULT_PER_PAGE
    },
    bookmarks : []
};

export const loadRecipe = async function(id){
    try {
        const data = await getJSON(`${API_URL}/${id}`); // getting data from helper.
        let { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            image: recipe.image_url,
            title: recipe.title,
            time : recipe.cooking_time,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            servings: recipe.servings,
            ingredients: recipe.ingredients
        }

        // checking if any bookmarked already present in the bookmarked array
        if(state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else
            state.recipe.bookmarked = false;
    } catch (error) {
        throw error;
    }
};


export const searchRecipe = async function(query) {
    try {
        const findRecipe = await getJSON(`${API_URL}?search=${query}`);
        state.search.results = findRecipe.data.recipes.map(rec => {
            return{
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            }
        })
    } catch (error) {
        console.log(error);
    }
}


export const getSearchResultsPage = function(page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * 10, end = page*10;
    /*
        calculation -> 
            For page 1) 1-1*10=0, 1*10=10
            For page 2) 2-1*10=10, 2*10=20
    */
   return state.search.results.slice(start, end);
}


export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
        // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
    }); 

    state.recipe.servings = newServings;
}

const peristBookmarks = function(){
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
} 

export const addBookmarks = function(recipe) {
    // add bookmarks
    state.bookmarks.push(recipe);

    // mark current recipe as bookmark
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    peristBookmarks();
}


export const deleteBookmarks = function(id) {
    // delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);
    // mark current recipe as unbookmark
    if(id === state.recipe.id) state.recipe.bookmarked = false;
    peristBookmarks();
}


const init = function(){
    const storage = localStorage.getItem('bookmarks');
    if(storage) state.bookmarks = JSON.parse(storage);
}

init();


