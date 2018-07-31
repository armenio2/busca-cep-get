function procuracep(){
    console.log("procurando cep");
    var cep = document.getElementById("cepDigitado").value;
    cep = cep.replace("-","");   
    var xmlhttp = new XMLHttpRequest();
    var url = "https://viacep.com.br/ws/"+ cep +"/json/";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var texte = JSON.parse(this.responseText);
            console.log(texte);
            
        }else{
            document.getElementById("cidade").innerText = "Cep Invalido";
            document.getElementById("bairro").innerText = "";
            document.getElementById("rua").innerText = "";
        }
        var cep2 = texte.cep;
        cep2 = cep2.replace("-","");
        if (cep == cep2){
            document.getElementById("cidade").innerText = texte.localidade;
            document.getElementById("bairro").innerText = texte.bairro;
            document.getElementById("rua").innerText = texte.logradouro;
        }else {
            console.log("fudeu");
            
        }


    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    

    
    console.log(cep);
    
}

function mascara(src, mask){
    var i = src.value.length;
    var saida = mask.substring(0,1);
    var texto = mask.substring(i)
    if (texto.substring(0,1) != saida){
        src.value += texto.substring(0,1);
    }
}
