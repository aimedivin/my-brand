"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const signInForm = document.querySelector(".login__form_fields");
const loginHide = document.querySelector(".login--hide-show");
signInForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    // Accessing form data
    const formData = new FormData(signInForm);
    // Retrieve Form data
    const email = formData.get('email');
    const password = formData.get('password');
    // API Integration
    try {
        const response = yield fetch(`${apiUrl}api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        });
        if (response.ok) {
            const userData = yield response.json();
            signInForm.reset();
            localStorage.setItem('token', userData.token);
            localStorage.setItem('userId', userData.userId);
            const token = localStorage.getItem('token');
            const adminCheck = yield fetch(`${apiUrl}api/auth/user/${userData.userId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            loginHide.style.display = 'none';
            userCheck();
            messageConfirmation.firstElementChild.innerHTML = `
                <i class="fa-solid fa-check"></i>
                <span>LogIn was successful !</span>`;
            messageConfirmation.style.display = "block";
            if (adminCheck.ok) {
                const adminCheckData = yield adminCheck.json();
                if (adminCheckData.user.isAdmin)
                    window.location.href = "dashboard/dashboard.html";
            }
        }
        else {
            messageConfirmation.firstElementChild.innerHTML = `
                <i class="fa-solid fa-xmark"></i>
                <span>Invalid credentials, Try again!</span>`;
            messageConfirmation.style.display = "block";
        }
        setTimeout(() => {
            messageConfirmation.style.display = "none";
        }, 3000);
    }
    catch (error) {
    }
}));
