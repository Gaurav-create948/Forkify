import icons from "url:../../img/icons.svg";
import View from "./view";

class resultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query! Please try again ;)';

    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join('');
    }

    _generateMarkupPreview(recipe) {
        const id = window.location.hash.slice(1);

        return `
            <li class="preview ${recipe.id === id ? "preview__link--active" : ""}">
                <a class="preview__link" href="#${recipe.id}">
                    <figure class="preview__fig">
                        <img src=${recipe.image} alt="Test" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${recipe.title}</h4>
                        <p class="preview__publisher">The Pioneer Woman</p>
                        <div class="preview__user-generated">
                            <svg>
                                <use href="${icons}#icon-user"></use>
                            </svg>
                        </div>
                    </div>
                </a>
            </li>`
            ;
    }
}

export default new resultsView();