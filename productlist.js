const endpoint = "https://kea-alt-del.dk/t7/api/products?limit=30";

const grid = document.querySelector(".product-grid");
const template = document.querySelector("#product-card-template");
const filterButtons = document.querySelectorAll(".filter-btn");

let allProducts = [];

// 1) Fetch produkter (limit 30)
fetch(endpoint)
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    renderProducts(allProducts);
  });

// 2) Filter-knapper
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Vis aktiv knap (valgfrit men simpelt)
    filterButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    // Læs tekstindholdet fra knappen (som i undervisningen)
    const chosen = btn.textContent.trim();

    const filtered =
      chosen === "All"
        ? allProducts
        : allProducts.filter((product) => product.gender === chosen);

    renderProducts(filtered);
  });
});

// 3) Render til DOM
function renderProducts(products) {
  grid.innerHTML = "";

  products.forEach((product) => {
    const clone = template.content.cloneNode(true);

    // Billede (KEA endpoint bruger produktets id)
    const img = clone.querySelector(".product-image");
    img.src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    img.alt = product.productdisplayname;

    // Tekst
    clone.querySelector(".product-name").textContent =
      product.productdisplayname;
    clone.querySelector(".product-brand").textContent =
      `Brand: ${product.brandname}`;
    clone.querySelector(".product-season").textContent =
      `Season: ${product.season}`;

    // Pris (simpelt)
    clone.querySelector(".price-now").textContent = `${product.price} DKK`;
    clone.querySelector(".price-old").textContent = "";

    // Link til product.html (id i url)
    clone.querySelector(".see-product").href = `product.html?id=${product.id}`;

    grid.appendChild(clone);
  });
}
