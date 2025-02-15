function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.getInfo = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, status: ${this.isRead}`;
        
    }
}

let book = new Book("Dune", "Frank Herbert", "1000", "read"); 

console.log(book.getInfo());