const form = document.querySelector('form');
const id = form.getAttribute('data-id');

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
    
    fetch(`/products/${id}`, {
        method: 'PUT',
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