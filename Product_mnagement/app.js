// Local Mock Data Store with 20 Products priced in PKR
let products = JSON.parse(localStorage.getItem('products')) || [
    { id: 101, name: "Smart LED TV 43\"", category: "Electronics", price: 78500, status: "In Stock" },
    { id: 102, name: "Stitched Linen Kurti", category: "Apparel & Clothing", price: 3499, status: "Low Stock" },
    { id: 103, name: "Automatic Water Dispenser", category: "Home Appliances", price: 4200, status: "In Stock" },
    { id: 104, name: "Basmati Rice Premium 5kg", category: "Groceries & Food", price: 1850, status: "In Stock" },
    { id: 105, name: "Wireless Bluetooth Earbuds", category: "Electronics", price: 2999, status: "Out of Stock" },
    { id: 106, name: "Leather Peshawari Chappal", category: "Apparel & Clothing", price: 4500, status: "In Stock" },
    { id: 107, name: "Microwave Oven 20L", category: "Home Appliances", price: 24500, status: "Low Stock" },
    { id: 108, name: "Organic Cooking Oil 5L", category: "Groceries & Food", price: 3150, status: "In Stock" },
    // --- 12 New Localized Products Added Below ---
    { id: 109, name: "Inverter Air Conditioner 1.5 Ton", category: "Home Appliances", price: 145000, status: "In Stock" },
    { id: 110, name: "Men's Cotton Shalwar Kameez Suit", category: "Apparel & Clothing", price: 5500, status: "In Stock" },
    { id: 111, name: "Mechanical Gaming Keyboard", category: "Electronics", price: 6800, status: "Low Stock" },
    { id: 112, name: "Premium Mix Dry Fruits 1kg", category: "Groceries & Food", price: 3400, status: "In Stock" },
    { id: 113, name: "Deep Fryer 3.5L", category: "Home Appliances", price: 16500, status: "Out of Stock" },
    { id: 114, name: "Embroidered Chiffon Dupatta", category: "Apparel & Clothing", price: 1950, status: "In Stock" },
    { id: 115, name: "10,000 mAh Fast Power Bank", category: "Electronics", price: 3800, status: "In Stock" },
    { id: 116, name: "Local Honey Natural 500g", category: "Groceries & Food", price: 1200, status: "Low Stock" },
    { id: 117, name: "Handheld Garment Steamer", category: "Home Appliances", price: 9500, status: "In Stock" },
    { id: 118, name: "Casual Denim Jacket", category: "Apparel & Clothing", price: 4200, status: "Out of Stock" },
    { id: 119, name: "Ergonomic Office Desk Lamp", category: "Electronics", price: 2450, status: "In Stock" },
    { id: 120, name: "Spices Combo Pack (5 Items)", category: "Groceries & Food", price: 950, status: "In Stock" }
];

// App Global States
let currentEditId = null;
let sortDirection = { name: true, price: true };

// DOM Element Selectors
const tableBody = document.getElementById('productTableBody');
const mobileGrid = document.getElementById('productMobileGrid');
const modal = document.getElementById('productModal');
const productForm = document.getElementById('productForm');
const modalTitle = document.getElementById('modalTitle');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    setupEventListeners();
});

// Primary Rendering Routing Engine
function renderApp() {
    localStorage.setItem('products', JSON.stringify(products));
    const filteredProducts = applyFiltersAndSearch();
    renderDesktopTable(filteredProducts);
    renderMobileGrid(filteredProducts);
}

// Filter and Search Logic
function applyFiltersAndSearch() {
    const searchVal = searchInput.value.toLowerCase().trim();
    const filterVal = categoryFilter.value;

    return products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchVal);
        const matchesCategory = filterVal === 'all' || product.category === filterVal;
        return matchesSearch && matchesCategory;
    });
}

// PKR Currency Formatting Utility
function formatPKR(amount) {
    return '₨ ' + amount.toLocaleString('en-PK');
}

