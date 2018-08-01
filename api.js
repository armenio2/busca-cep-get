window.onload = function () {
    addCepMask()
    formSubmit()
};

function addCepMask() {
    var element = document.getElementById("cepDigitado")
    element
        .addEventListener("keypress", function (event) {
            if(isNumber(event)){
                maskCep(element)
            }
        })
}

function formSubmit() {
    document.getElementById("form-cep")
        .addEventListener("submit", function (event) {
            if(isValidForm() == true){
                procuracep()
            }
            event.preventDefault()
        })
}

function isValidForm() {
    var postalCode = document.getElementById("cepDigitado").value

    if(postalCode != null && postalCode.length == 9){
        return true
    }else{
        document.getElementById("cidade").innerText = "Cep Inválido";
        document.getElementById("bairro").innerText = "";
        document.getElementById("rua").innerText = "";
        return false
    }
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

function procuracep() {
    console.log("procurando cep");
    var cep = document.getElementById("cepDigitado").value;
    cep = cep.replace("-", "");
    var xmlhttp = new XMLHttpRequest();
    var url = "https://viacep.com.br/ws/" + cep + "/json/";
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var texte = JSON.parse(this.responseText);
            console.log(texte);

        } else {
            document.getElementById("cidade").innerText = "Cep Invalido";
            document.getElementById("bairro").innerText = "";
            document.getElementById("rua").innerText = "";
        }
        var cep2 = texte.cep;
        cep2 = cep2.replace("-", "");
        if (cep == cep2) {
            document.getElementById("cidade").innerText = texte.localidade;
            document.getElementById("bairro").innerText = texte.bairro;
            document.getElementById("rua").innerText = texte.logradouro;
        } else {
            console.log("fudeu");

        }


    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();




    console.log(cep);

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