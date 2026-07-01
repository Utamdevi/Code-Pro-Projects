// --- 20 Item E-Commerce Catalog with Realistic Local Pricing (PKR) ---
const products = [
    { id: 1, title: "Wireless Headphones", category: "electronics", price: 24500, image: "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D" },
    { id: 2, title: "Nike Shoes", category: "footwear", price: 33500, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvZXMlMjBuaWtlfGVufDB8fDB8fHww" },
    { id: 3, title: "Minimalist Leather Cardholder", category: "accessories", price: 12500, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60" },
    { id: 4, title: "Smartwatch", category: "electronics", price: 69000, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnR3YXRjaGVzfGVufDB8fDB8fHww" },
    { id: 5, title: "Water-Resistant Bag Pack", category: "accessories", price: 21000, image: "https://media.istockphoto.com/id/2277757937/photo/black-minimalist-travel-and-tech-backpack-isolated-on-a-clean-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=mQR4zRlZ2CD5W-A4jl3DDNuiZWumq6Gkp84Y3BuoQrU=" },
    { id: 6, title: "Denim Jacket", category: "apparel", price: 18000, image: "https://media.istockphoto.com/id/2207502035/photo/denim-jacket-isolated-on-white-nobody-trendy-fashion-denim-clothing-single-object.webp?a=1&b=1&s=612x612&w=0&k=20&c=_wKUaSPuMKAUS-oRHzfHyybHrxzRbLDgLzc4QgLrwgE=" },
    { id: 7, title: "Mechanical Keyboard", category: "electronics", price: 30500, image:"https://media.istockphoto.com/id/1980026198/photo/mechanical-custom-keyboard-on-a-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=whr_NucPvEY2lC3NeXyx-T5K2PirXPdNLqy4_XPC3n0=" },
    { id: 8, title: "Tee_Shirt", category: "apparel", price: 8000, image: "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww" },
    { id: 9, title: "Office Chair", category: "accessories", price: 50000, image:"https://media.istockphoto.com/id/118198399/photo/office-chair.webp?a=1&b=1&s=612x612&w=0&k=20&c=YCLpqdb9XJAAtJS51itWlr0odAP89jbstukhTU9nAJY=" },
    { id: 10, title: "Unisex Off-White High Tops", category: "footwear", price: 15500, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60" },
    { id: 11, title: "Portable Waterproof Speaker", category: "electronics", price: 9800, image: "https://plus.unsplash.com/premium_photo-1779202458672-6abd0c2e3454?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UG9ydGFibGUlMjBXYXRlcnByb29mJTIwU3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 12, title: "Sunglasses", category: "accessories", price: 26500, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60" },
    { id: 13, title: "Sleek Ultra-Wide Desktop Monitor", category: "electronics", price: 83000, image:"https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2xlZWslMjBVbHRyYS1XaWRlJTIwRGVza3RvcCUyME1vbml0b3J8ZW58MHx8MHx8fDA%3D" },
    { id: 14, title: "Water-Repellent Jacket", category: "apparel", price: 23500, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60" },
    { id: 15, title: "All-Weather Trail Shoe", category: "footwear", price: 39000, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&auto=format&fit=crop&q=60" },
    { id: 16, title: "Vacuum Insulated Flask", category: "fitness", price: 11000, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60" },
    { id: 17, title: "Premium Steel Dumbbell Set", category: "fitness", price: 61500, image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500&auto=format&fit=crop&q=60" },
    { id: 18, title: "Silent Wireless Mouse", category: "electronics", price: 16500, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2lsZW50JTIwV2lyZWxlc3MlMjBQcmVjaXNpb24lMjBNb3VzZXxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 19, title: "Relaxed Fit Fleece Hoodie", category: "apparel", price: 14000, image: "https://images.unsplash.com/photo-1512400930990-e0bc0bd809df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9vZGllc3xlbnwwfHwwfHx8MA%3D%3D" },
    { id: 20, title: "Lightweight Hydration Pack", category: "fitness", price: 25000, image:"https://images.unsplash.com/photo-1535879335191-618713ec3e3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SHlkcmF0aW9uJTIwUGFjayUyMGluJTIwZml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D" }
];

// --- Pagination State Configuration ---
let currentPage = 1;
const itemsPerPage = 8; 
let filteredProducts = [...products];

// --- DOM Nodes ---
const galleryGrid = document.getElementById('gallery-grid');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const priceVal = document.getElementById('price-val');
const paginationControls = document.getElementById('pagination-controls');

// --- Helper: Format numbers to local presentation style ---
function formatPrice(amount) {
    return "Rs. " + amount.toLocaleString('en-PK');
}

// --- Control Filtering and Render Engines ---
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const maxPrice = parseFloat(priceFilter.value);

    // Update the filtered price badge layout dynamically
    priceVal.textContent = maxPrice.toLocaleString('en-PK');

    filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesPrice = product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    currentPage = 1; 
    renderGallery();
}

function renderGallery() {
    galleryGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        galleryGrid.innerHTML = `<div class="no-results">No pieces match your search criteria. Try modifying filters.</div>`;
        paginationControls.innerHTML = '';
        return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

    productsToDisplay.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <div class="image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
            </div>
        `;
        galleryGrid.appendChild(card);
    });

    renderPagination();
}

function renderPagination() {
    paginationControls.innerHTML = '';
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    if (totalPages <= 1) return;

    // Previous Button
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('page-btn');
    prevBtn.textContent = '←';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => changePage(currentPage - 1));
    paginationControls.appendChild(prevBtn);

    // Numeric Dynamic Nodes
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.classList.add('page-btn');
        if (i === currentPage) pageBtn.classList.add('active');
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => changePage(i));
        paginationControls.appendChild(pageBtn);
    }

    // Next Button
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('page-btn');
    nextBtn.textContent = '→';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => changePage(currentPage + 1));
    paginationControls.appendChild(nextBtn);
}

function changePage(pageNumber) {
    currentPage = pageNumber;
    renderGallery();
    window.scrollTo({ top: galleryGrid.offsetTop - 150, behavior: 'smooth' });
}

// --- Dynamic Input Observers ---
searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('input', filterProducts);

// Primary Trigger Execution
filterProducts();