// Render Desktop Table Layout
function renderDesktopTable(data) {
    tableBody.innerHTML = '';
    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="px-6 py-10 text-center text-sm text-gray-400">No matching products in inventory.</td></tr>`;
        return;
    }

    data.forEach(product => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-gray-800/50 transition-colors";
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">#${product.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-100 font-medium">
                <span class="view-mode-${product.id}">${product.name}</span>
                <input type="text" value="${product.name}" class="hidden edit-mode-${product.id} px-2 py-1 inline-edit-dark text-sm border rounded" data-field="name">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                <span class="view-mode-${product.id}">${product.category}</span>
                <select class="hidden edit-mode-${product.id} px-2 py-1 inline-edit-dark text-sm border rounded" data-field="category">
                    <option value="Electronics" ${product.category === 'Electronics' ? 'selected' : ''}>Electronics</option>
                    <option value="Apparel & Clothing" ${product.category === 'Apparel & Clothing' ? 'selected' : ''}>Apparel & Clothing</option>
                    <option value="Groceries & Food" ${product.category === 'Groceries & Food' ? 'selected' : ''}>Groceries & Food</option>
                    <option value="Home Appliances" ${product.category === 'Home Appliances' ? 'selected' : ''}>Home Appliances</option>
                </select>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-400">
                <span class="view-mode-${product.id}">${formatPKR(product.price)}</span>
                <input type="number" value="${product.price}" class="hidden edit-mode-${product.id} w-28 px-2 py-1 inline-edit-dark text-sm border rounded" data-field="price">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="view-mode-${product.id} px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClass(product.status)}">${product.status}</span>
                <select class="hidden edit-mode-${product.id} px-2 py-1 inline-edit-dark text-sm border rounded" data-field="status">
                    <option value="In Stock" ${product.status === 'In Stock' ? 'selected' : ''}>In Stock</option>
                    <option value="Low Stock" ${product.status === 'Low Stock' ? 'selected' : ''}>Low Stock</option>
                    <option value="Out of Stock" ${product.status === 'Out of Stock' ? 'selected' : ''}>Out of Stock</option>
                </select>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                <button onclick="toggleInlineEdit(${product.id}, true)" class="view-mode-${product.id} text-emerald-400 hover:text-emerald-300">Inline</button>
                <button onclick="openModalForEdit(${product.id})" class="view-mode-${product.id} text-blue-400 hover:text-blue-300">Modal</button>
                <button onclick="deleteProduct(${product.id})" class="view-mode-${product.id} text-red-400 hover:text-red-300">Delete</button>
                
                <button onclick="saveInlineEdit(${product.id})" class="hidden edit-mode-${product.id} text-emerald-400 hover:text-emerald-300 font-bold">Save</button>
                <button onclick="toggleInlineEdit(${product.id}, false)" class="hidden edit-mode-${product.id} text-gray-400 hover:text-gray-200">Cancel</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Render Mobile Interface Grid
function renderMobileGrid(data) {
    mobileGrid.innerHTML = '';
    if (data.length === 0) {
        mobileGrid.innerHTML = `<div class="text-center p-6 text-sm text-gray-400 bg-gray-900 rounded-xl border border-gray-800">No items found.</div>`;
        return;
    }

    data.forEach(product => {
        const div = document.createElement('div');
        div.className = "bg-gray-900 p-5 rounded-xl border border-gray-800 shadow-md space-y-3";
        div.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <span class="text-xs text-gray-500 font-mono">#${product.id}</span>
                    <h4 class="text-base font-bold text-gray-100">${product.name}</h4>
                    <p class="text-xs text-emerald-400 bg-emerald-950/50 inline-block px-2 py-0.5 rounded border border-emerald-900/50 mt-1">${product.category}</p>
                </div>
                <span class="px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClass(product.status)}">${product.status}</span>
            </div>
            <div class="flex justify-between items-center pt-2 border-t border-gray-800">
                <span class="text-lg font-bold text-emerald-400">${formatPKR(product.price)}</span>
                <div class="space-x-4 text-sm">
                    <button onclick="openModalForEdit(${product.id})" class="text-blue-400 hover:text-blue-300 font-medium">Edit</button>
                    <button onclick="deleteProduct(${product.id})" class="text-red-400 hover:text-red-300 font-medium">Delete</button>
                </div>
            </div>
        `;
        mobileGrid.appendChild(div);
    });
}

// Status Badges Theme Classes
function getStatusClass(status) {
    switch (status) {
        case 'In Stock': return 'bg-green-950/80 text-green-400 border border-green-900/50';
        case 'Low Stock': return 'bg-amber-950/80 text-amber-400 border border-amber-900/50';
        case 'Out of Stock': return 'bg-red-950/80 text-red-400 border border-red-900/50';
        default: return 'bg-gray-800 text-gray-400';
    }
}

// CRUD: Create / Update Submission Handler
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const status = document.getElementById('productStatus').value;

    if (id) {
        products = products.map(p => p.id === parseInt(id) ? { id: parseInt(id), name, category, price, status } : p);
    } else {
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 101;
        products.push({ id: newId, name, category, price, status });
    }

    closeModal();
    renderApp();
});

// CRUD: Inline Editing Save Core Engine
function saveInlineEdit(id) {
    const rowInputs = document.querySelectorAll(`.edit-mode-${id}`);
    let updatedData = { id };

    rowInputs.forEach(input => {
        const field = input.getAttribute('data-field');
        let value = input.value;
        if (field === 'price') value = parseInt(value);
        updatedData[field] = value;
    });

    products = products.map(p => p.id === id ? { ...p, ...updatedData } : p);
    renderApp();
}

// CRUD: Delete Item Hook
function deleteProduct(id) {
    if (confirm('Are you sure you want to permanently drop this item?')) {
        products = products.filter(p => p.id !== id);
        renderApp();
    }
}

// Inline Toggle Modes
function toggleInlineEdit(id, showEdit) {
    const viewElements = document.querySelectorAll(`.view-mode-${id}`);
    const editElements = document.querySelectorAll(`.edit-mode-${id}`);
    
    viewElements.forEach(el => showEdit ? el.classList.add('hidden') : el.classList.remove('hidden'));
    editElements.forEach(el => showEdit ? el.classList.remove('hidden') : el.classList.add('hidden'));
}

// Modal Toggle Window Utilities
function openModalForEdit(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    modalTitle.innerText = "Edit Product Details";
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStatus').value = product.status;
    
    modal.classList.remove('hidden');
}

function openModalForCreate() {
    modalTitle.innerText = "Add New Inventory Product";
    productForm.reset();
    document.getElementById('productId').value = '';
    modal.classList.remove('hidden');
}

// Fixed Close Modal Logic Error
function closeModal() {
    modal.classList.add('hidden');
}

// Sorting and Filter Actions Subscriptions
function setupEventListeners() {
    document.getElementById('openModalBtn').addEventListener('click', openModalForCreate);
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('cancelModalBtn').addEventListener('click', closeModal);
    
    searchInput.addEventListener('input', renderApp);
    categoryFilter.addEventListener('change', renderApp);

    document.getElementById('sortName').addEventListener('click', () => {
        sortDirection.name = !sortDirection.name;
        products.sort((a, b) => sortDirection.name ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        renderApp();
    });
    
    document.getElementById('sortPrice').addEventListener('click', () => {
        sortDirection.price = !sortDirection.price;
        products.sort((a, b) => sortDirection.price ? a.price - b.price : b.price - a.price);
        renderApp();
    });
}