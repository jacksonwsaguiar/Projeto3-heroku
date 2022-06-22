var introductionModal = new bootstrap.Modal(
  document.getElementById("staticBackdrop"),
  {
    keyboard: false,
  }
);
window.addEventListener("load", function () {
  var display = sessionStorage.getItem("display");
  if (display == null) {
    this.document.getElementById("modalContent").style.background =
      linearGradients[0];
    introductionModal.show();
    sessionStorage.setItem("display", "false");
  }
});

function getData() {
  var data = JSON.parse(localStorage.getItem("session"));

  fetch("https://hurb-app.herokuapp.com/owners/" + data.id, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("profile-name").innerText = data.name;
    });
}

var myCarousel = document.querySelector("#introductionCarousel");
var carousel = new bootstrap.Carousel(myCarousel);
var carouselLenth =
  document.getElementsByClassName("introduction-modal").length;
var index = 0;
var linearGradients = [
  "linear-gradient(90deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
  "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(90deg, #f093fb 0%, #f5576c 100%)",
];

function nextSlider() {
  if (index < carouselLenth - 1) {
    carousel.next();
    index++;
    document.getElementById("modalContent").style.background =
      linearGradients[index];
  } else {
    introductionModal.hide();
  }
}

async function getDataTable() {
  const hostname = "https://hurb-app.herokuapp.com";

  const res = await fetch(hostname + "/orders");
  const data = await res.json();
  const orders = await data.data;

  for (let i = 0; i < orders.length; i++) {
    let tr = document.createElement("tr");

    let td_category = document.createElement("td");
    td_category.innerHTML = orders[i]["category"];

    let td_data = document.createElement("td");
    td_data.innerHTML = orders[i]["created_at"].split(" ")[0];

    let td_amount = document.createElement("td");
    td_amount.innerHTML = `R$ ${orders[i]["requested_amount"]}`;

    let td_totalamount = document.createElement("td");
    if (orders[i]["category"] === "D2") {
      td_totalamount.innerHTML = `R$ ${orders[i]["requested_amount"] * 0.88}`;
    } else if (orders[i]["category"] === "D7") {
      td_totalamount.innerHTML = `R$ ${orders[i]["requested_amount"] * 0.91}`;
    } else {
      td_totalamount.innerHTML = `R$ ${orders[i]["requested_amount"] * 0.94}`;
    }

    tr.appendChild(td_category);
    tr.appendChild(td_data);
    tr.appendChild(td_amount);
    tr.appendChild(td_totalamount);
    document.querySelector(".custom-table").appendChild(tr);
  }
}

async function getDataResponsiveTable() {
  const hostname = "https://hurb-app.herokuapp.com";

  const res = await fetch(hostname + "/orders");
  const data = await res.json();
  const orders = await data.data;

  // criar um tbdoy para cada elemento em orders
  for (let i = 0; i < orders.length; i++) {
    let tbody = document.createElement("tbody");

    let tr_category = document.createElement("tr");
    let th_category = document.createElement("th");
    th_category.innerHTML = "Tipo";
    let td_category = document.createElement("td");
    td_category.innerHTML = orders[i].category;
    tr_category.appendChild(th_category);
    tr_category.appendChild(td_category);

    let tr_created_at = document.createElement("tr");
    let th_created_at = document.createElement("th");
    th_created_at.innerHTML = "Data";
    let td_created_at = document.createElement("td");
    td_created_at.innerHTML = orders[i]["created_at"].split(" ")[0];
    tr_created_at.appendChild(th_created_at);
    tr_created_at.appendChild(td_created_at);

    let tr_requested_amount = document.createElement("tr");
    let th_requested_amount = document.createElement("th");
    th_requested_amount.innerHTML = "Valor solicitado";
    let td_requested_amount = document.createElement("td");
    td_requested_amount.innerHTML = `R$ ${orders[i]["requested_amount"]}`;
    tr_requested_amount.appendChild(th_requested_amount);
    tr_requested_amount.appendChild(td_requested_amount);

    let tr_totalamount = document.createElement("tr");
    let th_totalamount = document.createElement("th");
    th_totalamount.innerHTML = "Valor total";

    let td_totalamount = document.createElement("td");
    if (orders[i]["category"] === "D2") {
      td_totalamount.innerHTML = `R$ ${orders[i]["requested_amount"] * 0.88}`;
    } else if (orders[i]["category"] === "D7") {
      td_totalamount.innerHTML = `R$ ${orders[i]["requested_amount"] * 0.91}`;
    } else {
      td_totalamount.innerHTML = `R$ ${orders[i]["requested_amount"] * 0.94}`;
    }
    tr_totalamount.appendChild(th_totalamount);
    tr_totalamount.appendChild(td_totalamount);

    tbody.appendChild(tr_category);
    tbody.appendChild(tr_created_at);
    tbody.appendChild(tr_requested_amount);
    tbody.appendChild(tr_totalamount);

    document.querySelector(".responsive-table").appendChild(tbody);
  }
}

async function getDataHotels() {
  const hostname = "https://hurb-app.herokuapp.com";

  const res = await fetch(hostname + "/hotels");
  const data = await res.json();
  const hotels = await data.data;

  let ownerId = 1;

  for (let i = 0; i < hotels.length; i++) {
    if (hotels[i].owner_id === ownerId) {
      let div = document.createElement("div");
      div.className = "item";

      let divPhoto = document.createElement("div");

      let hotelName = document.createElement("h4");
      hotelName.innerHTML = hotels[i].name;

      div.appendChild(divPhoto);
      div.appendChild(hotelName);

      document.querySelector(".hotels-list").appendChild(div);
    }
  }
}

// consumo de API
async function getBudgetHotels() {
  const hostname = "https://hurb-app.herokuapp.com";

  await fetch(hostname + "/hotels")
    .then((response) => response.json())
    .then(
      (data) =>
        (saldo.textContent = "R$ " + data.details.bugetTotal.totalBudget)
    );
}

async function reserva1() {
  const hostname = "https://hurb-app.herokuapp.com";

  await fetch(hostname + "/orders")
    .then((res) => res.json())
    .then((response) => {
      const orders = response.data;

      document.querySelector("#reserva1").innerHTML = orders[0]["created_at"];
    });
}

async function reserva2() {
  const hostname = "https://hurb-app.herokuapp.com";

  await fetch(hostname + "/orders")
    .then((res) => res.json())
    .then((response) => {
      const orders = response.data;

      document.querySelector("#reserva2").innerHTML = orders[1]["created_at"];
    });
}
async function reserva3() {
  const hostname = "https://hurb-app.herokuapp.com";

  await fetch(hostname + "/orders")
    .then((res) => res.json())
    .then((response) => {
      const orders = response.data;

      document.querySelector("#reserva3").innerHTML = orders[2]["created_at"];
    });
}
async function reserva4() {
  const hostname = "https://hurb-app.herokuapp.com";

  await fetch(hostname + "/orders")
    .then((res) => res.json())
    .then((response) => {
      const orders = response.data;

      document.querySelector("#reserva4").innerHTML = orders[3]["created_at"];
    });
}
