// Recupération du localStorage
let produitsDejaPresents = JSON.parse(localStorage.getItem("panier"));

// Panier dynamique
const panierProduit = document.getElementById("panier_produit");

//Si le panier est vide
if (produitsDejaPresents === null){
    const panierVide =  '<h2 class="text-center font-weight-bold" id="paniervide">Le panier est vide!</h2>';
    panierProduit.innerHTML= panierVide;
}else{
//Si le panier n'est pas vide
    let interieurPanier=[];
    let total= 0;
    //Boucle sur chaque produit dans le localStorage
    for(k=0; k < produitsDejaPresents.length; k++){
        interieurPanier = interieurPanier + `<li class="pt-2 pb-2 border-bottom border-danger" id="produit_achete">
        <a href="produit.html?${produitsDejaPresents[k].id}"><img class="ml-lg-auto mr-lg-n1 ml-md-n2" id="image_panier" src="${produitsDejaPresents[k].image}" width="70" height="60" alt="image_article" /></a>
        <a href="produit.html?${produitsDejaPresents[k].id}"><h5 id="nom_panier" class="font-weight-bold ml-lg-2 ml-md-1 text-decoration-none">${produitsDejaPresents[k].name}</h5></a> 
        <p class="mt-lg-2 ml-lg-2" id="description_panier">${produitsDejaPresents[k].description}</p>
        <p class="mt-lg-2 mr-lg-1 font-weight-bold">Qté:${produitsDejaPresents[k].quantity}</p>
        <button class="btn btn-dark h-100 mr-1" id="btn-supprimer" data-num="${k}">Supprimer</button>
        <p class="font-weight-bold mt-2 mr-lg-2 mr-md-n2" id="prix_panier">${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(produitsDejaPresents[k].price/100)}</p>
        </li>`;
        
        var totalProduit = parseFloat(produitsDejaPresents[k].price);
        total = total + totalProduit * produitsDejaPresents[k].quantity; 
    }

    var sousTotal = '<h5 class="text-right mt-2 mb-n2 font-weight-bold" id="total_prix">Total: '+ new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total/100) +'</h5>';
    panierProduit.innerHTML = interieurPanier + sousTotal;
    
    //Bouton supprimer
    const boutonSupp = document.querySelectorAll("#btn-supprimer");
    for (m=0; m<boutonSupp.length; m++){
        boutonSupp[m].addEventListener("click", function(e){
            var ind=parseInt(e.currentTarget.getAttribute("data-num"));
            produitsDejaPresents.splice(ind,1);
            if(produitsDejaPresents.length == 0){
                localStorage.removeItem("panier");
            }else{
                localStorage.setItem("panier", JSON.stringify(produitsDejaPresents));
            }
            document.location.reload();
        });
    }
};

var nbrPanier = JSON.parse(localStorage.getItem("panier"));
if(nbrPanier != null){
    var form= document.getElementById("formulaire");
    var formCommande = document.createElement('div id="formulaire" class="col-lg-5 col-sm-11 col-11 mx-auto mt-sm-5 mt-lg-3 border border-danger bg-light" style="height: 430px');
    formCommande.innerHTML='<div>\
    <h3 class="text-center mt-3 mb-3 font-weight-bold">Passer la commande</h3>\
    <form>\
        <div class="form-group mt-3">\
            <label for="firstName" class="w-25 font-weight-bold">Prénom :</label>\
            <input type="text" class="form-control w-75 w-md-50" id="firstName" required>\
        </div>\
        <div class="form-group mt-3">\
            <label for="lastName" class="w-25 font-weight-bold">Nom :</label>\
            <input type="text" class="form-control w-75" id="lastName" required>\
        </div>\
        <div class="form-group mt-3">\
            <label for="adress" class="w-25 font-weight-bold">Adresse :</label>\
            <input type="text" class="form-control w-75" id="adress" required>\
        </div>\
        <div class="form-group mt-3">\
            <label for="city" class="w-25 font-weight-bold">Ville :</label>\
            <input type="text" class="form-control w-75" id="city" required>\
        </div>\
        <div class="form-group mt-3">\
            <label for="email" class="w-25 font-weight-bold">Adresse e-mail :</label>\
            <input type="email" class="form-control w-75" id="email" required>\
        </div>\
        <div class="text-center mb-3 mt-4">\
        <button type="submit" class="btn btn-secondary">Commander</button>\
        </div>\
    </form>\
    </div>' ;
    form.appendChild(formCommande);
}
    





