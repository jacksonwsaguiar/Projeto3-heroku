let otp = document.querySelector("#otp-input");

for (let pin of otp.children) {
  pin.onkeyup = function (event) {
    if (event.target.value > 0)
      if (pin.nextElementSibling) {
        pin.nextElementSibling.focus();
      }
  };
}
function submit() {
  var code = "";
  const values = document.getElementsByClassName("part-code");

  for (let index = 0; index < values.length; index++) {
    const element = values[index];

    code += element.value;
  }

  $.ajax({
    url: "/authenticate/" + code,
    type: "GET",
    success: (data) => {
      if (data == "user not found") {
        alert("Código Inválido");
      } else {
        createSession(data);

        window.location.href = "/dashboard";
      }
    },
  });
}

function createSession(data) {
  localStorage.setItem("session", JSON.stringify(data));
}
