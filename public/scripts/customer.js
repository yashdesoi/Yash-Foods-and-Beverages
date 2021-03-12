const cart = document.querySelector('.cart');
const form = document.querySelector('form');
const productList = JSON.parse(localStorage.getItem('productList'));
let total = 0;
console.log(productList);
if (productList) {
    for(let key in productList) {
        const item = productList[key];
        const html = `
        <div class="item" data-id="${key}">
            <span class="name">${item.name}</span>/
            <span class="net-weight">${item['net-weight']}</span>/
            <span class="price">&#8377;${item.price}</span>/
            <span class="quantity">Qty. ${item.quantity}</span>
        </div>
        `;

        // Adding items to cart
        cart.innerHTML += html;

        // Calculating total
        total += item.price * item.quantity;
    }
} else {
    cart.textContent = '--Cart is empty--';
}

// Placing order
form.addEventListener('submit', event => {
    event.preventDefault();

    const order = {};

    if (productList) {
        order.name = form.querySelector('#customer-name').getAttribute('data-customer-name');
        order['customer-id'] = form.getAttribute('data-customer-id');
        order['mobile-number'] = form.mobileNumber.value;
        order.address = form.address.value;
        order['product-list'] = productList;
        order.total = total;

        fetch('/admin/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                localStorage.removeItem('productList');
                window.location.href = data.redirect;
            })
            .catch(err => console.log(err));
    } else {
        alert('Your cart is empty');
    }

});