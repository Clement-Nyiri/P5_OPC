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

    //Boucle sur chaque produit dans le localStorage
    for(k=0; k < produitsDejaPresents.length; k++){
        interieurPanier = interieurPanier + `<li class="pt-2 pb-2 border-bottom border-danger" id="produit_achete">
        <a href="produit.html?${produitsDejaPresents[k].id}"><img src="${produitsDejaPresents[k].image}" width="70" height="60" alt="image_article" /></a>
        <a href="produit.html?${produitsDejaPresents[k].id}"><h5 class="font-weight-bold ml-2 text-wrap">${produitsDejaPresents[k].name}</h5></a> 
        <p class="mt-2 ml-2" id="description_panier">${produitsDejaPresents[k].description}</p>
        <p class="mt-2 ml-n2 mr-1">Qté:${produitsDejaPresents[k].quantity}</p>
        <button class="btn btn-dark h-100 mr-1" id="btn-supprimer" data-num="${k}">Supprimer</button>
        <p class="font-weight-bold mt-2" id="prix_panier">${produitsDejaPresents[k].price}</p>
        </li>`;
    }
    
    panierProduit.innerHTML = interieurPanier;
    

    //Bouton supprimer
    const boutonSupp = document.querySelectorAll("#btn-supprimer");
    for (l=0; l<boutonSupp.length; l++){
        boutonSupp[l].addEventListener("click", function(e){
            var ind=parseInt(e.currentTarget.getAttribute("data-num"));
            produitsDejaPresents.splice(ind,1);
            localStorage.setItem("panier", JSON.stringify(produitsDejaPresents));
            document.location.reload();
        });
    }
};



