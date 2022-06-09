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
    url:'/authenticate/' + code, 
    type: 'GET',
    success: data => {
      if (data == "user not found") {
        alert('Código Inválido');
        }
      else {

       
        console.log(data);
        localStorage.setItem('access_code', data.access_code);
        localStorage.setItem('created_at', data.created_at);
        localStorage.setItem('email', data.email);
        localStorage.setItem('id', data.id);
        localStorage.setItem('name', data.name);

        window.location.href = '../Dashboard/index.html';
     }
    }
});
};


