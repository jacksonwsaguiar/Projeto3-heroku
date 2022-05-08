
// function to change name, e-mail, phone, emergency phone and adress by swicthing the values with user input
function save(){
    var name = document.getElementById("name-edit").value;
    document.getElementById("name").innerHTML = name;
 
    var email = document.getElementById("email-edit").value;
    document.getElementById("email").innerHTML = email;
 
    var phone = document.getElementById("phone-edit").value;
    document.getElementById("phone").innerHTML = phone;
 
    var ephone = document.getElementById("ephone-edit").value;
    document.getElementById("ephone").innerHTML = ephone;
 
    var loc = document.getElementById("loc-edit").value;
    document.getElementById("loc").innerHTML = loc;
}

// function to change CPF/CNPJ , agency number and bank account number by swicthing the values with user input
function paysave(){
    var cpf = document.getElementById("cpf-edit").value;
    document.getElementById("cpf").innerHTML = cpf;
 
    var agen = document.getElementById("agen-edit").value;
    document.getElementById("agen").innerHTML = agen;
 
    var conta = document.getElementById("acc-edit").value;
    document.getElementById("acc").innerHTML = conta;
}