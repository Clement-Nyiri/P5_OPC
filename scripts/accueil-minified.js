var nbrPanier=JSON.parse(localStorage.getItem("panier")),navPanier=document.getElementById("panier"),nombrePanier=document.createElement("span");nombrePanier.innerHTML=null==nbrPanier?'<a href="panier.html"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Panier</a>':'<a href="panier.html"><i class="fa fa-shopping-cart" aria-hidden="true"></i>Panier('+nbrPanier.length+")</a>",navPanier.appendChild(nombrePanier);class Produit{constructor(e,t,a,i,r,n){this.varnish=e,this.id=t,this.name=a,this.price=i,this.description=r,this.imageUrl=n,this.createCard()}createCard(){var e=document.createElement("article"),t=document.getElementById("productList");e.innerHTML='<article class="ml-sm-3 bg-light card mt-4 mb-4 shadow" style="width: 19rem;">             <img class="card-img-top" style="height: 15rem;" src="'+this.imageUrl+'" alt="Card image cap" >            <div class="card-body">            <h5 class="card-title text-center" id="accueil_titres">'+this.name+'</h5>            <p class="card-text text-center">'+this.description+'</p>            <p class="cart-text text-center font-weight-bold">'+new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR"}).format(this.price/100)+'</p>            <a href="produit.html?'+this.id+'" class="btn btn-secondary stretched-link mx-auto d-block">Voir l\'article</a>            </div>            </article>',t.appendChild(e)}}var listeValue=[];const TableauProduits=fetch("http://localhost:3000/api/furniture");TableauProduits.then(async e=>{try{const t=await e.json();for(i=0;i<t.length;i++)newProduct=new Produit(t[i].varnish,t[i]._id,t[i].name,t[i].price,t[i].description,t[i].imageUrl),listeValue.push(newProduct)}catch(e){console.log(e)}}).catch(function(e){console.log(e)});