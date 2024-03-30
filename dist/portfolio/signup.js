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
const signUpForm = document.querySelector('.signup__form_fields');
const signupHide = document.querySelector('.signup--hide-show');
const imageInput = document.getElementById("photo");
signUpForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    // Accessing form data
    const formData = new FormData(signUpForm);
    // Retrieve Form data
    const name = formData.get('fullname');
    const photo = "Photo";
    const dob = "dob";
    const email = formData.get('email');
    const password = formData.get('password');
    try {
        const response = yield fetch(`${apiUrl}api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, email, photo, dob, password
            })
        });
        if (response.ok) {
            signupHide.style.display = 'none';
            messageConfirmation.firstElementChild.innerHTML = `
                <i class="fa-solid fa-check"></i>
                <span>Registration was successful ! <br> Login to continue.</span>`;
            messageConfirmation.style.display = "block";
            loginForm.style.display = 'block';
        }
        else if (response.status == 400) {
            messageConfirmation.firstElementChild.innerHTML = `
                <i class="fa-solid fa-xmark"></i>
                <span>User already exists!, Try again!</span>`;
            messageConfirmation.style.display = "block";
        }
        else {
            messageConfirmation.firstElementChild.innerHTML = `
                <i class="fa-solid fa-xmark"></i>
                <span>Registration failed!, Try again!</span>`;
            messageConfirmation.style.display = "block";
        }
        setTimeout(() => {
            messageConfirmation.style.display = "none";
        }, 3000);
    }
    catch (error) {
    }
}));
