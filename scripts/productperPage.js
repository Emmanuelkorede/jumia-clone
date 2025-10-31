import { products } from "../data/products.js";
import { addToCart, updateCartQuantity } from "../data/cart.js";

const productpageContainer = document.querySelector(".js-product-perpage");

function renderProductPerPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    productpageContainer.innerHTML = `<p>No product ID found in URL.</p>`;
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
        <p class="price">₦${(perProduct.priceKobo / 100).toLocaleString()}</p>
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

renderProductPerPage();
