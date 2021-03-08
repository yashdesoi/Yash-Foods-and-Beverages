const numberOfItems = document.querySelector('.number-of-items-in-cart');
const cartIcon = document.querySelector('.cart-icon');
const searchForm = document.querySelector('form.search-product');
const resetIcon = document.querySelector('.reset-icon');
const products = document.querySelector('.products');
const errorMessage = document.querySelector('.error');
const notFoundMessage = document.querySelector('.not-found');
const cart = document.querySelector('.cart-wrapper');
const items = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.cart__footer > .cart__item-price > .value');
const purchaseForm = document.querySelector('form.purchase');
const checkoutFormWrapper = document.querySelector('.checkout-form__wrapper');
const checkoutForm = document.querySelector('form.checkout-form');

const productList = {};

const fetchData = async function() {
    const request = await fetch('products.json');
    const data = await request.json();

    return data;
};

const loadData = function(data) {
    const product = document.createElement('li');
    product.classList.add('product');

    const image = document.createElement('div');
    image.classList.add('image');

    const details = document.createElement('div');
    details.classList.add('details');

    const button = document.createElement('button');
    button.classList.add('add');

    image.style.backgroundImage = `url('${data['image url']}')`;    
    image.innerHTML = `
        <span class="category">${data.category}</span>
    `;

    details.innerHTML = `
        <div class="name">${data.name}</div>
        <div class="weight">Net Weight: <span class="value">${data['net weight']}</span></div>
        <div class="mrp">MRP: &#8377;<span class="value">${data.MRP}</span></div>
        <div class="discounted-price">Discounted Price: &#8377;<span class="value">${data['discounted price']}</span></div>
    `;

    button.textContent = 'Add';

    product.append(image, details, button);
    products.append(product);
};

fetchData()
    .then(data => {
        errorMessage.style.display = 'none';
        for(let i=0; i<data.length; i++) {
            // Loading UI
            loadData(data[i]);

            // Adding data to local product list
            productList[data[i].name] = {
                price: data[i]['discounted price'],
                weight: data[i]['net weight'],
                category: data[i].category
            };
        }
    })
    .catch(() => {
        errorMessage.style.display = 'block';
    });


// Toggling display of cart
let cartOpen = false;

if (window.innerWidth <= 769) {
    cart.style.top = `-${cart.offsetHeight}px`;
}

window.addEventListener('resize', () => {
    if (!cartOpen) {
        if (window.innerWidth <= 769) {
            cart.style.top = `-${cart.offsetHeight}px`;
            cart.style.right = '0'
        } else {
            cart.style.top = '80px';
            cart.style.right = '-500px'
        }
    } else {
        if (window.innerWidth <= 360) {
            cart.style.top = '85px';
        } else if (window.innerWidth <= 500) {
            cart.style.top = '103px';
        } else {
            cart.style.top = '80px';
        }
        
        cart.style.right = '0'
    }
});

cartIcon.addEventListener('click', event => {
    event.stopPropagation();
    

    if (window.innerWidth <= 769) {
        if (!cartOpen) {
            cartOpen = true;
            if (window.innerWidth <= 360) {
                cart.style.top = '85px';
            } else if (window.innerWidth <= 500) {
                cart.style.top = '103px';
            } else {
                cart.style.top = '80px';
            }
        } else {
            cartOpen = false;
            cart.style.top = `-${cart.offsetHeight}px`;
        }
    } else {
        if (!cartOpen) {
            cartOpen = true;
            cart.style.right = '0';
        } else {
            cartOpen = false;
            cart.style.right = '-500px';
        }
    }
});

