var hotelId;
var hotelBudget;
// Getting total budget from database
function getBudget(totalBudget) {
  const url = "https://hurb-app.herokuapp.com/hotels";

  fetch(url)
    .then((response) => response.json())
    .then(
      (data) =>
        (budget.textContent =
          "Valor disponível para solicitação: R$ " + data.data[hotelId].budget)
    )
    .catch((error) => console.error(error));

  D2(value);

  const divTaxes = document.querySelector("#taxes");

  // Creating a new order only in the last modal
  if (divTaxes.classList.contains("active")) {
    createOrder(newOrder);
    $("#exampleModal").modal("hide");
  }
}

// Getting the budget asked from the user
function getValue(budget) {
  const url = "https://hurb-app.herokuapp.com/hotels";

  fetch(url)
    .then((response) => response.json())
    .then((data) => (hotelBudget = data.data[hotelId].budget))
    .catch((error) => console.error(error));

  var budget = parseInt(document.querySelector("#valor").value);
  // Alert if budget asked is greater than the limit
  if (budget > hotelBudget) {
    window.alert("Saldo Indisponível");
    $("#carouselExampleControls").carousel(1);
  } else {
    return budget;
  }
}

//Calcultates the value with 12% of taxes
function D2(value) {
  var value = getValue(budget) * 0.88;
  document.querySelector("#value").textContent = `R$ ${value},00`;
  return value;
}

//Calcultates the value with 9% of taxes
function D7(value) {
  var value = getValue(budget) * 0.91;
  document.querySelector("#value").textContent = `R$ ${value},00`;
  return value;
}

//Calcultates the value with 6% of taxes
function D15(value) {
  var value = getValue(budget) * 0.94;
  document.querySelector("#value").textContent = `R$ ${value},00`;
  return value;
}

// Creating the variable to store the body of the requisition of new order
var newOrder = {
  request_code: "",
  category: "",
  requested_amount: "",
  status: "",
  hotel_id: "",
};

// POST requisiton to create a new order in the database according to the category (D2, D7, D15)
function createOrder(newOrder) {
  const url = "https://hurb-app.herokuapp.com/orders";

  var D2Checked = document.querySelector("#btnradio1");
  var D7Checked = document.querySelector("#btnradio2");
  var D15Checked = document.querySelector("#btnradio3");

  const requestCode = Math.floor(1000 + Math.random() * 9000);

  var amount = getValue(budget);

  if (D2Checked.checked == true) {
    newOrder = {
      request_code: "#" + requestCode,
      category: "D2",
      requested_amount: amount,
      status: "processing",
      hotel_id: hotelId,
    };
  } else if (D7Checked.checked == true) {
    newOrder = {
      request_code: "#" + requestCode,
      category: "D7",
      requested_amount: amount,
      status: "processing",
      hotel_id: hotelId,
    };
  } else if (D15Checked.checked == true) {
    newOrder = {
      request_code: requestCode,
      category: "D15",
      requested_amount: "#" + amount,
      status: "processing",
      hotel_id: hotelId,
    };
  }

  fetch(url, {
    method: "POST",
    body: JSON.stringify(newOrder),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then(window.alert("Pedido Salvo"))
    .catch((error) => console.error(error));
}

// Creating the list of hotels to be selected
function getHotels() {
  const url = "https://hurb-app.herokuapp.com" + "/hotels";

  var text = "";

  fetch(url)
    .then((response) => response.json())
    .then((data) =>
      data.data.forEach((element) => {
        // Creating elements in the HTML file
        if (element.owner_id === 1) {
          text += `<div id="hotel ${element.id}" class="item" onclick="getHotelId(this.id)">`;
          text += "<div></div>";
          text += '<h4 id="hotels">' + element.name + "</h4>";
          text += "</div>";
          document.querySelector(".list-hotels").innerHTML = text;
        }
      })
    )
    .catch((error) => console.error(error));
}

// Getting hotel_id and changing background color of selected hotel
function getHotelId(id) {
  hotelId = id.split(" ")[1];
  var hotelsList = $(".item");
  hotelsList.click(function () {
    hotelsList.css("background-color", "rgba(127, 130, 132, 0.1)");
    $(this).css("background-color", "#3468fc");
  });
}
