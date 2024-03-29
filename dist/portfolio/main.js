"use strict";
const headerProfileBtn = document.querySelector(".header__profile_btn");
const loginForm = document.querySelector('.login--hide-show');
const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        messageConfirmation.firstElementChild.innerHTML = `
                <i class="fa-solid fa-check"></i>
                <span>LogOut was successfully!</span>`;
        messageConfirmation.style.display = "block";
        tokenCheck();
        setTimeout(() => {
            messageConfirmation.style.display = "none";
        }, 3000);
    }
    else {
        headerProfileBtn.classList.add('header__login_btn');
        headerProfileBtn.innerHTML = `<a href="">
					Login
					<img src="assets/icons/🦆 icon _account login_.svg" alt="">
				</a>`;
    }
};
window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        headerProfileBtn.classList.add('header__login_btn');
        headerProfileBtn.innerHTML = `<a href="">
					Login
					<img src="assets/icons/🦆 icon _account login_.svg" alt="">
				</a>`;
        return;
    }
    headerProfileBtn.classList.add('header__logout_btn');
    headerProfileBtn.innerHTML = `<a href="">
					Logout
					<img src="assets/icons/🦆 icon _account login_.svg" alt="">
				</a>`;
});
headerProfileBtn.addEventListener('click', event => {
    event.preventDefault();
    if (headerProfileBtn.classList[1] == 'header__logout_btn') {
        headerProfileBtn.classList.add('header__login_btn');
        headerProfileBtn.classList.remove('header__logout_btn');
        tokenCheck();
    }
    else {
        loginForm.style.display = 'block';
    }
});
