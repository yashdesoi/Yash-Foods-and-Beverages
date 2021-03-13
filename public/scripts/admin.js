const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const category = form.productCategory.value;
    const name = form.productName.value;
    let netWeight = form.productWeight.value;
    const unit = form.unit.value;
    netWeight = netWeight + ' ' + unit;
    const mrp = form.productMrp.value;
    const discountedPrice = form.discountedPrice.value;
    const imageUrl = form.imageUrl.value;
    
    fetch('/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            category,
            name,
            'net-weight': netWeight,
            mrp,
            'discounted-price': discountedPrice,
            'image-url': imageUrl
        })
    })
        .then(res => res.json())
        .then(data => {
            window.location.href = data.redirect;
        })
        .catch(err => console.log(err));
});

const allProducts = document.querySelector('.all-products');

allProducts.addEventListener('click', event => {
    event.stopPropagation();

    if (event.target.classList.contains('delete')) {
        const parent = event.target.parentElement.parentElement;
        const id = parent.getAttribute('data-id');

        fetch(`/products/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                window.location.href = data.redirect;
            })
            .catch(err => console.log(err));
    }

    if (event.target.classList.contains('update')) {
        const parent = event.target.parentElement.parentElement;
        const id = parent.getAttribute('data-id');

        window.location.href = `/products/${id}/update`;
    }
});