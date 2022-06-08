function handleProfileEdit() {
  console.log(document.querySelector("#name").value)
  console.log(document.querySelector("#email").value)

  document.querySelector("#name").readOnly = false;
  document.querySelector("#name").focus();
  document.querySelector("#email").readOnly = false;
  document.querySelector("#save-button-profile").style.display = "block";
  document.querySelector("#edit-button-profile").style.display = "none";
}

function save() {

  const id = 2;
  let name = document.querySelector("#name").value
  let email = document.querySelector("#email").value

  console.log(id);
  console.log(name);
  console.log(email);

  let data = {
    id: id,
    name: name,
    email: email,
  };

  fetch("http://localhost:3333/owners", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json' }
  })

    .then(window.alert("mudanças salvas"))
    .then((response) => response.json())
    .then((data) => console.log(data));




}