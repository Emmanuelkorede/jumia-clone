import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import  {formatNaira} from "../utils/money.js"

 export function renderPaymentSummary() {
  const paymentSummaryEl = document.querySelector('.js-payment-summary');
  if (!paymentSummaryEl) return; // prevent crash if missing

  let cartQuantity = 0;
  let totalPrice = 0;

  cart.forEach((cartItem) => {
    const product = products.find(p => p.id === cartItem.productId);
    cartQuantity += cartItem.quantity;
    totalPrice += product.priceKobo * cartItem.quantity;
  });

  const paymentSummaryHtml = `
    <div class="summary-row">
      <span>Subtotal</span>
      <span class="cart-amount">${formatNaira(totalPrice)}</span>
    </div>
    <button class="checkout-button">Checkout (${formatNaira(totalPrice)})</button>
  `;

  paymentSummaryEl.innerHTML = paymentSummaryHtml;

  paymentSummaryEl.querySelector('.checkout-button').addEventListener('click', () => {
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}

