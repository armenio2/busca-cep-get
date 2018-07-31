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
            document.getElementById("cidade").innerText = texte.localidade;
            document.getElementById("bairro").innerText = texte.bairro;
            document.getElementById("rua").innerText = texte.logradouro;
        }

    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    /*$.ajax({
        url : urlCep,
        type : "get",
        dataType: "json",
        sucess : function(data){
            console.log(data);
            console.log("teste");
        },
        error : function(erro){
            console.log(erro);
            console.log("teste2");
        }

    })*/
    
    console.log(cep);
    
}
