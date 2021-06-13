const queryStringUrlId=window.location.search,idPage=queryStringUrlId.slice(1);var nbrPanier=JSON.parse(localStorage.getItem("panier")),navPanier=document.getElementById("panier"),nombrePanier=document.createElement("span");nombrePanier.innerHTML=null==nbrPanier?'<a href="panier.html"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Panier</a>':'<a href="panier.html"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Panier('+nbrPanier.length+")</a>",navPanier.appendChild(nombrePanier);class Produit{constructor(e,t,i,a,n,r){this.varnish=e,this.id=t,this.name=i,this.price=a,this.description=n,this.imageUrl=r,this.personnalisations={},this.adaptPage()}adaptPage(){var e=document.createElement("article"),t=document.getElementById("produit"),i='<h3 class="mt-5 text-center font-weight-bold"><u>'+this.name+'</u></h3>                <div class="row mt-5">                    <div class="my-auto col-md-3">                        <img id="img_produit" class="border border-info img-responsive center-block shadow-sm" src="'+this.imageUrl+'" alt="image_produit" />                    </div>                    <div class="col-md-6 my-auto text-center">                        <p>'+this.description+'</p>                        <p id="prix_produit" class="font-weight-bold">'+new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR"}).format(this.price/100)+'</p>                        <form>                        <p></p><label for="vernis" class="ml-md-0 mt-3"><strong>Vernis</strong>:</label>                        <select name="vernis" id="vernis">';for(let e=0;e<this.varnish.length;e++)i=i+'<option value="'+this.varnish[e]+'" selected>'+this.varnish[e]+"</option>";e.innerHTML=i+'</select></p>                        <p id="label_qte"><label for="quantite" class="ml-md-1"><strong>Quantité</strong>:</label>                        <input id="quantite" type="number" name="quantite" value="1" min="1" step="1"></p>                        </form>                    </div>                    <div class="col-md-3 my-auto">                        <button id="AjouterPanier" class="btn btn-secondary btn-lg mt-sm-4"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Ajouter au panier</button>                    </div>                </div>',t.appendChild(e),document.getElementById("AjouterPanier").addEventListener("click",e=>{e.preventDefault();var t=document.getElementById("quantite").value,i=document.getElementById("vernis").value;let a={name:this.name,id:this.id,price:this.price,image:this.imageUrl,description:this.description,quantity:t,vernis:i},n=JSON.parse(localStorage.getItem("panier"));const r=()=>{n.push(a),localStorage.setItem("panier",JSON.stringify(n))},s=()=>{window.alert(`${this.name} a bien été ajouté au panier`),document.location.reload()};n?t<=0?window.alert("La quantité ne doit pas être inférieure à 1"):(r(),s()):t<=0?window.alert("La quantité ne doit pas être inférieure à 1"):(n=[],r(),s())})}}const TableauProduits=fetch("http://localhost:3000/api/furniture/"+idPage);TableauProduits.then(async e=>{try{const t=await e.json();newProduct=new Produit(t.varnish,t._id,t.name,t.price,t.description,t.imageUrl)}catch(e){console.log(e)}}).catch(function(e){console.log(e)});