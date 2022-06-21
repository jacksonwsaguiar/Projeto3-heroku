var hotelId;

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

async function getDataTableAll() {

  const res = await fetch("http://localhost:3333/orders")
  const data = await res.json()
  const orders = await data.data

  console.log(orders)

  for(let i=0; i < orders.length; i++) {
    let tr = document.createElement("tr")
    
    let td_category = document.createElement("td")
    td_category.innerHTML = orders[i]["category"]
    
    let td_data = document.createElement("td")
    td_data.innerHTML = orders[i]["created_at"].split(" ")[0]

    let td_amount = document.createElement("td")
    td_amount.innerHTML = `R$ ${orders[i]["requested_amount"]}`

    let td_totalamount = document.createElement("td")
    if(orders[i]["category"] === "D2") {
      td_totalamount.innerHTML = `R$ ${orders[i]["requested_amount"] * 0.88}`
    } else if(orders[i]["category"] === "D7") {
      td_totalamount.innerHTML = `R$ ${orders[i]["requested_amount"] * 0.91}`
    } else {
      td_totalamount.innerHTML = `R$ ${orders[i]["requested_amount"] * 0.94}`
    }
    
    
    tr.appendChild(td_category)
    tr.appendChild(td_data)
    tr.appendChild(td_amount)
    tr.appendChild(td_totalamount)
    document.querySelector(".custom-table").appendChild(tr)
  }
}

async function getDataTable() {
  document.querySelector(".custom-table").innerHTML = '<tr><th>Tipo</th><th>Data</th><th>Valor solicitado</th><th>Valor total</th></tr>';

  const res = await fetch("http://localhost:3333/orders")
  const data = await res.json()
  const orders = await data.data

  var ordersHotel = [];

  console.log(orders)

  for(let i=0; i < orders.length; i++) {
    if (orders[i]["hotel_id"] == hotelId) {
      ordersHotel.push(orders[i]);
    }
  }

  for(let i=0; i < ordersHotel.length; i++) {
    let tr = document.createElement("tr")
    
    let td_category = document.createElement("td")
    td_category.innerHTML = ordersHotel[i]["category"]
    
    let td_data = document.createElement("td")
    td_data.innerHTML = ordersHotel[i]["created_at"].split(" ")[0]

    let td_amount = document.createElement("td")
    td_amount.innerHTML = `R$ ${ordersHotel[i]["requested_amount"]}`

    let td_totalamount = document.createElement("td")
    if(ordersHotel[i]["category"] === "D2") {
      td_totalamount.innerHTML = `R$ ${ordersHotel[i]["requested_amount"] * 0.88}`
    } else if(ordersHotel[i]["category"] === "D7") {
      td_totalamount.innerHTML = `R$ ${ordersHotel[i]["requested_amount"] * 0.91}`
    } else {
      td_totalamount.innerHTML = `R$ ${ordersHotel[i]["requested_amount"] * 0.94}`
    }
    
    
    tr.appendChild(td_category)
    tr.appendChild(td_data)
    tr.appendChild(td_amount)
    tr.appendChild(td_totalamount)
    document.querySelector(".custom-table").appendChild(tr)
    
  }
  ordersHotel = [];
}


