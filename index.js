document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("menu-items");
  const filterSelect = document.getElementById("filterSelect");
  const sortSelect = document.getElementById("sortSelect");

const DATA_URL = "https://raw.githubusercontent.com/arnoldni1/CyberBitesCafe/main/data.json";

  let menuItems = [];

  async function loadMenu() {
    try {
      const res = await fetch(DATA_URL);
      const data = await res.json();
      menuItems = data.mainMenu;
      renderMenu(menuItems);
    } catch (error) {
      console.error("Error loading data:", error);
      menuContainer.innerHTML = `<p class='text-danger'>Error loading menu data.</p>`;
    }
  }

  const renderMenu = (items) => {
    menuContainer.innerHTML = "";
    items.forEach(item => {
      const card = document.createElement("div");
      card.className = "col-md-4";
      card.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
            <span class="badge bg-info text-dark">${item.ingredients.join(", ")}</span>
          </div>
        </div>
      `;
      menuContainer.appendChild(card);
    });
  };

  // Filtering
  filterSelect.addEventListener("change", () => {
    const selected = filterSelect.value.toLowerCase();
    const filtered = selected === "all"
      ? menuItems
      : menuItems.filter(item => item.ingredients.includes(selected));
    renderMenu(filtered);
  });

  // Sorting
  sortSelect.addEventListener("change", () => {
    let sorted = [...menuItems];
    if (sortSelect.value === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    renderMenu(sorted);
  });

  loadMenu();
});
