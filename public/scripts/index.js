let productList = {};

const products = document.querySelector('.all-products')
const cart = document.querySelector('.cart');
const checkout = document.querySelector('.checkout');


// Add to cart
const addToCart = function(data) {
    // Updating product list
    productList[data._id] = {};
    productList[data._id].name = data.name;
    productList[data._id]['net-weight'] = data['net-weight'];
    productList[data._id].quantity = 1;
    productList[data._id].price = data['discounted-price'];

    // Adding to dom
    const html = `
    <div class="item" data-id="${data._id}">
        <span class="name">${data.name}</span>/
        <span class="net-weight">${data['net-weight']}</span>/
        <span class="price">&#8377;${data['discounted-price']}</span>/
        <button class="remove">REMOVE</button>
    </div>
    `;
    cart.innerHTML += html;
};



products.addEventListener('click', event => {
    event.stopPropagation();

    if (event.target.classList.contains('add')) {
        const productId = event.target.parentElement.getAttribute('data-id').trim();
        if (productList[productId]) {
            alert('Item already added in cart');
        } else {
            fetch(`/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                addToCart(data);
            })
            .catch(err => console.log(err));
        } 
    }
});

const removeFromCart = function(element) {
    const productId = element.getAttribute('data-id').trim();
    // Updating product list
    delete productList[productId];

    // Removing from dom
    element.remove();
}

cart.addEventListener('click', event => {
    event.stopPropagation();

    if (event.target.classList.contains('remove')) {
        removeFromCart(event.target.parentElement);
    }
});

checkout.addEventListener('click', event => {
    event.stopPropagation();

    const numberOfItemsInCart = cart.querySelectorAll('.item').length;
    
    if (numberOfItemsInCart > 0) {
        const data = JSON.stringify(productList);
        localStorage.setItem('cart', data);
        window.location.href = `/customers/13b2v`;
        //                                   ^
        //                  dummy route with fake customer id
    } else {
        alert('Your cart is empty');
    }
});