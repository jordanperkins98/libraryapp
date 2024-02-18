
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
    const library = document.querySelector('.library');
    library.innerHTML = '';
    console.log("Cleared library");

    console.log("Rendering library...");
    myLibrary.forEach((book, index) => {
        console.log("Rendering book: ", book.title, " at index: ", index)
        const card = document.createElement('div');
        card.classList.add('card-row');
        card.innerHTML = `
        <div class="book-info">
            <div class="image"></div>
                <div class="info">
                    <h2 class="title">${book.title}</h2>
                    <p class="author">${book.author}</p>
                    <p class="pages">${book.pages} Pages</p>
                </div>
        </div>
        <div class="read-status">
            <div class="datalist">
            <input list="read-statuses" name="read-status-list" class="read-status-list" value="${book.status}">
                <datalist id="read-statuses">
                    <option value="To read"></option>
                    <option value="Reading"></option>
                    <option value="Read"></option>
                </datalist>
            </div>
            <button class="mark-owned">Mark as Owned</button>
            <button class="remove-book" data-index="${index}">Remove</button>            
        </div>
        `;

        let classStatus = '';

        switch(book.status) {
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

        const correctDiv = document.querySelector(`.${classStatus}`);

        correctDiv.appendChild(card);
    } )


    //TODO
    // loop through myLibrary and create a new card for each book or enough to fit on the screen.
    // display each card
    // add event listeners to each card to remove it from the library

}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'To read');
const book2 = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, 'Reading');
myLibrary.push(book1, book2);
render();