// Creating and adding items to cart
products.addEventListener('click', event => {
    event.stopPropagation();
    if (event.target.className === 'add') {

        if (window.innerWidth <= 769) {
            if (!cartOpen) {
                cart.style.top = `-${cart.offsetHeight * 2}px`;
            }
        }


        const name = event.target.previousElementSibling.children[0].textContent;
        const weight = productList[name].weight;
        const price = productList[name].price;

        // Checking whether if the item is already in cart
        let alreadyAdded = false;
        const namesOfItemsInCart = items.querySelectorAll('.cart__item-name');
        namesOfItemsInCart.forEach(element => {
            if (element.textContent === name) {
                alreadyAdded = true;
            };
        });

        if (!alreadyAdded) {
            // Creating an item
            const item = document.createElement('li');
            item.classList.add('cart__item');
            item.innerHTML = `
                <div class="cart__item-name">${name}</div>
                <div class="cart__item-weight">${weight}</div>
                <input class="cart__item-quantity" name="quantity" type="number" min="1" value="1" required>
                <div class="cart__item-price">
                    &#8377;<span class="value">${price}</span>
                </div>
                <div class="cart__item-remove">
                <i class="remove-icon fas fa-trash-alt"></i>
                </div>
            `;

            // Adding an item to cart
            items.append(item);

            // Updating number of items icon
            numberOfItems.textContent = items.children.length;

            // Updating total price in cart list
            totalPrice.textContent = Number(totalPrice.textContent) + Number(price);

            // Updating checkout button
            if (items.children.length > 0) {
                document.querySelector('form.purchase > button').style.display = 'block';
            }
        } else {
            alert('Item already added to cart');
        }
    }
});

// Removing and item from cart
items.addEventListener('click', event => {
    event.stopPropagation();
    if (event.target.className.includes('remove-icon')) {
        event.target.parentElement.parentElement.remove();
        const price = event.target.parentElement.previousElementSibling.children[0].textContent;

        // Updating number of items icon
        numberOfItems.textContent = items.children.length;
        
        // Updating total price in cart list
        totalPrice.textContent = Number(totalPrice.textContent) - Number(price);

        // Updating checkout button
        if (items.children.length > 0) {
            document.querySelector('form.purchase > button').style.display = 'block';
        } else {
            document.querySelector('form.purchase > button').style.display = 'none';
        }
    }
});

// Changing quantity of items (by clicking)
items.addEventListener('click', event => {
    event.stopPropagation();

    if (event.target.className === 'cart__item-quantity') {
        const name = event.target.previousElementSibling.previousElementSibling.textContent;
        
        // Updating price
        if (event.target.value >= 1) {
            event.target.nextElementSibling.children[0].textContent = productList[name].price * Number(event.target.value);
        } else {
            event.target.nextElementSibling.children[0].textContent = 0;
        }

        // Updating total price
        const itemPrices = document.querySelectorAll('.cart__item > .cart__item-price > .value');
        let sum = 0;
        itemPrices.forEach(itemPrice => {
            sum += Number(itemPrice.textContent);
        });
        totalPrice.textContent = sum;
    }
});

// Changing quantity of items (by keyboard)
purchaseForm.addEventListener('keyup', event => {
    event.stopPropagation();
    const name = event.target.previousElementSibling.previousElementSibling.textContent;
    
    // Updating price
    if (event.target.value < 1) {
        event.target.nextElementSibling.children[0].textContent = 0;
    } else {
        event.target.nextElementSibling.children[0].textContent = productList[name].price * Number(event.target.value);
    }

    // Updating total price
    const itemPrices = document.querySelectorAll('.cart__item > .cart__item-price > .value');
    let sum = 0;
    itemPrices.forEach(itemPrice => {
        sum += Number(itemPrice.textContent);
    });
    totalPrice.textContent = sum;
});

purchaseForm.addEventListener('submit', event => {
    event.preventDefault();
    if (window.innerWidth <= 769) {
        cart.style.top = `-${cart.offsetHeight}px`;
    } else {
        cart.style.right = '-500px';
    }
    checkoutFormWrapper.style.display = 'flex';
    cartOpen = false;
});

// Searching product
searchForm.addEventListener('submit', event => {
    event.preventDefault();
    notFoundMessage.style.display = 'none';
    const searchedText = searchForm.searchedProduct.value.trim().toLowerCase();
    //                ^             ^
    //          form element        ^
    //                        input element
    //                            name

    // Counting number of products
    let num = 0;
    for (let key in productList) {
        num += 1;
    }
    
    // Applying changes to UI
    let notDisplayed = 0
    if (num > 0) {
        const productElements = document.querySelectorAll('.products > .product');
        productElements.forEach(productElement => {
            const category = productElement.children[0].children[0].textContent.toLowerCase();
            const name = productElement.children[1].children[0].textContent.toLowerCase();
            
            if (name.includes(searchedText) || category === searchedText) {
                productElement.style.display = 'flex';
            } else {
                productElement.style.display = 'none';
                notDisplayed += 1;
            }

            // If number of products not displayed is equal to total number of products
            if (notDisplayed === num) {
                notFoundMessage.style.display = 'block';
            }
        });
    }

    searchForm.reset();
});

