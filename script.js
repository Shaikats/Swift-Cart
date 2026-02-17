const API = "https://fakestoreapi.com/products";
const categoryAPI = "https://fakestoreapi.com/products/categories";

function addToCart() {
    let count = document.getElementById("cart-count");
    count.innerText = Number(count.innerText) + 1;
}

const productContainer = document.getElementById("products-container");
const categoryContainer = document.getElementById("category-buttons");

/* LOAD ALL PRODUCTS */
if (productContainer && categoryContainer) {
    fetch(API)
        .then(res => res.json())
        .then(data => showProducts(data));

    /* LOAD CATEGORIES */
    fetch(categoryAPI)
        .then(res => res.json())
        .then(data => loadCategories(data));
}


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

/* SHOW PRODUCTS GRID */
function showProducts(products) {

    productContainer.innerHTML = "";

    products.forEach(product => {

        productContainer.innerHTML += `
      <div class="card">
        <img src="${product.image}">
        <h4>${product.title.substring(0, 40)}...</h4>
        <div class="price">$${product.price}</div>
        <p>⭐ ${product.rating.rate}</p>

        <button onclick="openModal(${product.id})">Details</button>
        <button onclick="addToCart()">Add</button>
      </div>
    `;
    });

}

/* MODAL */
function openModal(id) {

    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(product => {

            document.getElementById("product-modal").style.display = "flex";

            document.getElementById("modal-img").src = product.image;
            document.getElementById("modal-title").innerText = product.title;
            document.getElementById("modal-desc").innerText = product.description;
            document.getElementById("modal-price").innerText = "$" + product.price;

        });

}

const closeModalBtn = document.getElementById("close-modal");
if (closeModalBtn) {
    closeModalBtn.onclick = () => {
        document.getElementById("product-modal").style.display = "none";
    };
}

/* CONTACT FORM HANDLING */
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        console.log("Form submitted:", { name, email, subject, message });

        // Show success message
        contactForm.style.display = "none";
        document.getElementById("form-success").style.display = "block";

        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = "flex";
            document.getElementById("form-success").style.display = "none";
        }, 3000);
    });
}

/* FAQ TOGGLE */
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
        // Close other FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove("active");
            }
        });
        // Toggle current FAQ
        item.classList.toggle("active");
    });
});

