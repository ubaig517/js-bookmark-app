// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!siteName || !siteUrl){
    alert("Please fill in the form");
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  /*
    // Local Storage test
    localStorage.setItem('test', 'Hello world');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // test if bookmarks is null
  if (localStorage.getItem('bookmarks') === null) {
    // initialize array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    //Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmarks function
function deleteBookmark(url) {
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //Loop through bookmarks
  for(var i=0; i < bookmarks.length; i++) {
    if(bookmarks[i].url == url) {
      //Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // re-fetch bookmarks
  fetchBookmarks();
}

function fetchBookmarks() {
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  //Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  //build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="card bg-light">' +
                                  '<h3>' + name +
                                  ' <a class="btn btn-success" target="_blank" href="http://'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href"#">Delete</a> ' +
                                  '</h3>' +
                                  '</div>';
  }

}
