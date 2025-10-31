import{ cart , removeFromCart ,increaseCartQuantity , decreaseCartQuantity,  } 
 from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatNaira } from "../utils/money.js";
import { multipleRenderFuntion } from "../utils/multiplerender.js";

export function renderOrderSumary() {
  const cartDisplay = document.querySelector('.js-cart-display');
  if (!cartDisplay) return; 

  let cartsummaryHtml = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = products.find((product) => product.id === productId);

    cartsummaryHtml += `
      <div class="checkout-card" data-product-id="${cartItem.productId}">
        <div class="checkout-top-row">
          <div class="checkout-image">
            <img src="${matchingProduct.image}">
          </div>
          <div class="checkout-info">
            <div class="checkout-product-name">${matchingProduct.name}</div>
            <div class="checkout-product-price">${formatNaira(matchingProduct.priceKobo)}</div>
          </div>
        </div>

        <div class="checkout-actions">
          <button class="remove-btn" data-product-id="${cartItem.productId}">
            <i class="fa-solid fa-trash"></i> Remove
          </button>

          <div class="quantity-controls">
            <button class="quantity-btn decrease js-decrease-button" data-product-id="${cartItem.productId}">
             <i class="fa-solid fa-minus"></i>
            </button>
            <span class="cart-quantity">${cartItem.quantity}</span>
            <button class="quantity-btn increase js-increase-button"  data-product-id="${cartItem.productId}">
             <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  cartDisplay.innerHTML = cartsummaryHtml;

  renderCheckoutQuantity();

  document.querySelectorAll('.remove-btn').forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', () => {
      const productId = deleteBtn.dataset.productId;
      removeFromCart(productId);
      multipleRenderFuntion();
    });
  });

  document.querySelectorAll('.js-increase-button').forEach((increaseBtn) => {
    increaseBtn.addEventListener('click', () => {
      const productId = increaseBtn.dataset.productId;
      increaseCartQuantity(productId);
      multipleRenderFuntion();
    });
  });

  document.querySelectorAll('.js-decrease-button').forEach((decreaseBtn) => {
    decreaseBtn.addEventListener('click', () => {
      const productId = decreaseBtn.dataset.productId;
      decreaseCartQuantity(productId);
      multipleRenderFuntion();
    });
  });
}

 export function renderCheckoutQuantity() {
  const totalItemsEl = document.querySelector('.total-items');
  if (!totalItemsEl) return; 

  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  totalItemsEl.innerHTML = cartQuantity;
}

