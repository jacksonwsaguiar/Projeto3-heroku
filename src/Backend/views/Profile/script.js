function handleProfileEdit() {
  document.querySelector("#name").readOnly = false;
  document.querySelector("#name").focus();
  document.querySelector("#email").readOnly = false;
  document.querySelector("#save-button-profile").style.display = "block";
  document.querySelector("#edit-button-profile").style.display = "none";
}

function getData() {
  var data = JSON.parse(localStorage.getItem("session"));
  document.querySelector("#name").value = data.name;
  document.querySelector("#email").value = data.email;
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

  fetch("http://localhost:3333/owners", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" },
  })
    .then(window.alert("mudanças salvas"))
    .then((response) => response.json())
    .then((data) => console.log(data));
}
