function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let found = cart.find(item => item.name === name);
    if (found) {
        found.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // ✅ Redirect to cart page
    window.location.href = "cart.html";
}
