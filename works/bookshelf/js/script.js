document.addEventListener("DOMContentLoaded", function () {
  // saat elemen DOM sudah terload secara sempurna
  const submitButton = document.getElementById("bookSubmit");
  const isCompetedCheck = document.getElementById("inputBookIsComplete");
  const isReadText = document.getElementById("isReadText");
  const searchButton = document.getElementById("searchSubmit");
  const resetSearchButton = document.getElementById("resetSubmit");

  isCompetedCheck.addEventListener("click", function () {
    if (isCompetedCheck.checked) {
      isReadText.innerText = "SELESAI DIBACA";
    } else {
      isReadText.innerText = "BELUM SELESAI DIBACA";
    }
  });

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    addBook();
  });

  searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    const searchInput = document.getElementById("searchBookInput").value;

    // to check if the radio button is checked or not
    const searchTitle = document.getElementById("search-title").checked;
    const searchAuthor = document.getElementById("search-author").checked;
    const searchYear = document.getElementById("search-year").checked;

    if (searchInput.value !== "" && (searchTitle || searchAuthor || searchYear)) {
      if (searchTitle) {
        findBookTitle();
      } else if (searchAuthor) {
        findBookAuthor();
      } else if (searchYear) {
        findBookYear();
      }
    } else {
      alert("Silakan pilih kategori yang ingin dicari! Huruf kapital/kecil tidak mempengaruhi hasil pencarian.");
    }
  });

  resetSearchButton.addEventListener("click", function (event) {
    event.preventDefault();
    bookItems = document.querySelectorAll(".book_item");

    for (const item of bookItems) {
      item.style.display = "flex";
    }
  });

  if (isStorageExist()) {
    loadBooksDataFromStorage();
  }
});

document.addEventListener("onbooksdataloaded", () => {
  refreshBooksData();
});
