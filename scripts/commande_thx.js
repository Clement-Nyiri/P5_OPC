let produitsDejaPresents = JSON.parse(localStorage.getItem("panier")); //Recup du panier depuis le localStorage
let products=[];
for(n=0; n<produitsDejaPresents.length;n++){
    idProduct = produitsDejaPresents[n].id;
        for(o=0; o<produitsDejaPresents[n].quantity;o++){
        products.push(idProduct);  
        }
};

let contact = JSON.parse(localStorage.getItem("contact")); //Recup des valeurs du formulaire de commande

const aEnvoyer = { // const à envoyer au serveur
    "products": products,
    "contact": contact
};
var promise = new XMLHttpRequest();
promise.open("POST", "http://localhost:3000/api/furniture/order");
promise.setRequestHeader('Content-Type', 'application/json');
promise.send(JSON.stringify(aEnvoyer));//Envoi de requête
localStorage.clear();
promise.onreadystatechange = function(){
    if (this.readyState==4 && this.status==201){
        var tt1=this.response.split('":"');
        var ID = tt1[tt1.length-1];
        idCommande = ID.replace(/"}/, '');
        var text=document.getElementById("text_thx");
        var textInside = document.createElement("div");
        textInside.innerHTML=`<h3 id="remerciement1"><u>Merci pour votre commande</u></h3>\
        <p id="remerciement2">Votre commande numéro <strong>${idCommande}</strong> a bien été reçue.<br/> Un email contenant les détails de votre achat vous sera envoyé à l'adresse indiquée.</p>`
        text.appendChild(textInside);
    }
};

