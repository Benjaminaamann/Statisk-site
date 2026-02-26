"use strict";

const API_CATEGORIES = "https://kea-alt-del.dk/t7/api/categories";
const container = document.querySelector("#category_list_container");

// Optional “nice” descriptions (API returnerer kun category name)
const categoryDescriptions = {
  Accessories: "Bags, caps and everyday add-ons.",
  Apparel: "Sportswear and casual essentials.",
  Footwear: "Sneakers and shoes.",
  "Free Items": "Giveaways and campaign items.",
  "Personal Care": "Grooming and personal essentials.",
  "Sporting Goods": "Gear for training and active life.",
};

fetch(API_CATEGORIES)
  .then((res) => {
    if (!res.ok) throw new Error("Could not load categories");
    return res.json();
  })
  .then(showCategories)
  .catch((err) => {
    console.error(err);
    container.innerHTML = `
      <article class="category-card">
        <h3>Could not load categories</h3>
        <p>Please try again later.</p>
      </article>
    `;
  });

function showCategories(categories) {
  // API giver fx: [{id: 1, category: "Accessories"}, ...]
  container.innerHTML = "";

  categories.forEach((item) => {
    const name = item.category;

    const article = document.createElement("article");
    article.className = "category-card";

    const h3 = document.createElement("h3");
    h3.textContent = name;

    const p = document.createElement("p");
    p.textContent = categoryDescriptions[name] ?? "Explore this category.";

    const a = document.createElement("a");
    a.className = "see-selection";
    a.textContent = "See selection →";
    a.href = `productlist.html?category=${encodeURIComponent(name)}`;

    article.append(h3, p, a);
    container.append(article);
  });
}
