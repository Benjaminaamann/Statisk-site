"use strict";

// 1) Read category from URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category"); // e.g. "Accessories"

// 2) Elements
const grid = document.querySelector(".product-grid");
const template = document.querySelector("#product-card-template");
const title = document.querySelector(".page-title");
const buttons = document.querySelectorAll(".filter-btn");

// 3) Store products for filtering
let allProducts = [];

// Show category in the heading
if (title && category) title.textContent = category;

// 4) Fetch products for chosen category (limit 30 so filter has enough)
const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(
  category,
)}&limit=30`;

fetch(endpoint)
  .then((res) => res.json())
  .then((products) => {
    allProducts = products;

    // Show all first (10 products)
    renderProducts(allProducts.slice(0, 10));
  });

// 5) Filter buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // active class (optional)
    buttons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const chosen = btn.textContent.trim(); // "All", "Men", "Women", "Unisex"

    let filtered =
      chosen === "All"
        ? allProducts
        : allProducts.filter((p) => p.gender === chosen);

    renderProducts(filtered.slice(0, 10));
  });
});

// 6) Render function
function renderProducts(products) {
  grid.innerHTML = "";

  products.forEach((product) => {
    const clone = template.content.cloneNode(true);

    // Image
    const img = clone.querySelector(".product-image");
    img.src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    img.alt = product.productdisplayname;

    // Text
    clone.querySelector(".product-name").textContent =
      product.productdisplayname;
    clone.querySelector(".product-brand").textContent =
      `Brand: ${product.brandname}`;
    clone.querySelector(".product-season").textContent =
      `Season: ${product.season}`;

    // Price (simple)
    clone.querySelector(".price-now").textContent = `${product.price} DKK`;

    // Link
    clone.querySelector(".see-product").href = `product.html?id=${product.id}`;

    // Clean optional fields if they exist in template
    const oldPrice = clone.querySelector(".price-old");
    if (oldPrice) oldPrice.textContent = "";

    const badges = clone.querySelector(".product-badges");
    if (badges) badges.innerHTML = "";

    grid.appendChild(clone);
  });
}
