const trendingContainer = document.getElementById("product-container");
const allProductsContainer = document.getElementById("all-products-container");
const categoryContainer = document.getElementById("category-container");
let allProductsData = [];

async function loadCategories() {
  if (!categoryContainer) return;
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await res.json();

    categoryContainer.innerHTML = `<button onclick="filterByCategory('all')" class="btn btn-sm rounded-full bg-indigo-600 text-white border-none px-6">All</button>`;

    categories.forEach((category) => {
      const btn = document.createElement("button");
      btn.onclick = () => filterByCategory(category);
      btn.className =
        "btn btn-sm rounded-full bg-gray-100 text-gray-600 border-none px-6 hover:bg-indigo-100 capitalize transition-all";
      btn.innerText = category;
      categoryContainer.appendChild(btn);
    });
  } catch (err) {
    console.error("Category Load Error:", err);
  }
}

async function fetchProducts() {
  try {
    if (trendingContainer) {
      const res = await fetch("https://fakestoreapi.com/products?limit=3");
      const data = await res.json();
      displayData(data, trendingContainer);
    }
    if (allProductsContainer) {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      allProductsData = data;
      displayData(data, allProductsContainer);
    }
  } catch (err) {
    console.error("Product Fetch Error:", err);
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
                <img src="${product.image}" alt="${product.title}" class="h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300">
            </div>
            <div class="p-5 flex-grow">
                <div class="flex justify-between items-center mb-2">
                    <span class="bg-indigo-50 text-indigo-600 text-[10px] uppercase font-bold px-2 py-1 rounded">${product.category}</span>
                    <div class="flex items-center text-sm text-gray-500">
                        <span class="text-yellow-400 mr-1">★</span> ${product.rating.rate}
                    </div>
                </div>
                <h3 class="text-md font-bold text-slate-800 truncate mb-1" title="${product.title}">${product.title}</h3>
                <p class="text-xl font-extrabold text-slate-900">$${product.price}</p>
            </div>
            <div class="p-5 pt-0 grid grid-cols-2 gap-3">
                <button onclick="showDetails(${product.id})" class="border border-gray-200 text-slate-700 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Details</button>
                <button onclick="showToast()" class="bg-indigo-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-1">
                    <i class="fa-solid fa-cart-plus"></i> Add
                </button>
            </div>`;
    container.appendChild(productCard);
  });
}

function filterByCategory(category) {
  const filtered =
    category === "all"
      ? allProductsData
      : allProductsData.filter((p) => p.category === category);
  displayData(filtered, allProductsContainer);

  const buttons = document.querySelectorAll("#category-container button");
  buttons.forEach((btn) => {
    if (
      btn.innerText.toLowerCase() === category.toLowerCase() ||
      (category === "all" && btn.innerText === "All")
    ) {
      btn.classList.add("bg-indigo-600", "text-white");
      btn.classList.remove("bg-gray-100", "text-gray-600");
    } else {
      btn.classList.remove("bg-indigo-600", "text-white");
      btn.classList.add("bg-gray-100", "text-gray-600");
    }
  });
}

async function showDetails(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  const modalContainer = document.getElementById("modal-content");
  modalContainer.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6 p-4">
            <div class="md:w-1/2 flex justify-center bg-gray-50 p-4 rounded-xl">
                <img src="${product.image}" class="max-h-64 object-contain mix-blend-multiply">
            </div>
            <div class="md:w-1/2">
                <h3 class="text-2xl font-bold text-slate-900 mb-2">${product.title}</h3>
                <p class="text-indigo-600 font-bold text-xl mb-4">$${product.price}</p>
                <p class="text-slate-500 text-sm leading-relaxed mb-6">${product.description}</p>
                <div class="flex items-center gap-4">
                    <span class="badge badge-warning p-3">Rating: ${product.rating.rate} ★</span>
                    <button onclick="showToast()" class="btn btn-primary bg-indigo-600 border-none flex-grow">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
  product_details_modal.showModal();
}

function showToast() {
  const toast = document.getElementById("toast-container");
  if (toast) {
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3000);
  }
}

function setActiveNav() {
  const currentPath = window.location.pathname;
  document.querySelectorAll(".menu-horizontal a").forEach((link) => {
    const href = link.getAttribute("href");
    if (currentPath.includes(href)) {
      link.classList.add("text-indigo-600", "border-b-2", "border-indigo-600");
      link.classList.remove("text-slate-600");
    }
  });
}

loadCategories();
fetchProducts();
setActiveNav();
