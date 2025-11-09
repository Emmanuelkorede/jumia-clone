import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatNaira } from "./utils/money.js";

function renderPaymentDetails() {
  const paymentDetailsEl = document.querySelector(".js-payment-details");

  const name = localStorage.getItem("pickupName") || "No name saved";
  const address = localStorage.getItem("pickupAddress") || "No address saved";
  const state = localStorage.getItem("selectedState") || "Not selected";
  const area = localStorage.getItem("selectedArea") || "Not selected";
  const deliveryType = localStorage.getItem("deliveryType") || "door";
  const deliveryFeeNaira = Number(localStorage.getItem("deliveryFee")) || 0;

  const deliveryText =
    deliveryType === "door" ? "Door Delivery" : "Pickup Station";

  const today = new Date();
  const deliveryStart = new Date(today);
  const deliveryEnd = new Date(today);
  deliveryStart.setDate(today.getDate() + 5);
  deliveryEnd.setDate(today.getDate() + 7);

  const formatDate = (date) =>
    `${date.getDate()} ${date.toLocaleString("default", { month: "long" })}`;

  const detailsHTML = `
    <div class="payment-step">
      <div class="step-header">
        <span class="step-icon done"><i class="fa-solid fa-circle-check"></i></span>
        <span class="step-title">1. Customer Address</span>
        <a href="product.html" class="step-change">
          Change <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>
      <div class="step-content">
        <p>${name}</p>
        <p class="second-para">${address} | ${area}, ${state}</p>
      </div>
    </div>

    <div class="payment-step">
      <div class="step-header">
        <span class="step-icon done"><i class="fa-solid fa-circle-check"></i></span>
        <span class="step-title">2. Delivery Details</span>
        <a href="product.html" class="step-change">
          Change <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>
      <div class="step-content">
        <p>${deliveryText}</p>
        <p class="second-para">
          Delivery between ${formatDate(deliveryStart)} and ${formatDate(deliveryEnd)}.
        </p>
        <p class="second-para">Delivery Fee: ${formatNaira(deliveryFeeNaira * 100)}</p>
      </div>
    </div>

    <div class="payment-step">
      <div class="step-header">
        <span class="step-icon pending"><i class="fa-solid fa-circle"></i></span>
        <span class="step-title">3. Payment Method</span>
      </div>

      <div class="step-content-payment">
        <label class="radio">
          <input type="radio" name="payment-method">
          <span class="custom-radio"></span>
          <div class="radio-content">
            <span class="radio-heading">Payment on Delivery</span>
            <span class="radio-label">Pay via transfer on delivery</span>
          </div>
        </label>
      </div>

      <div class="step-content-payment">
        <label class="radio">
          <input type="radio" name="payment-method">
          <span class="custom-radio"></span>
          <div class="radio-content">
            <span class="radio-heading">Pre-pay now</span>
            <span class="radio-label">Pay with card or bank transfer</span>
          </div>
        </label>
      </div>

      <button class="confirm-payment-method">Confirm payment method</button>
    </div>
  `;

  paymentDetailsEl.innerHTML = detailsHTML;
}

function renderPaymentSummary() {
  const paymentSummaryEl = document.querySelector(".js-payment-summary");

  let cartQuantity = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      cartQuantity += item.quantity;
      totalPrice += product.priceKobo * item.quantity;
    }
  });

  const deliveryFeeNaira = Number(localStorage.getItem("deliveryFee")) || 0;
  const deliveryFee = deliveryFeeNaira * 100; // convert Naira to Kobo
  const grandTotal = totalPrice + deliveryFee;

  const summaryHTML = `
    <h2>Order Summary</h2>
    <div class="breakdown-total item">
      <span>Items total (${cartQuantity})</span>
      <span>${formatNaira(totalPrice)}</span>
    </div>
    <div class="breakdown-total delivery">
      <span>Delivery fees</span>
      <span>${formatNaira(deliveryFee)}</span>
    </div>
    <div class="breakdown-total total">
      <span>Total</span>
      <span class="all-total">${formatNaira(grandTotal)}</span>
    </div>

    <div class="code-container">
      <div class="code-box">
        <input type="password" id="orderCode" placeholder=" ">
        <label>Enter code here</label>
      </div>
      <p class="error-text" style="color: red; font-size: 14px; display: none; margin-top: 6px;">
        Invalid or missing code. Please enter 1234 to continue.
      </p>
      <span class="apply-btn">Apply</span>
    </div>

    <button class="confirm-order-btn">Confirm Order</button>
  `;

  paymentSummaryEl.innerHTML = summaryHTML;

  // 🎯 Alert user of the code when the page loads
  alert("Use code 1234 to confirm your order ✅");

  const confirmBtn = paymentSummaryEl.querySelector(".confirm-order-btn");
  const codeInput = paymentSummaryEl.querySelector("#orderCode");
  const errorText = paymentSummaryEl.querySelector(".error-text");

  confirmBtn.addEventListener("click", () => {
    const enteredCode = codeInput.value.trim();

    if (enteredCode !== "1234") {
      errorText.style.display = "block"; 
      codeInput.focus();
      return;
    }

    errorText.style.display = "none";
    alert("🎉 Order confirmed successfully!");
    localStorage.clear();
    window.location.href = "index.html";
  });
}


window.addEventListener("DOMContentLoaded", () => {
  renderPaymentDetails();
  renderPaymentSummary();
});
