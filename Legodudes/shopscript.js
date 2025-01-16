let productHTML = "";

products.map((product, index) => productHTML += 
            `<article class="product-card">
                <img src="website_images/PROD_${product.imagefile}" alt="PRODUKTTITTEL">
                <a href="#KATEGORISIDE">Ninjago</a>
                <h3>${product.title}</h3>
                <p>Kr. ${product.price},-</p>
                <button onclick="addProductToCart(${product.prodid})">Legg til i handlekurv</button>
            </article>`)

document.getElementById("productlist").innerHTML = productHTML;

document.getElementById("shoppingcart").addEventListener("click", function (){
    document.getElementById("cart").classList.toggle("visible");
});

function addProductToCart(productId){
    const idExists = cart.some(cartProduct => cartProduct.cartProdId === productId);

    if(idExists) {
        const index = cart.findIndex(cartProduct => cartProduct.cartProdId === productId);

        cart[index].quantity ++;
    }
    else {
        cart.push({cartProdId: productId, quantity: 1})
    }

    updateCart();
}

function updateCart(){
    let cartHTML = "";
    let cartTotal = 0;
    let cartNumber = 0;

    cart.map((cartProduct, index) => {
        const currentProduct = products.findIndex(product => product.prodid === cartProduct.cartProdId);
        const currentProductInfo = products[currentProduct]
        cartHTML += `<article class="cart-product">
                        <span class="title">${currentProductInfo.title}</span>
                        <span class="price">${currentProductInfo.price},-</span>
                        <span class="quantity">x<span class="quantity-number">${cartProduct.quantity}</span></span>
                        <button class="delete">x</button>
                </article>`;
                
        cartTotal += currentProductInfo.price * cartProduct.quantity;
        cartNumber += cartProduct.quantity;
    })

    document.getElementById("cart-products").innerHTML = cartHTML;
    document.getElementById("cart-total").innerHTML = cartTotal;
    document.getElementById("cartcount").innerHTML = cartNumber;
}