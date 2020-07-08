// Book Class
class Book 
{
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class and all of the method in its proto
class UI 
{
  addBookToList(book) 
  {
    const list = document.getElementById('book-list');
    // create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `;
  
    list.appendChild(row);
  }

  showAlert(msg, className) 
  {
    // Create Div
    const div = document.createElement('div');
    div.className = `alert ${className}`;

    // Add text
    div.appendChild(document.createTextNode(msg));

    // Insert element
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Timeout after 3s
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);

  }

  deleteBook(target) 
  {
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() 
  {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local Storage class
class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI();

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book){
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }

}

// Dom Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks());

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e)
{
  // Get form values
  const title = document.getElementById ('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);

  // Declaring UI object
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === ''){
    // Error alert
    ui.showAlert('please fill in all fields', 'error');

  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to local storage
    Store.addBook(book);

    // show success
    ui.showAlert('Book added!', 'success');

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});


// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e)
{
  // Declaring UI object
  const ui = new UI();

  ui.deleteBook(e.target);

  // Remove from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show alert
  ui.showAlert('Book removed!', 'success');

  e.preventDefault();
});
