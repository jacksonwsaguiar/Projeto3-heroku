function handleProfileEdit() {
  document.querySelector("#name").readOnly = false;
  document.querySelector("#name").focus();
  document.querySelector("#email").readOnly = false;
  document.querySelector("#save-button-profile").style.display = "block";
  document.querySelector("#edit-button-profile").style.display = "none";
}

function getData() {
  var data = JSON.parse(localStorage.getItem("session"));

  fetch("https://hurb-app.herokuapp.com/owners/" + data.id, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  })
    .then((response) => {
      const user = response.json();
      document.querySelector("#name").value = user.name;
      document.querySelector("#email").value = user.email;
    })
    .then((data) => console.log(data));
}

function save() {
  const id = 2;
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;

  let data = {
    id: id,
    name: name,
    email: email,
  };

  fetch("https://hurb-app.herokuapp.com/owners", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" },
  })
    .then(window.alert("mudanças salvas"))
    .then((response) => getData())
    .then((data) => console.log(data));
}
