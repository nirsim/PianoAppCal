
/*New book constrator*/
function Book(slots) {
    this.student = slots.student;
    this.title = slots.title;
    this.year = slots.year;
  };

/*Representing the collection of all Book instances*/
  Book.instances = {}; 

/*Loading all Book instances*/
  

  /*Converting each row to an object*/
  Book.convertRow2Obj = function (bookRow) {
    var book = new Book(bookRow);
    return book;
  };

  Book.loadAll = function () {
    var i=0, key="", keys=[], bookTableString="", bookTable={};  
    try {
      if (localStorage["bookTable"]) {
        bookTableString = localStorage["bookTable"];
      }
    } catch (e) {
      alert("Error when reading from Local Storage\n" + e);
    }
    if (bookTableString) {
      bookTable = JSON.parse(bookTableString);
      keys = Object.keys(bookTable);
      /*console.warn(keys.length +" books loaded.");*/
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        Book.instances[key] = Book.convertRow2Obj(bookTable[key]);
      }
    }
  };


  /*Saving all Book instances*/

  Book.saveAll = function () {
    var bookTableString="", error=false,
        nmrOfBooks = Object.keys(Book.instances).length;  
    try {
      bookTableString = JSON.stringify(Book.instances);
      localStorage["bookTable"] = bookTableString;
    } catch (e) {
      alert("Error when writing to Local Storage\n" + e);
      error = true;
    }
    if (!error) console.log(nmrOfBooks + " books saved.");
  };

/*4. Creating a new Book */
  Book.add = function (slots) {
    var book = new Book(slots);
    Book.instances[slots.student] = book;
    console.log("Book " + slots.student + " created!");
  };

/*5. Updating an existing Book*/

  Book.update = function (slots) {
    var book = Book.instances[slots.student];
    var year = parseInt( slots.year);
    if (book.title !== slots.title) {book.title = slots.title;}
    if (book.year !== year) { book.year = year;}
    console.log("Book " + slots.student + " modified!");
  };


  /*6. Deleting a Book*/

  Book.destroy = function (student) {
    if (Book.instances[student]) {
      if (confirm("Do you really want to delete book?")) {
     // console.log("Book " + student + " deleted");
      delete Book.instances[student];
    }
    } else {
      console.log("There is no book with student " + student + " in the database!");
    }
  };


  /*7. Creating test data using the Book constrator*/

  Book.createTestData = function () {
    Book.instances["006251587X"] = new Book({student:"006251587X", title:"Weaving the Web", year:2000});
    Book.instances["0465026567"] = new Book({student:"0465026567", title:"Godel, Escher, Bach", year:1999});
    Book.instances["0465030793"] = new Book({student:"0465030793", title:"I Am A Strange Loop", year:2008});
    Book.saveAll();
  };

  /*8. Clearing all data*/

  Book.clearData = function () {
    if (confirm("Do you really want to delete all book data?")) {
      localStorage["bookTable"] = "{}";
    }
  };


