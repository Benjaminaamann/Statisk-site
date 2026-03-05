"use strict";

const params = new URLSearchParams(window.location.search);
const category = params.get("category"); // e.g. "Accessories"

const grid = document.querySelector(".product-grid");
const template = document.querySelector("#product-card-template");
const title = document.querySelector(".page-title");
const buttons = document.querySelectorAll(".filter-btn");

let allProducts = [];

if (title && category) title.textContent = category;

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(
  category,
)}&limit=30`;

fetch(endpoint)
  .then((res) => res.json())
  .then((products) => {
    allProducts = products;

    renderProducts(allProducts.slice(0, 10));
  });

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const chosen = btn.textContent.trim();

    let filtered =
      chosen === "All"
        ? allProducts
        : allProducts.filter((p) => p.gender === chosen);

    renderProducts(filtered.slice(0, 10));
  });
});

function renderProducts(products) {
  grid.innerHTML = "";

  products.forEach((product) => {
    const clone = template.content.cloneNode(true);

    const img = clone.querySelector(".product-image");
    img.src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    img.alt = product.productdisplayname;

    clone.querySelector(".product-name").textContent =
      product.productdisplayname;
    clone.querySelector(".product-brand").textContent =
      `Brand: ${product.brandname}`;
    clone.querySelector(".product-season").textContent =
      `Season: ${product.season}`;

    clone.querySelector(".price-now").textContent = `${product.price} DKK`;

    clone.querySelector(".see-product").href = `product.html?id=${product.id}`;

    const oldPrice = clone.querySelector(".price-old");
    if (oldPrice) oldPrice.textContent = "";

    const badges = clone.querySelector(".product-badges");
    if (badges) badges.innerHTML = "";

    grid.appendChild(clone);
  });
}