// Reseting UI from search
resetIcon.addEventListener('click', event => {
    event.stopPropagation();
    notFoundMessage.style.display = 'none';

    let num = 0;
    for (let key in productList) {
        num += 1;
    }

    if (num > 0) {
        const productElements = document.querySelectorAll('.products > .product');
        productElements.forEach(productElement => {
            productElement.style.display = 'flex';
        });
    }
});

// Going back to cart from checkout form
checkoutFormWrapper.addEventListener('click', event => {
    event.stopPropagation();

    if (event.target.className.includes('close') || event.target.className === 'checkout-form__wrapper') {
        cartOpen = true;
        checkoutFormWrapper.style.display = 'none';
        if (window.innerWidth <= 769) {
            if (window.innerWidth <= 360) {
                cart.style.top = '85px';
            } else if (window.innerWidth <= 500) {
                cart.style.top = '103px';
            } else {
                cart.style.top = '80px';
            }
        } else {
            cart.style.right = '0';
        }
    }
});

// Dealing with checkout form
let validName = false;
let validMobileNumber = false;

checkoutForm.name.addEventListener('keyup', event => {
    event.stopPropagation();
    const namePattern = /^[A-Za-z ]{2,}$/;

    if (!namePattern.test(checkoutForm.name.value)) {
        event.target.nextElementSibling.textContent = 'Invalid name';
        event.target.nextElementSibling.style.color = 'red';
        validName = false;
    } else {
        event.target.nextElementSibling.textContent = 'Valid';
        event.target.nextElementSibling.style.color = 'lime';
        validName = true;
    }
});

checkoutForm.mobileNumber.addEventListener('keyup', event => {
    event.stopPropagation();
    const mobileNumberPattern = /^\d{10}$/;

    if (!mobileNumberPattern.test(checkoutForm.mobileNumber.value)) {
        event.target.nextElementSibling.textContent = 'Invalid mobile number';
        event.target.nextElementSibling.style.color = 'red';
        validMobileNumber = false;
    } else {
        event.target.nextElementSibling.textContent = 'Valid';
        event.target.nextElementSibling.style.color = 'lime';
        validMobileNumber = true;
    }
});

const createAndDownloadTextFile = function(data) {
    // let dataString = `
    // Name:- ${data.name}\n
    // Mobile number:- ${data.mobileNumber}\n
    // Address:- ${data.address}\n
    // Products:-\n
    // `;
    let dataString = `Name:- ${data.name}\nMobile number:- ${data.mobileNumber}\nAddress:- ${data.address}\nProducts:-\n`;

    data.items.forEach(item => {
        dataString += `\t${item.name}, ${item.weight}, qty: ${item.quantity}, ₹${item.price}\n`;
    });

    dataString += `Total:- ₹${data.total}`;
    
    // Convert the text to BLOB.
    const textToBLOB = new Blob([dataString], { type: 'text/plain' });
    const num = (new Date()).getTime();
    const sFileName = `Order ${num}.txt`;

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
};

checkoutForm.addEventListener('submit', event => {
    if (validName && validMobileNumber) {
        const details = {
            name: checkoutForm.name.value,
            mobileNumber: checkoutForm.mobileNumber.value,
            address: checkoutForm.address.value,
            items: [],
            total: totalPrice.textContent
        }

        document.querySelectorAll('.cart__item').forEach(item => {
            const itemDetails = {
                name: item.children[0].textContent,
                weight: item.children[1].textContent,
                quantity: item.children[2].value,
                price: item.children[3].children[0].textContent
            };
            details.items.push(itemDetails);
        });

        createAndDownloadTextFile(details);
        alert('Thankyou! You will receive your order shortly :)');
        
    } else {
        event.preventDefault();
        alert('Please enter valid info');
    }
});
