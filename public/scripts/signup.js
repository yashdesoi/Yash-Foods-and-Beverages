const form = document.querySelector('form');

// const emailError = document.querySelector('.email-error');
// const passwordError = document.querySelector('.password-error');

form.addEventListener('submit', event => {
    event.preventDefault();

    // emailError.textContent = '';
    // passwordError.textContent = '';

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
            // if (data.error) {
            //     emailError.textContent = data.email;
            //     passwordError.textContent = data.password;
            // } else {
            //     window.location.href = data.redirect;
            // }
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
});