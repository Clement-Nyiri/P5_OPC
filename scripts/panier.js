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

if(produitsDejaPresents != null){//Si le panier n'est pas null, création du form
    var form= document.getElementById("formulaire");
    var formCommande = document.createElement('div');
    formCommande.classList.add("col-lg-6", "col-sm-8", "col-11", "mx-auto", "mt-sm-5", "mt-lg-3", "border", "border-danger", "bg-light");
    formCommande.innerHTML='<div>\
    <h3 class="text-center mt-3 mb-3 font-weight-bold">Passer la commande</h3>\
    <form>\
        <div class="form-group mt-3">\
            <label for="firstName" class="w-25 font-weight-bold">Prénom : </label><span id="firstNameErreur" class="text-dark"></span>\
            <input type="text" class="form-control w-75 w-md-50" id="firstName" required>\
        </div>\
        <div class="form-group mt-3">\
            <label for="lastName" class="w-25 font-weight-bold">Nom :</label><span id="lastNameErreur" class="text-dark"></span>\
            <input type="text" class="form-control w-75" id="lastName" required>\
        </div>\
        <div class="form-group mt-3">\
            <label for="adress" class="w-25 font-weight-bold">Adresse :</label><span id="adressErreur" class="text-dark"></span>\
            <input type="text" class="form-control w-75" id="adress" required>\
        </div>\
        <div class="form-group mt-3">\
            <label for="city" class="w-25 font-weight-bold">Ville :</label><span id="cityErreur" class="text-dark"></span>\
            <input type="text" class="form-control w-75" id="city" required>\
        </div>\
        <div class="form-group mt-3">\
            <label for="email" class="w-25 font-weight-bold">Adresse e-mail :</label><span id="emailErreur" class="text-dark"></span>\
            <input type="email" class="form-control w-75" id="email" required>\
        </div>\
        <div class="text-center mb-3 mt-4">\
        <button id="commander" type="submit" class="btn btn-secondary">Commander</button>\
        </div>\
    </form>\
    </div>' ;
    form.appendChild(formCommande); // ajout du form au doc
}

//Formulaire commande + event Bouton commander
var commande= document.getElementById("commander");
commande.addEventListener('click', (e)=>{
    e.preventDefault;
    // Récupération des valeurs du formulaire rempli 1 + création d'un objet avec
    const contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        adress: document.getElementById('adress').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value
    }

    //----------------------------Verif formulaire-------------------------
    const regExFirstLastCity = (value) =>{
        return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
    }
    //firstName
    function checkFirstName (){
        const leFirstName = contact.firstName;
        if(regExFirstLastCity(leFirstName)){
            document.getElementById("firstNameErreur").textContent = "";
            return true;
        }else{
            document.getElementById("firstNameErreur").textContent = "Veuillez remplir correctement ce champ";
            return false;
        }
    };
    //lastName
    function checkLastName(){
        const leLastName = contact.lastName;
        if(regExFirstLastCity(leLastName)){
            document.getElementById("lastNameErreur").textContent = "";
            return true;
        }else{
            document.getElementById("lastNameErreur").textContent = "Veuillez remplir correctement ce champ";
            return false;
        }
    };

    //adress
    function checkAdress(){
        const laAdress = contact.adress;
        if(/^[A-Za-z0-9\s]{6,60}$/.test(laAdress)){
            document.getElementById("adressErreur").textContent = "";
            return true;
        }else{
            document.getElementById("adressErreur").textContent = "Veuillez remplir correctement ce champ";
            return false;
        }
    };

    //city
    function checkCity (){
        const laCity = contact.city;
        if(regExFirstLastCity(laCity)){
            document.getElementById("cityErreur").textContent = "";
            return true;
        }else{
            document.getElementById("cityErreur").textContent = "Veuillez remplir correctement ce champ";
            return false;
        }
    };

    //email
    function checkEmail(){
        const leEmail = contact.email;
        if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(leEmail)){
            document.getElementById("emailErreur").textContent = "";
            return true;
        }else{
            document.getElementById("emailErreur").textContent = "Veuillez remplir correctement ce champ";
            return false;
        }
    }; 
    
    if(checkFirstName() && checkLastName() && checkAdress && checkCity() && checkEmail()){
    //Ajout dans le localStorage
        localStorage.setItem("contact", JSON.stringify(contact));
        let idAEnvoyer=[];
        for(n=0; n<produitsDejaPresents.length;n++){
            idProduct = produitsDejaPresents[n].id;
                for(o=0; o<produitsDejaPresents[n].quantity;o++){
                idAEnvoyer.push(idProduct);  
                }
        };
    

        //Formulaire + Produits à envoyer au serveur
        const aEnvoyer = {
            idAEnvoyer,
            contact,
        };
        console.log(aEnvoyer);

        //Envoi de aEnvoyer au serveur
        var promise = new XMLHttpRequest();
        promise.open("POST", "http://localhost:3000/api/furniture/order", true);
        promise.setRequestHeader('Content-Type', 'application/json');
        promise.send(JSON.stringify(aEnvoyer));
        console.log(promise);
        console.log("OK");
    } else{
        alert("Veuillez remplir correctement le formulaire");
    }
    
    
});




