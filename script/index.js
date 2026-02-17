const trendingContainer = document.getElementById("product-container");
const allProductsContainer = document.getElementById("all-products-container");
let allProductsData = [];

async function fetchProducts() {
  try {
    if (trendingContainer) {
      const response = await fetch("https://fakestoreapi.com/products?limit=3");
      const data = await response.json();
      displayData(data, trendingContainer);
    }

    if (allProductsContainer) {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      allProductsData = data;
      displayData(data, allProductsContainer);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayData(data, container) {
  if (!container) return;
  container.innerHTML = "";

  data.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className =
      "bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300";

    productCard.innerHTML = `
        <div class="bg-[#F3F4F6] p-8 flex justify-center items-center h-64 relative overflow-hidden">
            <img src="${product.image}" alt="${product.title}" 
                 class="h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300">
        </div>
        <div class="p-5 flex-grow">
            <div class="flex justify-between items-center mb-2">
                <span class="bg-indigo-50 text-indigo-600 text-[10px] uppercase font-bold px-2 py-1 rounded">
                    ${product.category}
                </span>
                <div class="flex items-center text-sm text-gray-500">
                    <span class="text-yellow-400 mr-1">★</span>
                    ${product.rating.rate}
                </div>
            </div>
            <h3 class="text-md font-bold text-slate-800 truncate mb-1" title="${product.title}">${product.title}</h3>
            <p class="text-xl font-extrabold text-slate-900">$${product.price}</p>
        </div>
        <div class="p-5 pt-0 grid grid-cols-2 gap-3">
            <button class="border border-gray-200 text-slate-700 py-2 px-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Details</button>
            <button class="bg-indigo-600 text-white py-2 px-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-1">
                <i class="fa-solid fa-cart-plus"></i> Add
            </button>
        </div>`;
    container.appendChild(productCard);
  });
}

function filterByCategory(category) {
  let filteredData;

  if (category === "all") {
    filteredData = allProductsData;
  } else {
    filteredData = allProductsData.filter(
      (product) => product.category === category,
    );
  }

  displayData(filteredData, allProductsContainer);
  updateFilterButtons(category);
}

function updateFilterButtons(activeCategory) {
  const buttons = document.querySelectorAll("#category-container button");
  buttons.forEach((btn) => {
    if (btn.innerText.toLowerCase().includes(activeCategory.split("'")[0])) {
      btn.classList.add("bg-indigo-600", "text-white");
      btn.classList.remove("bg-gray-100", "text-gray-600");
    } else {
      btn.classList.remove("bg-indigo-600", "text-white");
      btn.classList.add("bg-gray-100", "text-gray-600");
    }
  });
}

function setActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".menu-horizontal a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    link.classList.remove(
      "text-indigo-600",
      "border-b-2",
      "border-indigo-600",
      "rounded-none",
    );
    link.classList.add("text-slate-600");

    if (
      currentPath.includes(href) ||
      (currentPath === "/" && href === "index.html")
    ) {
      link.classList.add(
        "text-indigo-600",
        "border-b-2",
        "border-indigo-600",
        "rounded-none",
      );
      link.classList.remove("text-slate-600");
    }
  });
}
setActiveNav();
fetchProducts();
