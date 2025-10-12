import { products } from "../data/products.js";
import { cart  , addToCart , updateCartQuantity } from "../data/cart.js";
import { formatNaira } from "./utils/money.js";
import {multipleRenderFuntion} from "./utils/multiplerender.js"

let productsHtml = '' ;

function renderProducts() {

    products.forEach((product) => {
        productsHtml += `
        <div class="products-card">
            <div class="product-image">
                <img src="${product.image}">
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${formatNaira(product.priceKobo)}</div>
            <div class="rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">${product.rating.count}</div>
            </div>
            <button class="add-to-cart js-add-to-cart" data-product-id="${product.id}">Add to cart</button>
            </div>
        ` ;
    }) ;

    document.querySelector('.js-product-display').innerHTML = productsHtml ;

    document.querySelectorAll('.js-add-to-cart').forEach((addToCartBtn) => {
        addToCartBtn.addEventListener('click' , () => {
            const productId = addToCartBtn.dataset.productId ;
            addToCart(productId) ;
            updateCartQuantity() ;
        }) ;
    }) ;

}

renderProducts() ;
multipleRenderFuntion() ;