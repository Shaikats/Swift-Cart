const API = "https://fakestoreapi.com/products";
const categoryAPI = "https://fakestoreapi.com/products/categories";

/* ACTIVE PAGE HIGHLIGHTING */
window.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

/* MOBILE MENU TOGGLE */
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const menu = document.querySelector('.menu');

if (mobileMenuToggle && menu) {
    mobileMenuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        // Change icon based on menu state
        mobileMenuToggle.textContent = menu.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            mobileMenuToggle.textContent = '☰';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            menu.classList.remove('active');
            mobileMenuToggle.textContent = '☰';
        }
    });
}

function addToCart() {
    let count = document.getElementById("cart-count");
    count.innerText = Number(count.innerText) + 1;
}

const productContainer = document.getElementById("products-container");
const categoryContainer = document.getElementById("category-buttons");
const trendingContainer = document.getElementById("trending-products");

/* LOAD TRENDING PRODUCTS (Homepage - only 3) */
if (trendingContainer) {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const trending = data.slice(0, 3);
            showTrendingProducts(trending);
        });
}

/* SHOW TRENDING PRODUCTS */
function showTrendingProducts(products) {
    trendingContainer.innerHTML = "";
    
    products.forEach(product => {
        trendingContainer.innerHTML += `
      <div class="card">
        <div class="card-image">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div>
          <span class="card-category">Men's Clothing</span>
          <span class="card-rating">⭐ ${product.rating.rate}</span>
        </div>
        <h4>${product.title.substring(0, 50)}...</h4>
        <div class="price">$${product.price}</div>
        <div class="card-buttons">
          <button class="btn-details" onclick="openModal(${product.id})">
            <span>🔍</span> Details
          </button>
          <button class="btn-add" onclick="addToCart()">Add</button>
        </div>
      </div>
    `;
    });
}

/* LOAD ALL PRODUCTS (Products Page) */
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
        const capitalizedCat = cat.charAt(0).toUpperCase() + cat.slice(1);
        categoryContainer.innerHTML += `
      <button onclick="filterCategory('${cat}')">${capitalizedCat}</button>
    `;
    });
}

/* FILTER PRODUCTS */
function filterCategory(category) {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.category-buttons button');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => showProducts(data));
}

function loadAll() {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.category-buttons button');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to All button
    event.target.classList.add('active');
    
    fetch(API)
        .then(res => res.json())
        .then(data => showProducts(data));
}

/* SHOW PRODUCTS GRID */
function showProducts(products) {
    productContainer.innerHTML = "";

    products.forEach(product => {
        const categoryName = product.category || 'Product';
        productContainer.innerHTML += `
      <div class="card">
        <div class="card-image">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div>
          <span class="card-category">${categoryName}</span>
          <span class="card-rating">⭐ ${product.rating.rate}</span>
        </div>
        <h4>${product.title.substring(0, 50)}...</h4>
        <div class="price">$${product.price}</div>
        <div class="card-buttons">
          <button class="btn-details" onclick="openModal(${product.id})">
            <span>🔍</span> Details
          </button>
          <button class="btn-add" onclick="addToCart()">Add</button>
        </div>
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

            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = `
                <span id="close-modal">&times;</span>
                <img src="${product.image}" alt="${product.title}">
                <div class="modal-body">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <h4>$${product.price}</h4>
                    <button onclick="addToCart(); document.getElementById('product-modal').style.display='none'">Add to Cart</button>
                </div>
            `;
            
            // Re-attach close event after recreating content
            document.getElementById("close-modal").onclick = () => {
                document.getElementById("product-modal").style.display = "none";
            };
        });
}

const closeModalBtn = document.getElementById("close-modal");
if (closeModalBtn) {
    closeModalBtn.onclick = () => {
        document.getElementById("product-modal").style.display = "none";
    };
}

// Close modal when clicking outside
window.onclick = (event) => {
    const modal = document.getElementById("product-modal");
    if (modal && event.target === modal) {
        modal.style.display = "none";
    }
};

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

