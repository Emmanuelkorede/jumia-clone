import { products } from "../data/products.js";
import { cart  , addToCart , updateCartQuantity } from "../data/cart.js";
import { formatNaira } from "./utils/money.js";
import {multipleRenderFuntion} from "./utils/multiplerender.js"

let productsHtml = '' ;

function renderProducts() {

    products.forEach((product) => {
        productsHtml += `
        <div class="products-card" data-id="${product.id}">
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
            </div>
        ` ;
    }) ;

    document.querySelector('.js-product-display').innerHTML = productsHtml ;


    document.querySelector('.js-product-display').addEventListener('click' , (e) => {
        const card = e.target.closest('.products-card') ;
        if(card) {
            const id = card.dataset.id ;
            window.location.href = `product.html?id=${id}` ;
        }
    }) ;

}

renderProducts() ;
multipleRenderFuntion() ;