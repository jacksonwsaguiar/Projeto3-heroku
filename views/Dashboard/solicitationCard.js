var hotelId;
var hotelBudget;


// Getting total budget from database
function getBudget(totalBudget) {
  const url = "https://hurb-app.herokuapp.com/hotels";
  
    fetch(url)
    .then(response => response.json())
    .then(data => budget.textContent = 'Valor disponível para solicitação: R$ ' + data.data[hotelId].budget)
    .catch(error => console.error(error))

      document.querySelector("#books").hidden = true;
      document.querySelector(".books-list").hidden = true;  
  }

  // Getting the budget asked from the user
  function getValue(budget) {
    const url = "https://hurb-app.herokuapp.com/hotels";
  
    fetch(url)
    .then(response => response.json())
    .then(data => hotelBudget = data.data[hotelId].budget)
    .catch(error => console.error(error))

    var budget = parseInt(document.querySelector("#valor").value);
    // Alert if budget asked is greater than the limit
    if (budget > hotelBudget) {
      window.alert("Saldo Indisponível");
      $("#carouselExampleControls").carousel(0);
    }
    else {
      getBooks();
      return budget
    }
  }
  
  function saveOrder() {
    const divTaxes = document.querySelector("#taxes");
    // Creating a new order only in the last modal
    if (divTaxes.classList.contains('active')) {
      createOrder(newOrder);
      $("#exampleModal").modal('hide');
    }
  }
  
  //Calcultates the value with 12% of taxes
  function D2(value) {
      var value = getValue(budget) * 0.88;
      document.querySelector("#value").textContent = `R$ ${value},00`;
      document.querySelector("#date").innerHTML = 'Valor a receber dia 25/01/2023';
      return value
    }
  
    //Calcultates the value with 9% of taxes
  function D7(value) {
      var value = getValue(budget) * 0.91;
      document.querySelector("#value").textContent = `R$ ${value},00`;
      document.querySelector("#date").innerHTML = 'Valor a receber dia 30/01/2023';
      return value
    }
  
  //Calcultates the value with 6% of taxes
  function D15(value) {
      var value = getValue(budget) * 0.94;
      document.querySelector("#value").textContent = `R$ ${value},00`;
      document.querySelector("#date").innerHTML = 'Valor a receber dia 14/02/2023';
      return value
    }

    // Creating the variable to store the body of the requisition of new order
    var newOrder = {
      request_code: "",
      category: "",
      requested_amount: "",
      status: "",
      hotel_id: ""
    }

    // POST requisiton to create a new order in the database according to the category (D2, D7, D15)
    function createOrder(newOrder) {
      const url = "https://hurb-app.herokuapp.com/orders"

      var D2Checked = document.querySelector("#btnradio1");
      var D7Checked = document.querySelector("#btnradio2");
      var D15Checked = document.querySelector("#btnradio3");

      const requestCode = Math.floor(1000 + Math.random() * 9000)

      var amount = getValue(budget)
      console.log(amount)

      console.log(hotelId)

      if (D2Checked.checked == true) {
          newOrder = {
            request_code:'#' + requestCode,
            category: "D2",
            requested_amount: amount,
            status: "processing",
            hotel_id: hotelId
          }
      }

      else if (D7Checked.checked == true) {
          newOrder = {
            request_code:'#' + requestCode,
            category: "D7",
            requested_amount: amount,
            status: "processing",
            hotel_id: hotelId
          }
      }

      else if (D15Checked.checked == true) {
          newOrder = {
            request_code:'#' + requestCode,
            category: "D15",
            requested_amount: amount,
            status: "processing",
            hotel_id: hotelId
          }
      }
  
      fetch(url, {
        method: "POST",
        body: JSON.stringify(newOrder),
        headers : {
      "Content-type": "application/json; charset=UTF-8"
        }
      })  
        .then(response => response.json())
        .then(window.alert("Pedido Salvo"))
        .catch(error => console.error(error))
    }

  
  // Creating the list of hotels to be selected
  function getHotels() {
    if (hotelId == undefined) {
      window.alert("Selecione um Hotel");
    }
    else {
      document.querySelector("#solicitationValue").classList.add('active');
    }
    }


// Getting hotel_id and changing background color of selected hotel
function getHotelId(id) {
  hotelId = id.split(' ')[1];
  var hotelsList = $('.item');
  document.querySelector("#solicitation").setAttribute('data-bs-toggle', 'modal');
  document.querySelector("#solicitation").setAttribute('data-bs-target', '#exampleModal');
  hotelsList.click(function() {
  hotelsList.css('background-color', 'rgba(127, 130, 132, 0.1)');
  $(this).css('background-color', '#3468fc');
});
} 

