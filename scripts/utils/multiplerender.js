import { renderOrderSumary } from "../checkout/checkoutcart.js";
import { renderPaymentSummary } from "../checkout/checkoutpament.js";
import { updateCartQuantity } from "../../data/cart.js";
import { renderCheckoutQuantity } from "../checkout/checkoutcart.js";


export function multipleRenderFuntion() {
  if (document.querySelector('.js-cart-display')) {
    renderOrderSumary();
  }

  if (document.querySelector('.js-payment-summary')) {
    renderPaymentSummary();
  }

  updateCartQuantity();
  
  if (document.querySelector('.total-items')) {
    renderCheckoutQuantity();
  }

}
