const products = [
  { id: 1, name: 'Sneakers', price: 59, category: 'clothing', img: 'https://picsum.photos/300/200?random=1' },
  { id: 2, name: 'Headphones', price: 89, category: 'electronics', img: 'https://picsum.photos/300/200?random=2' },
  { id: 3, name: 'Backpack', price: 39, category: 'accessories', img: 'https://picsum.photos/300/200?random=3' },
  { id: 4, name: 'Smart Watch', price: 120, category: 'electronics', img: 'https://picsum.photos/300/200?random=4' },
  { id: 5, name: 'Jacket', price: 75, category: 'clothing', img: 'https://picsum.photos/300/200?random=5' },
  { id: 6, name: 'Sunglasses', price: 45, category: 'accessories', img: 'https://picsum.photos/300/200?random=6' }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(list) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="product-details">
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));

  document.getElementById("cartCount").textContent = cart.reduce((a, c) => a + c.qty, 0);

  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
  ${item.name} - $${item.price} x 
  <button onclick="changeQty(${item.id}, -1)">-</button>
  ${item.qty}
  <button onclick="changeQty(${item.id}, 1)">+</button>
  = $${item.price * item.qty}
  <button onclick="removeFromCart(${item.id})">Remove</button>
`;
    cartItems.appendChild(div);
  });

  document.getElementById("cartTotal").textContent = (total - total*discount).toFixed(2);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

function toggleCart() {
  const modal = document.getElementById("cartModal");
  modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Order placed successfully!");
  cart = [];
  updateCart();
  toggleCart();
}

function applyFilters() {
  let filtered = [...products];
  const searchText = document.getElementById("SearchBox").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const maxPrice = document.getElementById("priceFilter").value;
  const sort = document.getElementById("sortFilter").value;

  document.getElementById("priceValue").textContent = maxPrice;

  if (searchText) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchText));
  }
  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }
  filtered = filtered.filter(p => p.price <= maxPrice);

  if (sort === "low-high") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high-low") filtered.sort((a, b) => b.price - a.price);

  renderProducts(filtered);
}

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function renderProducts(list) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  list.forEach(p => {
    const isWishlisted = wishlist.some(w => w.id === p.id);
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="product-details">
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlistItem(${p.id})">❤️</button>
      </div>
    `;
    productList.appendChild(div);
  });
}

function toggleWishlistItem(id) {
  const product = products.find(p => p.id === id);
  const exists = wishlist.find(w => w.id === id);

  if (exists) {
    wishlist = wishlist.filter(w => w.id !== id);
  } else {
    wishlist.push(product);
  }

  updateWishlist();
  applyFilters();
}

function updateWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  document.getElementById("wishlistCount").textContent = wishlist.length;

  const wishlistItems = document.getElementById("wishlistItems");
  wishlistItems.innerHTML = "";

  wishlist.forEach(item => {
    const div = document.createElement("div");
    div.className = "wishlist-item";
    div.innerHTML = `
      ${item.name} - $${item.price}
      <button onclick="removeFromWishlist(${item.id})">Remove</button>
            <button onclick="moveToCart(${item.id})">Move to Cart</button>
    `;
    wishlistItems.appendChild(div);
  });
}

function removeFromWishlist(id) {
  wishlist = wishlist.filter(item => item.id !== id);
  updateWishlist();
  applyFilters();
}

function moveToCart(id) {
  const product = wishlist.find(item => item.id === id);
  if (product) {
    addToCart(product.id);
    removeFromWishlist(product.id)
  }
}

function toggleWishlist() {
  const modal = document.getElementById("wishlistModal");
  modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
}

function clearCart() {
  if (confirm("Are you sure to remove all items form the cart?"))
    cart = [];
  updateCart();
}

function clearWishlist() {
  if (confirm("Are you sure to remove all items form the cart?")) {
    wishlist = [];
    updateWishlist();
  }
}

function Search() {
  let input = document.getElementById("SearchBox").value.toLowerCase();
  let products = document.getElementsByClassName("product");

  for (let i = 0; i < products.length; i++) {
    let name = products[i].getElementsByTagName("h3")[0].innerText.toLowerCase();
    if (name.includes(input)) {
      products[i].style.display = "block";
    } else {
      products[i].style.display = "none";
    }
  }
}

function changeQty(id, delta) {
  const product = cart.find(p => p.id === id);
  if (product) {
    product.qty += delta;
    if (product.qty <= 0) {
      removeFromCart(id);
    }
  }
  updateCart()
}

function saveProfile(){
  
   const name= document.getElementById("userName").value.trim();
   const email= document.getElementById("userEmail").value.trim();

   if(!name || !email){
    alert("Please enter both name and email!");
    return;
  }
  const user = {name, email};
  localStorage.setItem("userProfile", JSON.stringify(user));
  alert("Profile saved!");
  toggleProfile();
}

function toggleProfile(){
  const modal = document.getElementById("profileModal");
  modal.style.display = (modal.style.display === "flex") ? "none" : "flex"
}


function checkout(){
  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }
  const user = JSON.parse(localStorage.getItem("userProfile")) || {};
  alert(`Thanks ${user.name || "Guest"}! Order placed successfully!`);
  cart = [];
  updateCart();
  toggleCart();

  // if(cart.length === 0){
  //   return alert("Empty cart!");
  // }
  // const win = window.open("", "Invoice");
  // win.document.write("<h1>Invoice</h1>");
  // cart.forEach(item => {
  //   win.document.write(`<p>${item.name} - $${item.price} x ${item.qty}</p>`)
  // });
  // win.document.write(`<h3>TOtal: ${document.getElementById("cartTotal").textContent}</h3>`);
  // win.print();
}

function toggleDarkMode(){
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}
if(localStorage.getItem("darkMode") === "true"){
  document.body.classList.add("dark");
}

let discount = 0;
function applyCoupon(){
  const code = document.getElementById("couponCode").value;
  if(code === "SAVE10"){
    discount = 0.1;
    alert("Coupon applied: 10% off!");
  }
  else {
    discount = 0;
    alert("Invalid coupon");
  }
  updateCart()
}

renderProducts(products);
updateCart();
updateWishlist();

