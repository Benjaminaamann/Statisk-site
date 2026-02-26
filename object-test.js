const output = document.querySelector("#movie-output");

async function getProducts() {
  try {
    const response = await fetch(
      "https://kea-alt-del.dk/t7/api/products?limit=4",
    );
    const products = await response.json();

    console.log("Products from API:", products);

    let html = "";

    products.forEach((product) => {
      html += `
        <article style="background:#fff; padding:16px; border-radius:12px; box-shadow:0 10px 22px rgba(0,0,0,.06);">
          <h3 style="margin:0 0 10px; font-weight:900; font-style:italic;">
            ${product.productdisplayname}
          </h3>
          <p style="margin:0 0 6px; font-style:italic;">
            Brand: ${product.brandname}
          </p>
          <p style="margin:0; font-style:italic;">
            Price: ${product.price} DKK
          </p>
        </article>
      `;
    });

    output.innerHTML = `
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
        ${html}
      </div>
    `;
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

getProducts();
