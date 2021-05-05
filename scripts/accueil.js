/* Clement Nyiri 03/05/2021 Projet 5 OpenClassroom */


class Produit{
    constructor(varnish, id, name, price, description, imageUrl){
        this.varnish = varnish;
        this.id=id;
        this.name=name;
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        this.create_card();
    }
    create_card(){
            var newProduct = document.createElement("article");
            var cardOne = document.getElementById('productList');
            newProduct.innerHTML='<article id="card1" class="card mr-5 mt-4 shadow" style="width: 20rem;"> \
            <img class="card-img-top" style="height: 15rem;" src="'+this.imageUrl+'" alt="Card image cap" >\
            <div class="card-body">\
            <h5 class="card-title text-center">'+this.name+'</h5>\
            <p class="card-text">'+this.description+'</p>\
            <p class="cart-text text-center font-weight-bold">'+this.price/100+',00 €</p>\
            <a href="produit.html" class="btn btn-secondary stretched-link mx-auto d-block">Voir l\'article</a>\
            </div>\
            </article>';
            cardOne.appendChild(newProduct);
    }
}

const TableauProduits = new XMLHttpRequest();

TableauProduits.onreadystatechange = function(){
    if (this.readyState==4 && this.status==200){ // Si ok
        var tt=this.response.split('}'); //Séparation des objets
        tt.pop(); // Enlève le dernier
        console.log(tt);
        var str_debut=['{"varnish":[' , '_id":"', '"name":"' , '"price":' , '"description":"' , ',"imageUrl":"']; //clés à rechercher
        var str_fin=['],"' , '",' , '",' , ',' , '"' , '"' ]; //fin des clés
        for(let i=0;i<tt.length;i++){ //boucle sur chaque objet
            let listeValue=[]; //Declaration variable listeValue
            for(let j=0;j<str_debut.length;j++){ //boucler sur les clés
                var i_debut=tt[i].indexOf(str_debut[j]); //Indice de la clé [j]
                var i_fin=tt[i].indexOf(str_fin[j],i_debut+str_debut[j].length+1); // indice de fin de clé [j]
                var value=tt[i].substring(i_debut+str_debut[j].length,i_fin); // valeurs entre début et fin
                console.log(str_debut[j]);
                console.log("debut:"+(i_debut+str_debut[j].length)+" fin:"+i_fin)
                console.log(value);
                listeValue.push(value); //Ajout des valeurs dans la variable listeValue déclarée avant
                console.log(listeValue);
            }
            var newProduct= new Produit(listeValue[0], listeValue[1], listeValue[2], listeValue[3], listeValue[4], listeValue[5]); //Création d'objets à partir des listes
            
        }
    }
};
TableauProduits.open("GET", "http://localhost:3000/api/furniture/", true);
TableauProduits.send();








