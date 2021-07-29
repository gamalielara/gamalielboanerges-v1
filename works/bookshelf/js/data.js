const STORAGE_KEY = "BOOKSHELF_APPS";

let theBooks = [];

// cek apakah browser support web storage atau tdk
function isStorageExist() {
  if (typeof Storage == undefined) {
    alert("Your browser does not support web storage!");
    return false;
  } else {
    return true;
  }
}

function saveBooksData() {
  const parsed = JSON.stringify(theBooks);
  localStorage.setItem(STORAGE_KEY, parsed);
}

function loadBooksDataFromStorage() {
  const loadedBooksData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(loadedBooksData);
  if (data !== null) {
    theBooks = data;
  }

  document.dispatchEvent(new Event("onbooksdataloaded"));
}

function updateBooksData() {
  if (isStorageExist()) {
    saveBooksData();
  }
}

function bookToObject(title, author, year, bookCover = null, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    bookCover,
    isCompleted,
  };
}

function findBook(bookId) {
  for (const book of theBooks) {
    if (book.id === bookId) {
      return book;
    }
  }

  return null;
}

function findBookIndex(bookId) {
  i = 0;
  for (const books of theBooks) {
    if (bookId == books.id) {
      return i;
    }
    i++;
  }
  return -1;
}

function refreshBooksData() {
  const incompletedBooks = document.getElementById(INCOMPLETED_BOOK_CONTAINER_IDNAME);
  let completedBooks = document.getElementById(COMPLETED_BOOK_CONTAINER_IDNAME);

  for (const book of theBooks) {
    const newBook = makeBookContainer(book.title, book.author, book.year, book.bookCover, book.isCompleted);
    newBook[BOOKID] = book.id;

    if (book.isCompleted) {
      completedBooks.append(newBook);
    } else {
      incompletedBooks.append(newBook);
    }
  }
}
