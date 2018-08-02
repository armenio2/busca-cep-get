window.onload = function () {
    addCepMask()
    formSubmit()
};
var testegithub ;
//testando commit pelo vscod direto

function addCepMask() {
    var element = document.getElementById("cepDigitado")
    element
        .addEventListener("keypress", function (event) {
            if (isNumber(event)) {
                maskCep(element)
            }
        })
}

function formSubmit() {
    document.getElementById("form-cep")
        .addEventListener("submit", function (event) {
            if (isValidForm() == true) {
                limpaTela()
                procuracep()               
            }
            event.preventDefault()
        })
}

function limpaTela(){
    document.getElementById("cep-result").innerHTML = ""; //limpando a tela se pesquisar novamente o cep.
}

function isValidForm() {
    var postalCode = document.getElementById("cepDigitado").value

    if (postalCode != null && postalCode.length == 9) {
        hideError();
        return true;
    } else {
        showError();
        console.log("erro em isValidForm");
        return false;
    }
}

function showError() {
    console.log("Erro Visivel");
    document.getElementById("label-error").style.visibility = 'visible'
}

function hideError() {
    console.log("Erro Não Visivel");
    document.getElementById("label-error").style.visibility = 'hidden'
}

function isNumber(event) {
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault()
        return false;
    }
    return true;
}

function bindResult(cidade, bairro, rua) {
    var elementCity = document.createElement("span")
    elementCity.innerText = cidade

    var elementBairro = document.createElement("span")
    elementBairro.innerText = bairro

    var elementRua = document.createElement("span")
    elementRua.innerText = rua

    var viewRoot = "cep-result"

    addEelement(viewRoot, elementCity)
    addEelement(viewRoot, document.createElement("br"))

    addEelement(viewRoot, elementBairro)
    addEelement(viewRoot, document.createElement("br"))

    addEelement(viewRoot, elementRua)
}

function addEelement(viewRoot, elementChield) {
    document
        .getElementById(viewRoot)
        .appendChild(elementChield)
}

function procuracep() {
    console.log("procurando cep");
    var cep = document.getElementById("cepDigitado").value;
    cep = cep.replace("-", "");
    var xmlhttp = new XMLHttpRequest();
    var url = "https://viacep.com.br/ws/" + cep + "/json/";
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var result = JSON.parse(this.responseText);
            

            if (result.erro== true) {
                console.log("o cep é invalido");
                showError();
            } else {
                console.log(result);
                console.log("enviar resultado");
                bindResult(result.localidade, result.bairro, result.logradouro);
                
                
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function maskCep(element) {
    createMask(element, "#####-###")
}

function createMask(input, mask) {
    var size = input.value.length;
    var saida = mask.substring(0, 1);
    var texto = mask.substring(size)

    if (texto.substring(0, 1) != saida) {
        input.value += texto.substring(0, 1);
    }
}