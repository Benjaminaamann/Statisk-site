"use strict";

const endpoint = "https://kea-alt-del.dk/t7/api/products?limit=10";

document.addEventListener("DOMContentLoaded", init);

function init() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showProducts);
}

function showProducts(products) {
  const grid = document.querySelector(".product-grid");
  const template = document.querySelector("#product-card-template");

  grid.innerHTML = "";

  products.forEach((product) => {
    const clone = template.content.cloneNode(true);

    // Image
    clone.querySelector(".product-image").src =
      `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    clone.querySelector(".product-image").alt = product.productdisplayname;

    // Text
    clone.querySelector(".product-name").textContent =
      product.productdisplayname;
    clone.querySelector(".product-brand").textContent =
      `Brand: ${product.brandname}`;
    clone.querySelector(".product-season").textContent =
      `Season: ${product.season}`;

    // Link to product page
    clone.querySelector(".see-product").href = `product.html?id=${product.id}`;

    // Conditional rendering (betinget visning)
    const card = clone.querySelector(".product-card");

    const saleBadge = clone.querySelector(".badge-sale");
    const soldoutBadge = clone.querySelector(".badge-soldout");

    const priceNow = clone.querySelector(".price-now");
    const priceOld = clone.querySelector(".price-old");

    // SOLD OUT
    if (product.soldout) {
      card.classList.add("soldOut");
    } else {
      soldoutBadge.remove(); // if not sold out, remove badge
    }

    // DISCOUNT
    if (product.discount) {
      card.classList.add("onSale");
      saleBadge.textContent = `-${product.discount}%`;

      const newPrice = Math.round(
        product.price - (product.price * product.discount) / 100,
      );
      priceNow.textContent = `${newPrice} DKK`;
      priceOld.textContent = `${product.price} DKK`;
    } else {
      saleBadge.remove(); // if no discount, remove badge
      priceNow.textContent = `${product.price} DKK`;
      priceOld.remove(); // remove old price if not needed
    }

    grid.appendChild(clone);
  });
}
