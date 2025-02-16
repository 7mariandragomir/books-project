
let myLibrary = [];
const booksContainer = document.getElementById('library');
const newBookButton = document.getElementById('add-new-book');

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.getInfo = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, status: ${this.isRead}`;
        
    };
    this.changeStatus = function() {
        this.isRead === true ? this.isRead = false : this.isRead = true;
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    let newBook = new Book(title, author, pages, isRead);
    Object.setPrototypeOf(newBook, Book);
    myLibrary.unshift(newBook);

    renderBook(newBook)
};

addBookToLibrary('Dune', 'Frank Herbert', 1000, true);
addBookToLibrary('Children of Dune', 'Frank Herbert', 900, false);

function renderBook(book) {
    const entry = document.createElement('div');
    entry.classList.add('book-entry');
    // booksContainer.appendChild(entry);
    newBookButton.insertAdjacentElement('afterend', entry);

    const pages = document.createElement('p');
    pages.classList.add('pages');
    pages.innerHTML = `${book.pages} pages`;

    const title = document.createElement('h3');
    title.classList.add('title');
    title.innerHTML = book.title;

    const authorParagraph = document.createElement('p');
    authorParagraph.innerText = `by `;

    const author = document.createElement('span');
    author.classList.add('author');
    author.innerHTML = book.author;
    authorParagraph.appendChild(author);

// Read Button Generate & functionability
    const readButton = document.createElement('button');
    if(book.isRead === true) {
        readButton.classList.add('unread')
        readButton.innerHTML = 'Mark as unread';
    } else {
        readButton.classList.add('read')
        readButton.innerHTML = 'Mark as read';
    }

    readButton.addEventListener('click', () => {
        book.changeStatus();
        book.isRead === true ? readButton.classList.replace('read', 'unread') : readButton.classList.replace('unread', 'read');
        book.isRead === true ? readButton.innerHTML = 'Mark as unread' : readButton.innerHTML = 'Mark as read';
    });

// Delete Button Generate & functionability
    const delButton = document.createElement('button');
    delButton.classList.add('del');
    delButton.innerHTML = 'Delete';

    delButton.addEventListener('click', () =>{
        let indexOfBook = myLibrary.indexOf(book);
        myLibrary.splice(indexOfBook, 1);
        entry.remove();
    })


    entry.appendChild(pages);
    entry.appendChild(title);
    entry.appendChild(authorParagraph);
    entry.appendChild(readButton);
    entry.appendChild(delButton);

}

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
}