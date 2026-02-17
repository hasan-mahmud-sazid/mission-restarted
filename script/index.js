// কমন কন্টেইনারগুলো সিলেক্ট করা
const trendingContainer = document.getElementById("product-container"); // হোম পেজের জন্য
const allProductsContainer = document.getElementById("all-products-container"); // প্রোডাক্ট পেজের জন্য

async function fetchProducts() {
  // যদি হোম পেজে থাকে (লিমিট ৩)
  if (trendingContainer) {
    const response = await fetch("https://fakestoreapi.com/products?limit=3");
    const data = await response.json();
    displayData(data, trendingContainer);
  }

  // যদি প্রোডাক্ট পেজে থাকে (সব প্রোডাক্ট)
  if (allProductsContainer) {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    displayData(data, allProductsContainer);
  }
}

// ডাটা রেন্ডার করার কমন ফাংশন
function displayData(data, container) {
  container.innerHTML = "";
  data.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className =
      "bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col";
    productCard.innerHTML = `
        <div class="bg-[#F3F4F6] p-8 flex justify-center items-center h-64">
            <img src="${product.image}" alt="${product.title}" class="h-full object-contain mix-blend-multiply">
        </div>
        <div class="p-5 flex-grow">
            <div class="flex justify-between items-center mb-2">
                <span class="bg-indigo-50 text-indigo-600 text-xs font-semibold px-2 py-1 rounded">
                    ${product.category}
                </span>
                <div class="flex items-center text-sm text-gray-500">
                    <span class="text-yellow-400 mr-1">★</span>
                    ${product.rating.rate} (${product.rating.count})
                </div>
            </div>
            <h3 class="text-lg font-bold text-slate-800 truncate mb-1">${product.title}</h3>
            <p class="text-xl font-extrabold text-slate-900">$${product.price}</p>
        </div>
        <div class="p-5 pt-0 grid grid-cols-2 gap-3">
            <button class="border border-gray-200 text-slate-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-50 flex items-center justify-center gap-2">Details</button>
            <button class="bg-indigo-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2">Add</button>
        </div>`;
    container.appendChild(productCard);
  });
}

// বর্তমান পেজের URL চেক করে Navbar Active করা
function setActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".menu-horizontal a");

  navLinks.forEach((link) => {
    // যদি লিঙ্কের href বর্তমান URL-এর সাথে মিলে যায়
    if (
      link.getAttribute("href") &&
      currentPath.includes(link.getAttribute("href"))
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

// পেজ লোড হওয়ার সাথে সাথে রান হবে
setActiveNav();

// পেজ লোড হলে ফাংশন কল
fetchProducts();
