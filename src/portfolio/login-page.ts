const signInForm = document.querySelector(".login__form_fields") as HTMLFormElement
const loginHide = document.querySelector(".login--hide-show") as HTMLElement


signInForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Accessing form data
    const formData = new FormData(signInForm);

    // Retrieve Form data
    const email = formData.get('email');
    const password = formData.get('password');


    // API Integration
    try {
        const response = await fetch(`${apiUrl}api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, password
                })
            })
        const userData = await response.json();
        
        if (response.ok) {
            signInForm.reset()
            localStorage.setItem('token', userData.token);
            localStorage.setItem('userId', userData.userId);
            
            loginHide.style.display = 'none';

            headerProfileBtn.innerHTML = `<a href="">
					Logout
					<img src="assets/icons/🦆 icon _account login_.svg" alt="">
				</a>`;

            headerProfileBtn.classList.add('header__logout_btn')
            headerProfileBtn.classList.remove('header__login_btn')

            messageConfirmation.firstElementChild!.innerHTML = `
                <i class="fa-solid fa-check"></i>
                <span>LogIn was successful !</span>`;
            messageConfirmation.style.display = "block";
        } else {
            messageConfirmation.firstElementChild!.innerHTML = `
                <i class="fa-solid fa-xmark"></i>
                <span>Invalid credentials, Try again!</span>`;
            messageConfirmation.style.display = "block";
        }
        setTimeout(() => {
            messageConfirmation.style.display = "none";
        }, 3000);

    } catch (error) {

    }
})