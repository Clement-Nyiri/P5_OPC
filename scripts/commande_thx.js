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

var commande = fetch("http://localhost:3000/api/furniture/order", {
    method: "POST",
    body: JSON.stringify(aEnvoyer),
    headers: {
        "Content-Type":"application/json"
    }
})

commande
    .then(async (response) =>{
        const response1 = await response.json();
        let IdCommande = response1.orderId;
        var text=document.getElementById("text_thx");
        var textInside = document.createElement("div");
        textInside.innerHTML=`<h3 id="remerciement1"><u>Merci pour votre commande</u></h3>\
        <p id="remerciement2">Votre commande numéro <strong>${IdCommande}</strong> a bien été reçue.<br/> Un email contenant les détails de votre achat vous sera envoyé à l'adresse indiquée.</p>`
        text.appendChild(textInside);
        localStorage.clear();
    })
    .catch(function(err){
        console.log(err);
    });
    
    
