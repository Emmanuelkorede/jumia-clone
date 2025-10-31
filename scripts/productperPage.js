import { products } from "../data/products.js";
import { addToCart, updateCartQuantity } from "../data/cart.js";
import { formatNaira } from "./utils/money.js";

const productpageContainer = document.querySelector(".js-product-perpage");

function renderProductPerPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    productpageContainer.innerHTML = `<p>No product ID found .</p>`;
    return;
  }

  const perProduct = products.find((p) => p.id === id);

  if (!perProduct) {
    productpageContainer.innerHTML = `<p>Product not found!</p>`;
    return;
  }

  const productPerPageHtml = `
    <div class="viewed-product">
      <div class="product-image">
        <img src="${perProduct.image}" alt="${perProduct.name}">
      </div>
      <div class="product-info">
        <h3>${perProduct.name}</h3>
        <div class="rating">
          <img src="images/ratings/rating-${perProduct.rating.stars * 10}.png" alt="Rating">
          <span>${perProduct.rating.count} reviews</span>
        </div>
        <p class="price">${formatNaira(perProduct.priceKobo)}</p>
        <button class="add-to-cart-btn" data-id="${perProduct.id}">Add to Cart</button>
      </div>
    </div>
  `;

  productpageContainer.innerHTML = productPerPageHtml;

  document.querySelectorAll('.add-to-cart-btn').forEach((addToCartBtn) => {
    addToCartBtn.addEventListener('click', () => {
      const productId = addToCartBtn.dataset.id;
      addToCart(productId);
      updateCartQuantity();
    });
  });
}

function renderProductPerPageDelivery() {
  const today = dayjs();
  const deliveryStart = today.add(5, "day");
  const deliveryEnd = today.add(7, "day");

  const pickupDates = document.querySelectorAll(".pickup .delivery-date");
  const pickupMonth = document.querySelector(".pickup .delivery-month");
  if (pickupDates.length >= 2 && pickupMonth) {
    pickupDates[0].textContent = deliveryStart.format("DD");
    pickupDates[1].textContent = deliveryEnd.format("DD");
    pickupMonth.textContent = deliveryEnd.format("MMMM");
  }

  const doorDates = document.querySelectorAll(".door .delivery-date");
  const doorMonth = document.querySelector(".door .delivery-month");
  if (doorDates.length >= 2 && doorMonth) {
    doorDates[0].textContent = deliveryStart.format("DD");
    doorDates[1].textContent = deliveryEnd.format("DD");
    doorMonth.textContent = deliveryEnd.format("MMMM");
  }
}

const stateSelect = document.getElementById('state') ;
const areaSelect = document.getElementById('area') ;

stateSelect.addEventListener('change', selectLocation) ;
areaSelect.addEventListener('change' , selectLocation)

function selectLocation() {
  const selectedState = stateSelect.value ;
  const selectedArea = areaSelect.value ;

  localStorage.setItem('selectedState' , selectedState) ;
  localStorage.setItem('selectedArea' , selectedArea) ;
}

// DELIVERY SELECTION & FEES
const deliveryRadios = document.querySelectorAll('input[name="deliveryType"]');
const selectedDeliveryText = document.querySelector('.selected-delivery');

deliveryRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    let deliveryType = radio.value;
    let deliveryFee = deliveryType === 'door' ? 1000 : 500;

    localStorage.setItem('deliveryType', deliveryType);
    localStorage.setItem('deliveryFee', deliveryFee);

    selectedDeliveryText.textContent = `Selected: ${deliveryType === 'door' ? 'Door Delivery' : 'Pickup Station'} (₦${deliveryFee})`;
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const savedType = localStorage.getItem('deliveryType');
  const savedFee = localStorage.getItem('deliveryFee');

  if (savedType && savedFee) {
    document.querySelector(`input[value="${savedType}"]`).checked = true;
    selectedDeliveryText.textContent = `Selected: ${savedType === 'door' ? 'Door Delivery' : 'Pickup Station'} (₦${savedFee})`;
  }
});

// PICKUP DETAILS SAVE
const nameInput = document.getElementById('pickup-name');
const addressInput = document.getElementById('pickup-address');
const saveBtn = document.getElementById('save-pickup-details');
const saveMsg = document.querySelector('.save-message');

saveBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const address = addressInput.value.trim();

  if (!name || !address) {
    alert('Please fill in both your name and address.');
    return;
  }

  // Save to localStorage
  localStorage.setItem('pickupName', name);
  localStorage.setItem('pickupAddress', address);

  // Feedback message
  saveMsg.style.display = 'block';
  saveMsg.textContent = 'Details saved!';
  setTimeout(() => (saveMsg.style.display = 'none'), 2000);
});

// Load saved details (if available)
window.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem('pickupName');
  const savedAddress = localStorage.getItem('pickupAddress');

  if (savedName) nameInput.value = savedName;
  if (savedAddress) addressInput.value = savedAddress;
});


renderProductPerPage();
renderProductPerPageDelivery()
