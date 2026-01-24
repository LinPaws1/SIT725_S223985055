const addCards = (items) => {
  $("#card-section").empty();

  items.forEach(item => {
    let card =
      '<div class="col s4 center-align">' +
        '<div class="card medium">' +
          '<div class="card-image waves-effect waves-block waves-light">' +
            '<img class="activator" src="' + item.cover + '">' +
          '</div>' +
          '<div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' +
              item.bookName + '<i class="material-icons right">more_vert</i>' +
            '</span>' +
            '<p>' + item.author + ' • ' + item.genre + '</p>' +
            '<p>Year: ' + (item.year || "-") + ' | Rating: ' + (item.rating || "-") + '</p>' +
          '</div>' +
          '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' +
              item.bookName + '<i class="material-icons right">close</i>' +
            '</span>' +
            '<p>' + item.summary + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';

    $("#card-section").append(card);
  });
};

const getBooks = () => {
  $.get("/api/books", (response) => {
    if (response.statusCode === 200) {
      addCards(response.data);
    } else {
      console.log("GET error:", response);
    }
  });
};

const clearForm = () => {
  $("#bookName").val("");
  $("#author").val("");
  $("#genre").val("");
  $("#year").val("");
  $("#rating").val("");
  $("#cover").val("images/book1.jpg");
  $("#summary").val("");
  M.updateTextFields();
};

const submitForm = () => {
  let formData = {
    bookName: $("#bookName").val(),
    author: $("#author").val(),
    genre: $("#genre").val(),
    year: Number($("#year").val()),
    rating: Number($("#rating").val()),
    cover: $("#cover").val(),
    summary: $("#summary").val()
  };

  // validation
  if (!formData.bookName || !formData.author) {
    M.toast({ html: "Please enter Book Name and Author" });
    return;
  }

  $.post("/api/books", formData, (res) => {
    if (res.statusCode === 200) {
      M.toast({ html: "Book saved to database!" });
      getBooks();
      clearForm();
      $("#modal1").modal("close"); // close modal after save
    } else {
      M.toast({ html: "Save failed" });
      console.log("POST error:", res);
    }
  });
};

$(document).ready(function () {
  $(".materialboxed").materialbox();
  $(".modal").modal();

  $("#formSubmit").click(() => {
    submitForm();
  });

  getBooks();
});
