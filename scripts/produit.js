// Recup chaine de l'id dans l'URL
const queryStringUrlId = window.location.search;

//extraire l'id
const idPage = queryStringUrlId.slice(1);

var nbrPanier = JSON.parse(localStorage.getItem("panier"));
var navPanier= document.getElementById("panier");
var nombrePanier = document.createElement("span"); if(nbrPanier == null){
    nombrePanier.innerHTML= '<a href="panier.html"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Panier</a>'
}else {
nombrePanier.innerHTML= '<a href="panier.html"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Panier('+ nbrPanier.length +')</a>';}
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
        var innerHTML1 = '<h3 class="mt-5 text-center font-weight-bold"><u>'+this.name+'</u></h3>\
                <div class="row mt-5">\
                    <div class="my-auto col-md-3">\
                        <img id="img_produit" class="border border-info img-responsive center-block shadow-sm" src="'+this.imageUrl+'" alt="image_produit" />\
                    </div>\
                    <div class="col-md-6 my-auto text-center">\
                        <p>'+this.description+'</p>\
                        <p id="prix_produit" class="font-weight-bold">'+new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(this.price/100)+'</p>\
                        <form>\
                        <p></p><label for="vernis" class="ml-md-0 mt-3"><strong>Vernis</strong>:</label>\
                        <select name="vernis" id="vernis">';
        for(let i=0;i<this.varnish.length;i++){
            innerHTML1 = innerHTML1 + '<option value="'+this.varnish[i]+'" selected>'+this.varnish[i]+'</option>';
        };
        adapt.innerHTML= innerHTML1 +
                        '</select></p>\
                        <p id="label_qte"><label for="quantite" class="ml-md-1"><strong>Quantité</strong>:</label>\
                        <input id="quantite" type="number" name="quantite" value="1" min="1" step="1"></p>\
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
                price: this.price,
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
                window.alert(`${this.name} a bien été ajouté au panier`);
                document.location.reload();
            } 

            //Si panier existe déjà
            if (produitsDejaPresents){
                if(quantite <=0){
                    window.alert(`La quantité ne doit pas être inférieure à 1`);
                }else{
                ajoutAuPanier();
                popupAjout();}
            }
            //Si panier n'existe pas
            else {
                if(quantite <= 0){
                    window.alert(`La quantité ne doit pas être inférieure à 1`);
                }else{
                produitsDejaPresents= [];
                ajoutAuPanier();
                popupAjout();
                }
            }    
        });
    }
}

const TableauProduits = fetch("http://localhost:3000/api/furniture/"+idPage);
TableauProduits
.then(async (res) =>{
    try{
        const response = await res.json();
            newProduct = new Produit(response.varnish,response._id , response.name, response.price, response.description, response.imageUrl); 
    }catch(e){
        console.log(e)
    }  
})
.catch(function(err) {
    console.log(err);
});





    


