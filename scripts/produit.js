// Recup chaine de l'id dans l'URL
const queryStringUrlId = window.location.search;

//extraire l'id
const idPage = queryStringUrlId.slice(1);

var nbrPanier = JSON.parse(localStorage.getItem("panier"));
var navPanier= document.getElementById("panier");
var nombrePanier = document.createElement("span");
nombrePanier.innerHTML= '<a href="panier.html"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Panier('+ nbrPanier.length +')</a>';
navPanier.appendChild(nombrePanier);


class Produit{
     //Classe de l'objet
    constructor(varnish, id, name, price, description, imageUrl){
        this.varnish = varnish;
        this.id=id;
        this.name=name;
        this.price=price;
        this.description=description;
        this.imageUrl=imageUrl;
        this.personnalisations = {};
        this.adaptPage();
    }
    adaptPage(){
        var adapt = document.createElement ("article")
        var Name= document.getElementById("produit");
        //HTML à ajouter dans le document
        var innerHTML1 = '<h2 class="mt-5 text-center font-weight-bold"><u>'+this.name+'</u></h2>\
                <div class="row mt-5">\
                    <div class="my-auto col-md-3">\
                        <img id="img_produit" class="border border-info img-responsive center-block shadow-sm" src="'+this.imageUrl+'" alt="image_produit" />\
                    </div>\
                    <div class="col-md-6 my-auto text-center">\
                        <p>'+this.description+'</p>\
                        <p class="font-weight-bold">'+new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(this.price/100)+'</p>\
                        <form>\
                        <p></p><label for="vernis" class="ml-md-0 mt-3"><strong>Vernis</strong>:</label>\
                        <select name="vernis" id="vernis">';
        for(let i=0;i<this.varnish.length;i++){
            innerHTML1 = innerHTML1 + '<option value="'+this.varnish[i]+'" selected>'+this.varnish[i]+'</option>';
        };
        adapt.innerHTML= innerHTML1 +
                        '</select></p>\
                        <p id="label_qte"><label for="quantite" class="ml-md-1"><strong>Quantité</strong> :</label>\
                        <input id="quantite" type="number" name="quantite" value="1" step="1"></p>\
                        </form>\
                    </div>\
                    <div class="col-md-3 my-auto">\
                        <button id="AjouterPanier" class="btn btn-secondary btn-lg mt-sm-4"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Ajouter au panier</button>\
                    </div>\
                </div>';
        Name.appendChild(adapt);

        //Bouton d'ajout au panier
        var btnEnvoiPanier = document.getElementById("AjouterPanier");
        btnEnvoiPanier.addEventListener('click', (e)=>{
            e.preventDefault();

            // Recupérer la valeur de l'input quantite
            var qteForm = document.getElementById("quantite");
            var quantite = qteForm.value;

            //Recupérer la valeur de l'input varnish
            var varnishForm = document.getElementById("vernis");
            var varnish= varnishForm.value;

            //Creation dictionnaire objet à envoyer
            let produitAEnvoyer = {
                name: this.name,
                id: this.id,
                price: Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(this.price/100),
                image: this.imageUrl,
                description: this.description,
                quantity: quantite,
                vernis: varnish
            };

            //---- Local Storage ----  JSON.parse = lecture JSON.stringify = Ecriture
            // On cherche s'il y a déjà quelque chose
            let produitsDejaPresents = JSON.parse(localStorage.getItem("panier"));
            const ajoutAuPanier = () =>{
                produitsDejaPresents.push(produitAEnvoyer);
                localStorage.setItem("panier", JSON.stringify(produitsDejaPresents));
            }

            //popup après ajout
            const popupAjout = () =>{
                window.alert(`${this.name} a bien été ajouté au panier`)
            } 

            //Si panier existe déjà
            if (produitsDejaPresents){
                ajoutAuPanier();
                popupAjout();
            }
            //Si panier n'existe pas
            else {
                produitsDejaPresents= [];
                ajoutAuPanier();
                popupAjout();
            }    
        });
    }
}
const TableauProduits = new XMLHttpRequest();
var currentProduct;
TableauProduits.onreadystatechange = function(){
    if (this.readyState==4 && this.status==200){ // Si ok
        var tt = this.response;
        var str_debut=['{"varnish":[' , '_id":"', '"name":"' , '"price":' , '"description":"' , ',"imageUrl":"']; //clés à rechercher
        var str_fin=['],"' , '",' , '",' , ',' , '"' , '"' ]; //fin des clés
        let listeValue=[]; //Declaration variable listeValue
        for(let j=0;j<str_debut.length;j++){ //boucler sur les clés
            var i_debut=tt.indexOf(str_debut[j]); //Indice de la clé [j]
            var i_fin=tt.indexOf(str_fin[j],i_debut+str_debut[j].length+1); // indice de fin de clé [j]
            var value=tt.substring(i_debut+str_debut[j].length,i_fin); // valeurs entre début et fin
            listeValue.push(value); //Ajout des valeurs dans la variable listeValue déclarée avant
        }
        currentProduct= new Produit(listeValue[0].replaceAll('\"','').split(','), listeValue[1], listeValue[2], listeValue[3], listeValue[4], listeValue[5]); //Création d'objets à partir des listes
    }
    
};
TableauProduits.open("GET", "http://localhost:3000/api/furniture/"+idPage , true);
TableauProduits.send();





    


