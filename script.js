
const myLibrary = [];

class Book {

constructor(title, author,pages, status, imagesrc){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.imagesrc = imagesrc;
    
    }

    static addBookToLibrary(title, author, pages, status, imagesrc) {
        const newBook = new Book(title, author, pages, status, imagesrc);
        myLibrary.push(newBook);
        render();
        const form = document.querySelector('.form-container');
        form.classList.toggle('hidden');
    }

    static removeBookFromLibrary(index) {
        myLibrary.splice(index, 1);
    }

    info(){
    return `${title} by ${author}, ${pages} pages, ${status}`
    }

}




function selectEventListener(card) {
    const selectElement = card.querySelector('.read-statuses');
    selectElement.addEventListener('change', () => {
        const index = selectElement.parentElement.parentElement.querySelector('.remove-book').dataset.index;
        myLibrary[index].status = selectElement.value;
        render();
    });
}

function removeEventListener(card) {
    const removeButton = card.querySelector('.remove-book');
    removeButton.addEventListener('click', () => {
        const index = removeButton.dataset.index;
        Book.removeBookFromLibrary(index);
        render();
    });
}

function addBookEventListener() {
    const addBookButton = document.querySelector('.add-buttton');
    addBookButton.addEventListener('click', () => {
        const form = document.querySelector('.form-container');
        form.classList.toggle('hidden');
    });
}

function closeFormEventListener() {
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        const form = document.querySelector('.form-container');
        form.classList.toggle('hidden');
    });
}

function preventSubmitDefault() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}

function submitEventListener() {
    const submitButton = document.querySelector('.submit');
    submitButton.addEventListener('click', () => {
        console.log(document.querySelector('#status').selectedIndex);
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const pages = document.querySelector('#pages').value;

        const selectElement = document.querySelector('#status');
        const selectedIndexValue = selectElement.selectedIndex;
        const bookStatus = selectElement.options[selectedIndexValue].value;
        const imagesrc = './Assets/placeholder.png';

        Book.addBookToLibrary(title, author, pages, bookStatus, imagesrc);
    });
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

        removeEventListener(card);

        selectEventListener(card);

    }

    myLibrary.forEach((book, index) => {
        console.log("Rendering book: ", book.title, " at index: ", index)
        const card = document.createElement('div');
        card.classList.add('card-row');
        card.innerHTML = `
        <div class="book-info">
            <img alt="book cover" class="image" src=${book.imagesrc}>
                <div class="info">
                    <h4 class="title">${book.title}</h4>
                    <p class="author">${book.author}</p>
                    <p class="pages">${book.pages} Pages</p>
                </div>
        </div>
        <div class="read-status">
            <div class="select-wrapper">
                <select name="read-status-list" class="read-statuses">
                    <option value="To read">To read</option>
                    <option value="Reading">Reading</option>
                    <option value="Read">Read</option>
                </select>
            </div>
            <div class="buttons">
                <button class="mark-owned">Mark as Owned</button>
                <button class="remove-book" data-index="${index}">Remove</button>
            </div>            
        </div>
        `;

        const correctDiv = getReadStatusClass(book);

        correctDiv.appendChild(card);

        setDefaultSelectOption(card, book);

        addEventListeners(card);


    } )

}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'To read','./Assets/thehobbitcover.jpg');
const book2 = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, 'Reading', './Assets/FellowshipoftheRingcover.jpg');
myLibrary.push(book1, book2);
render();
addBookEventListener();
closeFormEventListener();
submitEventListener();
preventSubmitDefault();