async function getDataResponsiveTable() {
  const res = await fetch("http://localhost:3333/orders")
  const data = await res.json()
  const orders = await data.data

  console.log('rodando')
  console.log(orders)

  // criar um tbdoy para cada elemento em orders
  for(let i = 0; i < orders.length; i++) {
    let tbody = document.createElement("tbody")
    
    let tr_category = document.createElement("tr")
    let th_category = document.createElement("th")
    th_category.innerHTML = "Tipo"
    let td_category = document.createElement("td")
    td_category.innerHTML = orders[i].category
    tr_category.appendChild(th_category)
    tr_category.appendChild(td_category)

    let tr_created_at = document.createElement("tr")
    let th_created_at = document.createElement("th")
    th_created_at.innerHTML = "Data"
    let td_created_at = document.createElement("td")
    td_created_at.innerHTML = orders[i]["created_at"].split(" ")[0]
    tr_created_at.appendChild(th_created_at)
    tr_created_at.appendChild(td_created_at)

    let tr_requested_amount = document.createElement("tr")
    let th_requested_amount = document.createElement("th")
    th_requested_amount.innerHTML = "Valor solicitado"
    let td_requested_amount = document.createElement("td")
    td_requested_amount.innerHTML = `R$ ${orders[i]["requested_amount"]}`
    tr_requested_amount.appendChild(th_requested_amount)
    tr_requested_amount.appendChild(td_requested_amount)

    let tr_totalamount = document.createElement("tr")
    let th_totalamount = document.createElement("th")
    th_totalamount.innerHTML = "Valor total"

    let td_totalamount = document.createElement("td")
    if(orders[i]["category"] === "D2") {
      td_totalamount.innerHTML = `R$ ${orders[i]["requested_amount"] * 0.88}`
    } else if(orders[i]["category"] === "D7") {
      td_totalamount.innerHTML = `R$ ${orders[i]["requested_amount"] * 0.91}`
    } else {
      td_totalamount.innerHTML = `R$ ${orders[i]["requested_amount"] * 0.94}`
    }
    tr_totalamount.appendChild(th_totalamount)
    tr_totalamount.appendChild(td_totalamount)

    

    tbody.appendChild(tr_category)
    tbody.appendChild(tr_created_at)
    tbody.appendChild(tr_requested_amount)
    tbody.appendChild(tr_totalamount)

    document.querySelector(".responsive-table").appendChild(tbody)
  }
}

{/* <tbody>
              <tr>
                <th>Tipo</th>
                <td>D2</td>
              </tr>
              <tr>
                <th>Data</th>
                <td>XX/XX/XXXX</td>
              </tr>
              <tr>
                <th>Valor solicitado</th>
                <td>R$ XXXXX</td>
              </tr>
              <tr>
                <th>Valor total</th>
                <td>R$ XXXXX</td>
              </tr>
            </tbody> */}


async function getDataHotels() {
  const res = await fetch("http://localhost:3333/hotels")
  const data = await res.json()
  const hotels = await data.data

  let ownerId = 1
  var text = '';

  for(let i = 0; i < hotels.length; i++) {
    if(hotels[i].owner_id === ownerId) {
      text += `<div id="hotel ${hotels[i].id}" class="item" onclick="getHotelId(this.id); getDataTable(); getBudgetHotels(); getLastBooks()">`
        text += '<div></div>'
        text += '<h4 id="hotels">' + hotels[i].name + '</h4>'
      text += '</div>'
      document.querySelector(".hotels-list").innerHTML = text;

      //let div = document.createElement("div")
      //div.className = "item"
  
      //let divPhoto = document.createElement("div")
  
      //let hotelName = document.createElement("h4")
      //hotelName.innerHTML = hotels[i].name
  
      //div.appendChild(divPhoto)
      //div.appendChild(hotelName)
  
      //document.querySelector(".hotels-list").appendChild(div)
    }
  }
}

// Getting hotel_id and changing background color of selected hotel
function getHotelId(id) {
  hotelId = id.split(' ')[1];
  var hotelsList = $('.item');
  hotelsList.click(function() {
    hotelsList.css('background-color', 'rgba(127, 130, 132, 0.1)');
    $(this).css('background-color', '#3468fc');
});
} 

// consumo de API 
async function getBudgetHotels() {
  await fetch("http://localhost:3333/hotels").then(response => response.json())
  .then(data => saldo.textContent = 'R$ ' + data.data[hotelId].budget)

}

async function getBudgetHotelsAll() {
  await fetch("http://localhost:3333/hotels").then(response => response.json())
  .then(data => saldo.textContent = 'R$ ' + data.details.bugetTotal.totalBudget)

}

async function getLastBooks() {
  const url = 'http://localhost:3333/books/lasts/' + hotelId
  var text = '';
  await fetch(url)
  .then(response => response.json())
  .then(data => data.forEach(element => {
    text += '<div class="item"></div>'
      text += '<div></div>'
      text += '<h6>' + element.ended + ' - R$' + element.value +  ',00</h6>'
    
      document.querySelector(".list").innerHTML = text;
  }));
}

module.exports = {hotelId};
