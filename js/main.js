// Login button trigger and  Login page toggling
const headerLoginBtn = document.querySelector('.header__login_btn');
const loginHideShow = document.querySelector('.login--hide-show');
const signupHideShow = document.querySelector('.signup--hide-show');
const loginCloseBtn = document.querySelector('.login--close-btn');
const signupCloseBtn = document.querySelector('.signup--close-btn');
const loginLink = document.querySelector('.login-link');
const signupLink = document.querySelector('.signup-link');

loginLink.addEventListener('click', e => {
	e.preventDefault();
	signupHideShow.style.display = 'block';
	loginHideShow.style.display = 'none';
});
signupLink.addEventListener('click', e => {
	e.preventDefault();
	loginHideShow.style.display = 'block';
	signupHideShow.style.display = 'none';
});

loginCloseBtn.addEventListener('click', () => {
	loginHideShow.style.display = 'none';
	document.querySelector("body").style.overflowY = 'auto';
});
signupCloseBtn.addEventListener('click', () => {
	signupHideShow.style.display = 'none';
	document.querySelector("body").style.overflowY = 'auto';
});

// const login_btn = document.querySelector(".login__btn--signin");
// if (login_btn) {
// 	login_btn.addEventListener('click', () => {
// 		window.location.href = "/dashboard/dashboard.html";
// 	});
// }


// ---------- Scroll Animation ------------//

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) entry.target.classList.toggle('show');
		else entry.target.classList.remove('show');
	})
});

const section = document.getElementsByTagName('section');
// section[0].classList.add('hidden')
Array.from(section).forEach(el => observer.observe(el));


// Dark-Light-Mode Activator
const darkMode = (mode) => {
	if (mode == "true") {
		localStorage.setItem('dark', 'true');
		moon_sun_btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
		body[0].classList.add('dark-mode');
	} else {
		localStorage.setItem('dark', 'false');
		moon_sun_btn.innerHTML = '<i class="fa-solid fa-moon"></i>'
		body[0].classList.remove('dark-mode');
	}
}
const moon_sun_btn = document.querySelector(".header__dark_light");
const body = document.getElementsByTagName("body")

darkMode(localStorage.getItem('dark'))

moon_sun_btn.addEventListener('click', () => {
	console.log('click in');
	if (localStorage.getItem('dark') == 'true') {
		darkMode("false")
	} else {
		darkMode("true")
	}
});


// Mobile Menu

let hamburger_menu_btn = document.querySelector(".header__menu_btn");
let menu = document.querySelector("#header__navigation");
let menu_status = false;

hamburger_menu_btn.addEventListener('click', () => {
	if (!menu_status) {
		hamburger_menu_btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
		menu.classList.add('header__navigation-mobile');
		menu_status = true;
	} else {
		hamburger_menu_btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
		menu.classList.remove("header__navigation-mobile");
		menu_status = false;
	}
});
Array.from(menu.children).forEach((element) => {
	// console.log(element.children);
	element.addEventListener("click", () => {
		hamburger_menu_btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
		menu.classList.remove("header__navigation-mobile");
		menu_status = false;
	});
});
