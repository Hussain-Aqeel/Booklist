// Book Constructor
function Book(title, author, isbn) 
{
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


// UI Constructor
function UI() { }
// adding book method
UI.prototype.addBookToList = function (book) 
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

// Alert method
UI.prototype.showAlert = function (msg, className) 
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

// Delete book method
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// Clear fields method
UI.prototype.clearFields = function () 
{
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


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

  // Show alert
  ui.showAlert('Book removed!', 'success');
  e.preventDefault();
});
