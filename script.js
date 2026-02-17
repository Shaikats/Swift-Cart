const API = "https://fakestoreapi.com/products";

fetch(API)
    .then(res => res.json())
    .then(data => showTrending(data.slice(0, 3)));

function showTrending(products) {

    const container = document.getElementById("trending-products");

    products.forEach(product => {

        container.innerHTML += `
      <div class="card">
        <img src="${product.image}" width="100%">
        <h4>${product.title.substring(0, 40)}...</h4>
        <p>$${product.price}</p>
        <button onclick="addToCart()">Add</button>
      </div>
    `;

    });
}

function addToCart() {
    let count = document.getElementById("cart-count");
    count.innerText = Number(count.innerText) + 1;
}

function showTrending(products) {

    const container = document.getElementById("trending-products");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
      <div class="card">
        <img src="${product.image}">
        <h4>${product.title.substring(0, 40)}...</h4>
        <div class="price">$${product.price}</div>
        <button onclick="addToCart()">Add to Cart</button>
      </div>
    `;

    });
}


const API = "https://fakestoreapi.com/products";
const categoryAPI = "https://fakestoreapi.com/products/categories";

const productContainer = document.getElementById("products-container");
const categoryContainer = document.getElementById("category-buttons");

/* LOAD ALL PRODUCTS */
fetch(API)
    .then(res => res.json())
    .then(data => showProducts(data));

/* LOAD CATEGORIES */
fetch(categoryAPI)
    .then(res => res.json())
    .then(data => loadCategories(data));

function loadCategories(categories) {

    categoryContainer.innerHTML = `<button class="active" onclick="loadAll()">All</button>`;

    categories.forEach(cat => {
        categoryContainer.innerHTML += `
      <button onclick="filterCategory('${cat}')">${cat}</button>
    `;
    });
}

/* FILTER PRODUCTS */
function filterCategory(category) {

    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => showProducts(data));
}

function loadAll() {
    fetch(API)
        .then(res => res.json())
        .then(data => showProducts(data));
}

/* SHOW PRODUCTS GRID*
