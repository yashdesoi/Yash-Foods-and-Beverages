const orders = document.querySelector('.orders');

orders.addEventListener('click', event => {
    event.stopPropagation();

    if (event.target.classList.contains('complete')) {
        const orderId = event.target.parentElement.getAttribute('data-id').trim();
        
        fetch(`/admin/orders/${orderId}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => {
                window.location.href = data.redirect;
            })
            .catch(err => console.log(err));
    }
});