// Recupération du localStorage
let produitsDejaPresents = JSON.parse(localStorage.getItem("panier"));
// Panier dynamique
const panierProduit = document.getElementById("panier_produit");
//Si le panier est vide
if (produitsDejaPresents == null){
    var panierVide = document.getElementById("panierVide");
    panierVide.innerText = 'Le panier est vide!';
}else{ 
//Si le panier n'est pas vide
    let interieurPanier=[];
    let total= 0;
    //Boucle sur chaque produit dans le localStorage
    for(k=0; k < produitsDejaPresents.length; k++){
        interieurPanier = interieurPanier + `<div class="pt-2 pb-2 border-bottom border-danger" id="produit_achete">
        <a href="produit.html?${produitsDejaPresents[k].id}"><img class="ml-lg-auto mr-lg-n1" id="image_panier" src="${produitsDejaPresents[k].image}" width="70" height="60" alt="image_article" /></a>
        <a href="produit.html?${produitsDejaPresents[k].id}"><p id="nom_panier" class="ml-lg-2 text-decoration-none"><span id="nom_produit" class="font-weight-bold">${produitsDejaPresents[k].name}</span> <br/> ${produitsDejaPresents[k].description}</p></a>
        <p class="mt-lg-2 mr-lg-1 ml-md-2 font-weight-bold">Qté:${produitsDejaPresents[k].quantity}</p>
        <button class="btn btn-dark h-100 mr-1" id="btn-supprimer" data-num="${k}">Supprimer</button>
        <p class="font-weight-bold mt-2 mr-lg-2" id="prix_panier">${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(produitsDejaPresents[k].price/100)}</p>
        </div>`;
        
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

    function checkInput(input, regex, errorId){
        if(regex.test(input)){
            document.getElementById(errorId).textContent = "";
            return true;
        }else{
            document.getElementById(errorId).textContent = "Veuillez remplir correctement ce champ";
            return false;
        }
    };

    //Formulaire commande + event Bouton commander
    var commande= document.getElementById("commander");
    commande.addEventListener('click', (e)=>{
        e.preventDefault();
        // Récupération des valeurs du formulaire rempli 1 + création d'un objet avec
        const contact = {
            "firstName": document.getElementById('firstName').value,
            "lastName": document.getElementById('lastName').value,
            "address": document.getElementById('adress').value,
            "city": document.getElementById('city').value,
            "email": document.getElementById('email').value
        }
         //----------------------------Verif formulaire-------------------------
         const regExFirstLastCity = (value) =>{
            return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
        }
        // IMPORTANT 
        
        /*
        //FirstName
        checkInput(contact.firstName, /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/,firstNameErreur);

        //lastName
        checkInput(contact.lastName, /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/,lastNameErreur);

        //adress
        checkInput(contact.address, /^[A-Za-z0-9\s]{6,60}$/ ,adressErreur);

        //city
        checkInput(contact.city, /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/,cityErreur);

        //email
        checkInput(contact.email, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,emailErreur); 
        */
        
        if(checkInput(contact.firstName, /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/,"firstNameErreur")
        && checkInput(contact.lastName, /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/,"lastNameErreur")
        && checkInput(contact.address, /^[A-Za-z0-9\s]{6,60}$/ ,"adressErreur")
        && checkInput(contact.city, /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/,"cityErreur") 
        && checkInput(contact.email, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"emailErreur")){
        //Ajout dans le localStorage
            localStorage.setItem("contact", JSON.stringify(contact));

            //Redirection vers commande_thx.html
            window.location.replace("commande_thx.html");
        } else{
        alert("Veuillez remplir correctement le formulaire");
        }
        
    });
};





