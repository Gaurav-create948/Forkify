import View from "./view";
import icons from "url:../../img/icons.svg";

class SearchView extends View{
    _parentElement = document.querySelector('.search');
}

export default new SearchView();


/*
    <li class="preview">
        <a class="preview__link preview__link--active" href="#23456">
            <figure class="preview__fig">
                <img src="./src/img/test-1.jpg" alt="Test" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">Pasta with Tomato Cream ...</h4>
                <p class="preview__publisher">The Pioneer Woman</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
            </div>
        </a>
    </li>

*/