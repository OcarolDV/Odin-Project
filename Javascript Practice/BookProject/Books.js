// Library array to store all the books
const myLibrary = [];

// Book constructor
function Book(title, author, pages, haveRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;

    this.info = function() {
        return `${this.title}<br>by ${this.author}<br>${this.pages} pages<br>${this.haveRead ? 'Have Read' : 'Not Read'}`;
    }
} 

// Example of creating book objects
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', 279, true);
const toKillAMockingbird = new Book('To Kill a Mockingbird', 'Harper Lee', 324, true);
const theGreatGatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
const mobyDick = new Book('Moby-Dick', 'Herman Melville', 585, false);
const warAndPeace = new Book('War and Peace', 'Leo Tolstoy', 1225, false);
const nineteenEightyFour = new Book('1984', 'George Orwell', 328, true);
const theCatchInTheRye = new Book('The Catcher in the Rye', 'J.D. Salinger', 214, true);
const theLordOfTheRings = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1178, false);
const theHarryPotter = new Book('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 223, true);
const theAlchemist = new Book('The Alchemist', 'Paulo Coelho', 208, true);

// Adding the example books to the library
addBookToLibrary(theHobbit);
addBookToLibrary(prideAndPrejudice);
addBookToLibrary(toKillAMockingbird);
addBookToLibrary(theGreatGatsby);
addBookToLibrary(mobyDick);
addBookToLibrary(warAndPeace);
addBookToLibrary(nineteenEightyFour);
addBookToLibrary(theCatchInTheRye);
addBookToLibrary(theLordOfTheRings);
addBookToLibrary(theHarryPotter);
addBookToLibrary(theAlchemist);

// Takes in a book object and adds it to the library array
function addBookToLibrary(book){
    myLibrary.push(book);
}

// Function to handle form submission and add a book to the library
// Activated when the form is submitted
document.getElementById('bookForm').addEventListener('submit', function(e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form values
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let haveRead = document.getElementById('haveRead').value === 'yes';

    let book = new Book(title, author, pages, haveRead);
    addBookToLibrary(book);

    // Clear form inputs after submission
    document.getElementById('bookForm').reset();
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the buttons by their ID
    var showAllButton = document.getElementById('showAll');
    var showReadButton = document.getElementById('showRead');
    var showNotReadButton = document.getElementById('showNotRead');

    // Get the element where you want to display the books
    var booksContainer = document.getElementById('booksContainer');

    // Function to create and display book elements
    function displayBooks(books) {

        // Clear the container
        booksContainer.innerHTML = '';

        // Show books
        books.forEach(function(book, index) {
            var bookElementDiv = document.createElement('div');
            var bookElement = document.createElement('p');
            var bookDelete = document.createElement('button');
            var bookShow = document.createElement('button');

            bookElement.innerHTML = book.title;
            bookDelete.textContent = 'Delete';
            bookShow.textContent = 'Show Info';

            bookElementDiv.classList.add('book-item'); // Add class for styling
            bookDelete.classList.add('delete-button'); // Add class for styling

            bookElementDiv.appendChild(bookElement);
            bookElementDiv.appendChild(bookShow);
            bookElementDiv.appendChild(bookDelete);
            booksContainer.appendChild(bookElementDiv);

            // Add event listener to the delete button
            bookDelete.addEventListener('click', function() {
                myLibrary.splice(index, 1); // Remove the book from the library array
                displayBooks(myLibrary); // Update the display
            });

            bookShow.addEventListener('click', function() {
                if (bookShow.textContent === 'Show Info') {
                    bookElement.innerHTML = book.info();
                    bookShow.textContent = 'Hide Info';
                } else {
                    bookElement.innerHTML = book.title;
                    bookShow.textContent = 'Show Info';
                }
            });


        });
    }

    // Add event listeners to the buttons
    showAllButton.addEventListener('click', function() {
        displayBooks(myLibrary);
    });

    showReadButton.addEventListener('click', function() {
        displayBooks(myLibrary.filter(function(book) {
            return book.haveRead === true;
        }));
    });

    showNotReadButton.addEventListener('click', function() {
        displayBooks(myLibrary.filter(function(book) {
            return book.haveRead === false;
        }));
    });

    // Display all books by default on load
    displayBooks(myLibrary);
});