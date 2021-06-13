/* Clement Nyiri 03/05/2021 Projet 5 OpenClassroom */
var nbrPanier = JSON.parse(localStorage.getItem("panier"));
var navPanier= document.getElementById("panier");
var nombrePanier = document.createElement("span"); if(nbrPanier == null){
    nombrePanier.innerHTML= '<a href="panier.html"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Panier</a>'
}else {
nombrePanier.innerHTML= '<a href="panier.html"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Panier('+ nbrPanier.length +')</a>';}
navPanier.appendChild(nombrePanier);

class Produit{
    constructor(varnish, id, name, price, description, imageUrl){ //Classe de l'objet
        this.varnish = varnish;
        this.id=id;
        this.name=name;
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        this.createCard(); //Création du bloc "article" pour chaque nouvel objet via la fonction create_card
    }
    createCard(){
            var nouveauProduit = document.createElement("article");//Nouvel article
            var card = document.getElementById('productList');// Endroit auquel on ajoute l'article
            nouveauProduit.innerHTML='<article class="ml-sm-3 bg-light card mt-4 mb-4 shadow" style="width: 19rem;"> \
            <img class="card-img-top" style="height: 15rem;" src="'+this.imageUrl+'" alt="Card image cap" >\
            <div class="card-body">\
            <h5 class="card-title text-center" id="accueil_titres">'+this.name+'</h5>\
            <p class="card-text text-center">'+this.description+'</p>\
            <p class="cart-text text-center font-weight-bold">'+new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(this.price/100)+'</p>\
            <a href="produit.html?'+this.id+'" class="btn btn-secondary stretched-link mx-auto d-block">Voir l\'article</a>\
            </div>\
            </article>'; //html utilisé pour chaque nouveau Produit
            card.appendChild(nouveauProduit); // Ajout du nouveau produit "dans le html"
    };
}

var listeValue=[];
const TableauProduits = fetch("http://localhost:3000/api/furniture");
TableauProduits
.then(async (res) =>{
    try{
        const response = await res.json();
        for(i=0; i<response.length; i++){
            newProduct = new Produit(response[i].varnish,response[i]._id , response[i].name, response[i].price, response[i].description, response[i].imageUrl);
            listeValue.push(newProduct);
        }   
    }catch(e){
        console.log(e)
    }  
})
.catch(function(err) {
    console.log(err);
});
