const form = document.querySelector('form');

const nameError = document.querySelector('.name-error')
const emailError = document.querySelector('.email-error');
const mobileNumberError = document.querySelector('.mobile-number-error');
const addressError = document.querySelector('.address-error');
const passwordError = document.querySelector('.password-error');

form.addEventListener('submit', event => {
    event.preventDefault();

    nameError.textContent = '';
    emailError.textContent = '';
    mobileNumberError.textContent = '';
    addressError.textContent = '';
    passwordError.textContent = '';

    const userDetails = {
        name: form.name.value,
        email: form.email.value,
        'mobile-number': form.mobileNumber.value,
        address: form.address.value,
        password: form.password.value
    };
    
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                nameError.textContent = data.name;
                emailError.textContent = data.email;
                mobileNumberError.textContent = data['mobile-number'];
                addressError.textContent = data.address;
                passwordError.textContent = data.password;
            } else {
                console.log(data);
            }
        })
        .catch(err => {
            console.log(err);
        })
});