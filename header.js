const filterBtn = document.querySelector(".filter-toggle");
const filterMenu = document.querySelector(".filter-menu");

if (filterBtn) {
  filterBtn.addEventListener("click", () => {
    if (filterMenu.style.display === "flex") {
      filterMenu.style.display = "none";
    } else {
      filterMenu.style.display = "flex";
    }
  });
}
