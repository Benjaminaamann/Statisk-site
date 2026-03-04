"use strict";

const container = document.querySelector("#category_list_container");
const endpoint = "https://kea-alt-del.dk/t7/api/categories";

fetch(endpoint)
  .then((res) => res.json())
  .then(showCategories);

function showCategories(categories) {
  container.innerHTML = "";

  categories.forEach((cat) => {
    const name = cat.category;

    const article = document.createElement("article");
    article.classList.add("category-card");

    article.innerHTML = `
      <h3>${name}</h3>
      <p>Explore products in this category.</p>
      <a class="see-selection" href="productlist.html?category=${encodeURIComponent(name)}">See selection →</a>
    `;

    container.appendChild(article);
  });
}
