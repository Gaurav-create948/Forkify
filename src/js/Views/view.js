import icons from "url:../../img/icons.svg";

/* 
    exporting class directly because we don't want to create any instance from this class we just want to use it as a
    parent class.
*/
export default class View {
    _data;
    render(data) {
        // getting the recipe data here passed from controller
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return this.renderError();
        }
        this._data = data; // setting data so that we can use it in the html
        const markup = this._generateMarkup(); // markup generator
        this._clear(); // for clearing the data in the parent element before showing up anything else.
        this._parentElement.insertAdjacentHTML('afterbegin', markup); // showing the data in the parent element.
    }

    update(data){
        if (!data || (Array.isArray(data) && data.length === 0)) {
            return this.renderError();
        }
        this._data = data;
        const newMarkup = this._generateMarkup();
        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        const currElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const currEl = currElements[i];
            if(newEl.isEqualNode(currEl)&& newEl.firstChild?.nodeValue.trim() !== ''){
                currEl.textContext = newEl.textContent;
            }

            // updates changed attributes
            if(!newEl.isEqualNode(currEl)){
                Array.from(newEl.attributes).forEach(attr => 
                    currEl.setAttribute(attr.name, attr.value)
                );  
            }
        })
    }

    _clear() {
        this._parentElement.innerHTML = '';  // clearing the data from the parent element.
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    }

    renderSpinner() {
        const markup = `  
            <div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage) {
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }


    // From search
    getQuery() {
        const qurey = this._parentElement.querySelector('.search__field').value;
        this._parentElement.querySelector('.search__field').value = '';
        return qurey;
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }
}