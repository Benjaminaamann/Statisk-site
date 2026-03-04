const id = new URLSearchParams(window.location.search).get("id");

const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

fetch(endpoint)
  .then((res) => res.json())
  .then(showProduct);

function showProduct(product) {
  // Title + basic text
  document.querySelector(".product-title").textContent =
    product.productdisplayname;
  document.querySelector(".spec-brand").textContent = product.brandname;
  document.querySelector(".spec-category").textContent = product.category;
  document.querySelector(".spec-type").textContent = product.articletype;
  document.querySelector(".spec-season").textContent = product.season;
  document.querySelector(".spec-gender").textContent = product.gender;

  // Breadcrumb line (like in your design)
  document.querySelector(".product-breadcrumb").textContent =
    `${product.brandname} • ${product.gender} • ${product.articletype} • ${product.season}`;

  // Image
  const img = document.querySelector(".product-image");
  img.src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  img.alt = product.productdisplayname;

  // Stock
  document.querySelector(".product-stock").textContent = product.soldout
    ? "Out of stock"
    : "In stock";

  // Price + old price (discount)
  const priceEl = document.querySelector(".product-price");
  const oldPriceEl = document.querySelector(".product-old-price");

  if (product.discount) {
    // product.discount is in percent (e.g. 28)
    const newPrice = Math.round(product.price * (1 - product.discount / 100));
    priceEl.textContent = `${newPrice} DKK`;
    oldPriceEl.textContent = `${product.price} DKK`;
  } else {
    priceEl.textContent = `${product.price} DKK`;
    oldPriceEl.textContent = "";
  }

  // ✅ Description contains HTML -> use innerHTML so it renders correctly
  // If description is empty/null, show nothing.
  document.querySelector(".product-description").innerHTML = product.description
    ? product.description
    : "";
}
