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


        if (response.ok) {

            const userData = await response.json();
            const expirationTime = Date.now() + (60 * 60 * 1000);

            signInForm.reset()
            localStorage.setItem('token', userData.token);
            localStorage.setItem('userId', userData.userId);
            localStorage.setItem('refreshToken', userData.refreshToken);
            localStorage.setItem('expirationTime', expirationTime.toString());

            const token = localStorage.getItem('token');

            const adminCheck = await fetch(`${apiUrl}api/auth/user/${userData.userId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });


            loginHide.style.display = 'none';

            userCheck();

            messageConfirmation.firstElementChild!.innerHTML = `
                <i class="fa-solid fa-check"></i>
                <span>LogIn was successful !</span>`;
            messageConfirmation.style.display = "block";

            if (adminCheck.ok) {
                const adminCheckData = await adminCheck.json()
                if (adminCheckData.user.isAdmin)
                    window.location.href = "dashboard/dashboard.html"
            }
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