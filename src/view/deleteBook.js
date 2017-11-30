

pl.view.deleteBook = {
    setupUserInterface: function () {
      var deleteButton = document.forms['Book'].commit;
      var selectEl = document.forms['Book'].selectBook;
      var i=0, key="", keys=[], book=null, optionEl=null;
      // load all book objects
      Book.loadAll();
      keys = Object.keys(Book.instances);
      // populate the selection list with books
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        book = Book.instances[key];
        optionEl = document.createElement("option");
        optionEl.text = book.title;
        optionEl.value = book.student;
        selectEl.add(optionEl, null);
      }
      deleteButton.addEventListener("click",pl.view.deleteBook.handleDeleteButtonClickEvent);
      window.addEventListener("beforeunload", function () {
          Book.saveAll(); 
      },{passive: true, capture: true});
    },
    handleDeleteButtonClickEvent: function () {
      var selectEl = document.forms['Book'].selectBook;
      var student = selectEl.value;
      if (student) {
        Book.destroy(student);
        selectEl.remove(selectEl.selectedIndex);
      }
    }
  };