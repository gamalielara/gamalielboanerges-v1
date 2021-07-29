const COMPLETED_BOOK_CONTAINER_IDNAME = "completeBookshelfList";
const INCOMPLETED_BOOK_CONTAINER_IDNAME = "incompleteBookshelfList";
const BOOKID = "bookItem";

// membuat container yang berisi buku
function makeBookContainer(title, author, year, imageCover, isCompleted) {
  // informasi tentang buku
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;

  const bookAuthor = document.createElement("h4");
  bookAuthor.innerText = author;

  const bookYear = document.createElement("p");
  bookYear.innerText = year;

  const bookCover = document.createElement("img");
  bookCover.classList.add("book-cover");
  bookCover.setAttribute("src", imageCover);

  // membuat <article> sebagai tempat menyimpan list
  const bookContainer = document.createElement("article");
  bookContainer.classList.add("book_item");

  //membuat <div class='inner-div'> yang berisi data buku
  const innerChildDiv = document.createElement("div");
  innerChildDiv.classList.add("inner-div");
  innerChildDiv.append(bookTitle, bookAuthor, bookYear);

  //membuat <div class='action'> yang berisi 2 tombol
  const readButton = makeReadButton(isCompleted);
  const clearBookButton = makeClearButton();
  const actionDiv = document.createElement("div");
  actionDiv.classList.add("action");

  //append div.action ke dalam div.inner-div
  actionDiv.append(readButton, clearBookButton);
  innerChildDiv.appendChild(actionDiv);

  // menambahkan gambar cover buku
  if (imageCover !== "") {
    bookContainer.append(innerChildDiv, bookCover);
  } else {
    bookContainer.append(innerChildDiv);
  }

  return bookContainer;
}

function makeReadButton(isCompleted) {
  const theButton = document.createElement("button");
  theButton.classList.add("green");

  if (isCompleted) {
    theButton.innerText = "Belum Selesai Dibaca";
    theButton.setAttribute("id", "completedBook");
    theButton.addEventListener("click", function (event) {
      addBooktoIncompleted(event.target.parentElement);
    });
  } else {
    theButton.innerText = "Selesai Dibaca";
    theButton.setAttribute("id", "incompletedBook");
    theButton.addEventListener("click", function (event) {
      addBooktoCompleted(event.target.parentElement);
    });
  }

  return theButton;
}

function makeClearButton() {
  const clearButton = document.createElement("button");
  clearButton.classList.add("red");
  clearButton.setAttribute("id", "clearButton");
  clearButton.innerText = "Hapus buku";
  clearButton.addEventListener("click", function (event) {
    clearBookContainer(event.target.parentElement);
  });

  return clearButton;
}

function addBooktoCompleted(bookButton) {
  const bookContainer = bookButton.parentElement.parentElement;
  const bookTitle = bookContainer.querySelector(".book_item > .inner-div > h3").innerText;
  const bookAuthor = bookContainer.querySelector(".book_item > .inner-div > h4").innerText;
  const bookYear = bookContainer.querySelector(".book_item > .inner-div > p").innerText;
  const imageCover = bookContainer.querySelector(".book_item > img").getAttribute("src");

  const newBookContainer = makeBookContainer(bookTitle, bookAuthor, bookYear, imageCover, true);

  const book = findBook(bookContainer[BOOKID]);
  book.isCompleted = true;
  newBookContainer[BOOKID] = book.id;

  const CompletedBooks = document.getElementById(COMPLETED_BOOK_CONTAINER_IDNAME);
  CompletedBooks.append(newBookContainer);

  bookContainer.remove();

  updateBooksData();
}

function addBooktoIncompleted(bookButton) {
  const InCompletedBooks = document.getElementById(INCOMPLETED_BOOK_CONTAINER_IDNAME);

  const bookContainer = bookButton.parentElement.parentElement;
  const bookTitle = bookContainer.querySelector(".book_item > .inner-div > h3").innerText;
  const bookAuthor = bookContainer.querySelector(".book_item > .inner-div > h4").innerText;
  const bookYear = bookContainer.querySelector(".book_item > .inner-div > p").innerText;
  const imageCover = bookContainer.querySelector(".book_item > img").getAttribute("src");

  const newBookContainer = makeBookContainer(bookTitle, bookAuthor, bookYear, imageCover, false);

  const book = findBook(bookContainer[BOOKID]);
  book.isCompleted = false;
  newBookContainer[BOOKID] = book.id;

  InCompletedBooks.append(newBookContainer);
  bookContainer.remove();

  updateBooksData();
}

// membuat book container dari form
function addBook() {
  const completedBook = document.getElementById(COMPLETED_BOOK_CONTAINER_IDNAME);
  const incompletedBook = document.getElementById(INCOMPLETED_BOOK_CONTAINER_IDNAME);

  const theBookTitle = document.getElementById("inputBookTitle").value;
  const theBookAuthor = document.getElementById("inputBookAuthor").value;
  const theBookYear = document.getElementById("inputBookYear").value;
  const isCompleted = document.getElementById("inputBookIsComplete").checked;
  const imageCover = document.getElementById("cover-img").value;

  const newBookList = makeBookContainer(theBookTitle, theBookAuthor, theBookYear, imageCover, isCompleted);

  const bookObject = bookToObject(theBookTitle, theBookAuthor, theBookYear, imageCover, isCompleted);
  newBookList[BOOKID] = bookObject.id;
  theBooks.push(bookObject);

  if (theBookTitle !== "" && theBookAuthor !== "" && theBookYear !== "") {
    if (isCompleted) {
      completedBook.append(newBookList);
    } else {
      incompletedBook.append(newBookList);
    }
  } else {
    alert("Oops, Anda harus mengisi Form yang diwajibkan!");
  }

  updateBooksData();
}

// menghapus sebuah book container
function clearBookContainer(bookButton) {
  const bookContainer = bookButton.parentElement.parentElement;
  const bookIndex = findBookIndex(bookContainer[BOOKID]);
  const bookTitle = bookButton.parentElement.childNodes[0];
  alert("Buku dengan judul " + bookTitle.innerText.toUpperCase() + " berhasil dihapus!");

  theBooks.splice(bookIndex, 1);
  bookContainer.remove();
  updateBooksData();
}

// mencari informasi buku

function findBookTitle() {
  const searchInput = document.getElementById("searchBookInput").value;
  const bookTitles = document.querySelectorAll(".book_item > .inner-div > h3");

  for (const title of bookTitles) {
    const bookTitle = title.innerText.toLowerCase();
    const bookItem = title.parentElement.parentElement;
    bookItem.style.display = "none";
    if (bookTitle === searchInput.toLowerCase()) {
      bookItem.style.display = "flex";
    }
  }
}

function findBookAuthor() {
  const searchInput = document.getElementById("searchBookInput").value;
  const bookAuthors = document.querySelectorAll(".book_item > .inner-div > h4");

  for (const author of bookAuthors) {
    const bookAuthor = author.innerText.toLowerCase();
    const bookItem = author.parentElement.parentElement;
    bookItem.style.display = "none";

    if (bookAuthor === searchInput.toLowerCase()) {
      bookItem.style.display = "flex";
    }
  }
}

function findBookYear() {
  const searchInput = document.getElementById("searchBookInput").value;
  const bookYears = document.querySelectorAll(".book_item > .inner-div > p");

  for (const year of bookYears) {
    const bookyear = year.innerText;
    const bookItem = year.parentElement.parentElement;
    bookItem.style.display = "none";

    if (bookyear === searchInput) {
      bookItem.style.display = "flex";
    }
  }
}
