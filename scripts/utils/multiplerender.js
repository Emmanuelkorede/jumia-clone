import { renderOrderSumary } from "../checkout/checkoutcart.js";
import { renderPaymentSummary } from "../checkout/checkoutpament.js";
import { updateCartQuantity } from "../../data/cart.js";
import { renderCheckoutQuantity } from "../checkout/checkoutcart.js";


export function multipleRenderFuntion() {
    renderOrderSumary() ;
    renderPaymentSummary();
    updateCartQuantity() ;
    renderCheckoutQuantity() ;
} 