function getBooks() {
  const url = "https://hurb-app.herokuapp.com/books/lasts/" + hotelId
  
    var bookValues = [];
  
    fetch(url)
    .then(response => response.json())
    .then(data => data.forEach(element => {
        bookValues.push(element.value)
      }))
      .catch(error => console.error(error))

      
      var budget = document.querySelector("#valor");
      var textBooks = '';
      var counter1 = 0;
      var counter2 = 0;
      var counter3 = 0;

    if (hotelId == 1) {
      counter1 = 1;
      counter2 = 1;
    }
    else if (hotelId == 2) {
      counter1 = 1;
      counter2 = 1;
      counter3 = 1;
    }
    else if (hotelId == 5) {
      counter1 = 1;
    }

      budget.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          budget = document.querySelector("#valor").value
          document.querySelector("#books").hidden = false;
          document.querySelector(".books-list").hidden = false;
          textBooks = ''
          books1 = Math.floor(budget / bookValues[0]);
          books2 = Math.floor(budget / bookValues[1]);
          books3 = Math.floor(budget / bookValues[2]);

          if (budget % bookValues[0] == 0 && counter1 == books1) {
            document.querySelector("#books").innerHTML = 'Equivalente a ' + books1 + ' reserva(s) de R$ ' + bookValues[0] + ',00'

            for (i = 0; i < books1; i++) {
              textBooks += '<div class="item">'
                textBooks += '<svg'
                  textBooks += 'xmlns="http://www.w3.org/2000/svg"'
                  textBooks += 'width="16"'
                  textBooks += 'height="16"'
                  textBooks += 'fill="currentColor"'
                  textBooks += 'class="bi bi-check-circle-fill"'
                  textBooks += 'viewBox="0 0 16 16"'
                textBooks += '>'
                  textBooks += '<path'
                    textBooks += 'd="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"'
                  textBooks += '/>'
                textBooks += '</svg>'
                textBooks += '<h6>Reserva 1</h6>'
              textBooks += '</div>'

              document.querySelector(".books-list").innerHTML = textBooks;
            }
          }

          else {
            if (budget % bookValues[1] == 0 && counter2 == books2) {
              document.querySelector("#books").innerHTML = 'Equivalente a ' + books2 + ' reserva(s) de R$ ' + bookValues[1] + ',00'
  
              for (i = 0; i < books2; i++) {
                textBooks += '<div class="item">'
                  textBooks += '<svg'
                    textBooks += 'xmlns="http://www.w3.org/2000/svg"'
                    textBooks += 'width="16"'
                    textBooks += 'height="16"'
                    textBooks += 'fill="currentColor"'
                    textBooks += 'class="bi bi-check-circle-fill"'
                    textBooks += 'viewBox="0 0 16 16"'
                  textBooks += '>'
                    textBooks += '<path'
                      textBooks += 'd="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"'
                    textBooks += '/>'
                  textBooks += '</svg>'
                  textBooks += '<h6>Reserva 2</h6>'
                textBooks += '</div>'
  
                document.querySelector(".books-list").innerHTML = textBooks;
              }
            }

            else {
              if (budget % bookValues[2] == 0 && counter3 == books3) {
                document.querySelector("#books").innerHTML = 'Equivalente a ' + books3 + ' reserva(s) de R$ ' + bookValues[1] + ',00'
    
                for (i = 0; i < books3; i++) {
                  textBooks += '<div class="item">'
                    textBooks += '<svg'
                      textBooks += 'xmlns="http://www.w3.org/2000/svg"'
                      textBooks += 'width="16"'
                      textBooks += 'height="16"'
                      textBooks += 'fill="currentColor"'
                      textBooks += 'class="bi bi-check-circle-fill"'
                      textBooks += 'viewBox="0 0 16 16"'
                    textBooks += '>'
                      textBooks += '<path'
                        textBooks += 'd="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"'
                      textBooks += '/>'
                    textBooks += '</svg>'
                    textBooks += '<h6>Reserva 3</h6>'
                  textBooks += '</div>'
    
                  document.querySelector(".books-list").innerHTML = textBooks;
                }
              }

              else {
                if (hotelId == 3 || hotelId == 4) {
                  window.alert("Não há reservas para este hotel");
                  document.querySelector("#books").hidden = true;
                  document.querySelector(".books-list").hidden = true;
                }
                else {
                  window.alert("Valor de reservas incompatíveis com o valor solicitado");
                  document.querySelector("#books").hidden = true;
                  document.querySelector(".books-list").hidden = true;
                }
                
              }
            }
          }
        }
      });
      
}

function cancel() {
  document.querySelector("#taxes").classList.remove('active');
  $("#exampleModal").modal('hide');
  document.querySelector("#solicitationValue").classList.add('active');
  document.querySelector("#valor").value = '';
}