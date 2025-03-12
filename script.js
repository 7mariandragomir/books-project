
let myLibrary = [];
const booksContainer = document.getElementById('library');
const newBookButton = document.getElementById('add-new-book');

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.isRead = isRead
    }

    get bookInfo() {
        return `${this.title} by ${this.author}, has ${this.pages}. Read status: ${this.isRead}`;
    }

    changeStatus() {
        this.isRead === true ? this.isRead = false : this.isRead = true;
    }
};

class domHelp {
    static createElement(el = "div", cls = "", id = "", innerHTML = "") {
        let newElement = document.createElement(el);

        if (cls !== undefined && cls !== null) {
            newElement.classList.add(cls);
        }

        if (id !== undefined && id !== null) {
            newElement.id = id;
        }

        if(innerHTML !== undefined && innerHTML !== null) {
            newElement.innerHTML = innerHTML;
        };

        return newElement;
    }

    static renderElement(child, parent, isAdjacent = Boolean, adjacentLocation = String) {
        if(Array.isArray(child)) { // allows for multiple children to be rendered at once
            child.forEach(el => {
                if(isAdjacent === true) {
                    parent.insertAdjacentElement(adjacentLocation, el);
                } else {
                    parent.appendChild(el);
                };
            });
        } else {
            if(isAdjacent === true) {
                parent.insertAdjacentElement(adjacentLocation, child);
            } else {
                parent.appendChild(child);
            };
        }
    }
};

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead);
    myLibrary.unshift(newBook);
    renderBook(newBook);
};

addBookToLibrary('Dune', 'Frank Herbert', 1000, true);
addBookToLibrary('Children of Dune', 'Frank Herbert', 900, false);

function renderBook(book) {
    // new book entry element
    const entry = domHelp.createElement('div', 'book-entry');
    domHelp.renderElement(entry, newBookButton, true, 'afterend');

    // no of pages
    const pages = domHelp.createElement('p', 'pages', null, `${book.pages} pages`);

    // book title
    const title = domHelp.createElement('h3', 'title', null, book.title);

    // author 
    const authorParagraph = domHelp.createElement('p', null, null, 'by ');
    const author = domHelp.createElement('span', 'author', null, book.author);
    domHelp.renderElement(author, authorParagraph);

// Read Button Generate & functionability
    let readButton;
    if(book.isRead === true) {
        readButton = domHelp.createElement('button', 'unread', null, 'Mark as unread');
    } else {
        readButton = domHelp.createElement('button', 'read', null, 'Mark as read');
    };

    readButton.addEventListener('click', () => {
        book.changeStatus();
        book.isRead === true ? readButton.classList.replace('read', 'unread') : readButton.classList.replace('unread', 'read');
        book.isRead === true ? readButton.innerHTML = 'Mark as unread' : readButton.innerHTML = 'Mark as read';
    });

// Delete Button Generate & functionability
    const delButton = domHelp.createElement('button', 'del', null, 'Delete');

    delButton.addEventListener('click', () =>{
        let indexOfBook = myLibrary.indexOf(book);
        myLibrary.splice(indexOfBook, 1);
        entry.remove();
    })

    domHelp.renderElement([pages, title, authorParagraph, readButton, delButton], entry)

};

// Modal Functions

let newBook = {
    element: document.getElementById('modal'),
    titleInput: document.getElementById('in-title'),
    authorInput: document.getElementById('in-author'),
    pagesInput: document.getElementById('in-pages'),
    readStatusInput: document.getElementById('in-read'),
    close: function() {
        modal.close();
    },
    open: function() {
        modal.showModal();
    },
    addNewBook: function() {
        console.log(this.authorInput.value);
        addBookToLibrary(this.titleInput.value, this.authorInput.value, this.pagesInput.value, this.readStatusInput.checked);
        this.close();
    }
};