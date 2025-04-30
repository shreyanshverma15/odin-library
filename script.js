const myLibrary = [];
const table_body = document.querySelector("tbody");
const show_dialog_btn = document.querySelector("#add_book_btn");
const dialog = document.querySelector("dialog");
const dialog_btn = document.querySelector("#dialog_btn");

function Book(id, title, author, pages, isRead) {
    if (!new.target) {
      throw Error("You must use the 'new' operator to call the constructor");
    }
    
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function() {
        if(isRead) return "The " + title + " by " + author + " ," + pages + " pages, not read yet.";    
        else return "The " + title + " by " + author + " ," + pages + " pages, is read.";    
    };
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(crypto.randomUUID(), title, author, pages, isRead);
    myLibrary.push(newBook);
}

function removeBookFromLibrary(id)
{
  let index;
  for(let i = 0; i < myLibrary.length; i++)
  {
    if(myLibrary[i].id == id)
    {
      index = i;
      break;
    }
  }

  myLibrary.splice(index, 1);
}

function changeReadStatus(id)
{
  let index;
  for(let i = 0; i < myLibrary.length; i++)
  {
    if(myLibrary[i].id == id)
    {
      index = i;
      break;
    }
  }

  if(myLibrary[index].isRead == true) myLibrary[index].isRead = false;
  else myLibrary[index].isRead = true;

  displayBooks();
}

function displayBooks() {
    table_body.innerHTML = "";
    for(const book of myLibrary)
    { 
      const table_row = document.createElement("tr");
      const id_data = document.createElement("td");
      const title_data = document.createElement("td");
      const author_data = document.createElement("td");
      const pages_data = document.createElement("td");
      const isRead_data_btn = document.createElement("button");
      const delete_book_btn = document.createElement("button");
      delete_book_btn.textContent = "delete";
      delete_book_btn.dataset.id = book.id;
      isRead_data_btn.dataset.id = book.id;

      id_data.textContent = book.id;
      title_data.textContent = book.title;
      author_data.textContent = book.author;
      pages_data.textContent = book.pages;
      if(book.isRead) isRead_data_btn.textContent = "unread";
      else isRead_data_btn.textContent = "read";
      
      delete_book_btn.addEventListener("click", function(e) {
        removeBookFromLibrary(e.target.dataset.id);
        displayBooks();
      })

      isRead_data_btn.addEventListener("click", function(e) {
        if(isRead_data_btn.textContent == "unread") isRead_data_btn.textContent = "read"; 
        else isRead_data_btn.textContent = "unread";

        changeReadStatus(e.target.dataset.id);
      })

      table_row.appendChild(id_data);
      table_row.appendChild(title_data);
      table_row.appendChild(author_data);
      table_row.appendChild(pages_data);
      table_row.appendChild(isRead_data_btn);
      table_row.appendChild(delete_book_btn);

      table_body.appendChild(table_row);        
    }
}

dialog_btn.addEventListener("click", function(e){
  const title = e.target.form.querySelector("#title").value;
  const author = e.target.form.querySelector("#author").value;
  const pages = parseInt(e.target.form.querySelector("#pages").value);
  const isRead = e.target.form.querySelector("#isRead").checked;

  addBookToLibrary(title, author, pages, isRead);
  displayBooks();
})

show_dialog_btn.addEventListener("click", function(){
  dialog.showModal();
})

addBookToLibrary("a", "b", 2, true);
addBookToLibrary("c", "d", 3, false);

displayBooks();