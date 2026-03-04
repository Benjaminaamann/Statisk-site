const category = new URLSearchParams(window.location.search).get("category");

const endpoint = `https://kea-alt-del.dk/t7/api/products?category=${category}`;

const container = document.querySelector(".product-grid");

function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then(showProducts);
}

function showProducts(products) {
  let markup = "";

  products.slice(0, 10).forEach((product) => {
    markup += `
      <article class="product-card">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">

        <h3>${product.productdisplayname}</h3>

        <p>Brand: ${product.brandname} • Season: ${product.season}</p>

        <p>${product.price} DKK</p>

        <a href="product.html?id=${product.id}">See product</a>
      </article>
    `;
  });

  container.innerHTML = markup;
}

getData();
