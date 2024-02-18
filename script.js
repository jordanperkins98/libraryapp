
const myLibrary = [];

function Book(title, author,pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${status}`
    };
}

function addBookToLibrary() {

}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

function render() {

    // Clear the current library
    const library = document.querySelectorAll('.library');

    library.forEach( (node) => node.innerHTML = '');

    console.log("Cleared library");
    console.log(library)

    console.log("Rendering library...");

    function setDefaultSelectOption(card, book) {
        const selectElement = card.querySelector('.read-statuses');
        const options = selectElement.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === book.status) {
                options[i].selected = true;
            }
        }
    }

    function getReadStatusClass(book) {
        let classStatus = '';

        switch (book.status) {
            case 'To read':
                classStatus = 'to-read';
                break;
            case 'Reading':
                classStatus = 'reading';
                break;
            case 'Read':
                classStatus = 'read';
                break;
        }

        console.log("Class status: ", classStatus);

        return document.querySelector(`.${classStatus}`);
    }

    function addEventListeners(card) {

        const removeButton = card.querySelector('.remove-book');
        removeButton.addEventListener('click', () => {
            const index = removeButton.dataset.index;
            removeBookFromLibrary(index);
            render();
        });

        const selectElement = card.querySelector('.read-statuses');
        selectElement.addEventListener('change', () => {
            const index = selectElement.parentElement.parentElement.querySelector('.remove-book').dataset.index;
            myLibrary[index].status = selectElement.value;
            render();
        });

    }

    myLibrary.forEach((book, index) => {
        console.log("Rendering book: ", book.title, " at index: ", index)
        const card = document.createElement('div');
        card.classList.add('card-row');
        card.innerHTML = `
        <div class="book-info">
            <div class="image"></div>
                <div class="info">
                    <h4 class="title">${book.title}</h4>
                    <p class="author">${book.author}</p>
                    <p class="pages">${book.pages} Pages</p>
                </div>
        </div>
        <div class="read-status">
            <div class="datalist">
                <select name="read-status-list" class="read-statuses">
                    <option value="To read">To read</option>
                    <option value="Reading">Reading</option>
                    <option value="Read">Read</option>
                </select>
            </div>
            <button class="mark-owned">Mark as Owned</button>
            <button class="remove-book" data-index="${index}">Remove</button>            
        </div>
        `;

        const correctDiv = getReadStatusClass(book);

        correctDiv.appendChild(card);

        setDefaultSelectOption(card, book);

        addEventListeners(card);


    } )


    //TODO
    // add event listeners to each card to change the status of the book
    // add event listeners to each card to remove it from the library

}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'To read');
const book2 = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, 'Reading');
myLibrary.push(book1, book2);
render();