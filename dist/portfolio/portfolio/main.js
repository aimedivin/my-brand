"use strict";
const headerLoginBtn = document.querySelector(".header__login_btn");
window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    if (token) {
        headerLoginBtn.innerHTML = `<a href="">
					Login
					<img src="assets/icons/🦆 icon _account login_.svg" alt="">
				</a>`;
    }
    else {
        headerLoginBtn.innerHTML = `<a href="">
					Login
					<img src="assets/icons/🦆 icon _account login_.svg" alt="">
				</a>`;
    }
});
