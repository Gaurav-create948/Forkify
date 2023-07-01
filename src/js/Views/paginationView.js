import View from './view.js';
import icons from "url:../../img/icons.svg";

class paginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            const gotoPage = +btn.dataset.goto;
            handler(gotoPage);
        })
    }

    _generateMarkup(){
        const currPage = this._data.page
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // console.log(this._data.results.length, this._data.resultsPerPage);

        // first page and showing only next button.
        if(currPage === 1 && numPages > 1){
            return `
                <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currPage+1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }
        
        // last page and only showing the previous button
        if(currPage === numPages && numPages > 1){
            console.log(currPage)
            return `
                <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
                     <svg class="search__icon">
                         <use href="${icons}#icon-arrow-left"></use>
                     </svg>
                     <span>Page ${currPage-1}</span>
                </button>
            `;
        }

        // between somewhere last and first showing both the buttons
        if(currPage < numPages){
            return `
                <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currPage-1}</span>
                </button>
                <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currPage+1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        }

        // only one page don't have to show anything
        return '';
    }
}

// const markup = `
//     <button class="btn--inline pagination__btn--prev">
//         <svg class="search__icon">
//             <use href="src/img/icons.svg#icon-arrow-left"></use>
//         </svg>
//         <span>Page 1</span>
//     </button>
//     <button class="btn--inline pagination__btn--next">
//         <span>Page 3</span>
//         <svg class="search__icon">
//             <use href="src/img/icons.svg#icon-arrow-right"></use>
//         </svg>
//     </button>
// `;

// this._parentElement.insertAdjacentHTML('afterend', markup);
export default new paginationView();