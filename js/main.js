


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

const moon_sun_btn = document.querySelector(".header__dark_light");
const body = document.getElementsByTagName("body")
let mode = true; // light = true ---- dark == false;

moon_sun_btn.addEventListener('click', () => {
    if (mode) {
        mode = false;
        moon_sun_btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        body[0].classList.add('dark-mode');
    } else {
        mode = true;
        moon_sun_btn.innerHTML = '<i class="fa-solid fa-moon"></i>'
        body[0].classList.remove('dark-mode');
    }
});


// Login button trigger 

// const login_btn = document.querySelector(".login__btn--signin");
// if (login_btn) {
//     login_btn.addEventListener('click', () => {
//         window.location.href = "/dashboard/dashboard.html";
//     });
// }
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
