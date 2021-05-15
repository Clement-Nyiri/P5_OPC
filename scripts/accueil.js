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

const TableauProduits = new XMLHttpRequest();

TableauProduits.onreadystatechange = function(){
    if (this.readyState==4 && this.status==200){ // Si ok
        var tt=this.response.split('}'); //Séparation des éléments
        tt.pop(); // Enlève le dernier (problématique)
        console.log(tt);
        var str_debut=['{"varnish":[' , '_id":"', '"name":"' , '"price":' , '"description":"' , ',"imageUrl":"']; //clés à rechercher
        var str_fin=['],"' , '",' , '",' , ',' , '"' , '"' ]; //fin des clés
        for(let i=0;i<tt.length;i++){ //boucle sur chaque objet
            let listeValue=[]; //Declaration variable listeValue
            for(let j=0;j<str_debut.length;j++){ //boucler sur les clés
                var i_debut=tt[i].indexOf(str_debut[j]); //Indice de la clé [j]
                var i_fin=tt[i].indexOf(str_fin[j],i_debut+str_debut[j].length+1); // indice de fin de clé [j]
                var value=tt[i].substring(i_debut+str_debut[j].length,i_fin); // valeurs entre début et fin
                listeValue.push(value); //Ajout des valeurs dans la variable listeValue déclarée avant
                console.log(listeValue);
            }
            var newProduct= new Produit(listeValue[0], listeValue[1], listeValue[2], listeValue[3], listeValue[4], listeValue[5]); //Création d'objets à partir des listes   
        }
    }
};
TableauProduits.open("GET", "http://localhost:3000/api/furniture", true);
TableauProduits.send();








