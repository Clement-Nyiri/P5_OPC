var button = document.getElementById("Ajouter");

var shoppingCart = (function (){
    panier =[];

    //save cart
    function saveCart (){
        localStorage.setItem('shoppingCart', JSON.stringify(panier));
    }

    function loadCart(){
        panier = JSON.parse(localStorage.getItem('shoppingCart'));
    }
    if (localStorage.getItem("shoppingCart") != null) {
        loadCart();
      }
})