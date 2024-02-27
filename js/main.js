// Form Validation
const footerForm = document.querySelector('.footer__form');
const circleCheck = '<i class="fa-solid fa-circle-check"></i>';
const circleXmark = '<i class="fa-solid fa-circle-xmark"></i>';
const email = document.getElementById('email');
let footerFormError = false;
let errorField = []
let footerCount = 0;

// footerForm.addEventListener('input', e => {
//     console.log(e.target);
// })

footerForm.addEventListener('input', (e) => {
    let target = e.target;
    footerCount++ ;
    footerForm.firstElementChild.innerText = '';
    errorField.forEach(el => {
        el.style.borderColor = 'black'
    });
    if (!target.value.length) {
        target.nextElementSibling.style.display = 'none';
        footerFormError = true;
        footerCount = 0;
    } else {
        target.nextElementSibling.style.display = 'block';
        if (target.id == 'email') {
            if ((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value)) {
                email.nextElementSibling.innerHTML = circleCheck;
                footerFormError = false;
            } else {
                email.nextElementSibling.innerHTML = circleXmark;
                footerFormError = true;
            }
        } else {
            if (target.value.split(" ").join("").length < 5) {
                target.nextElementSibling.innerHTML = circleXmark;
                footerFormError = true;
            } else {
                target.nextElementSibling.innerHTML = circleCheck;
                footerFormError = false;
            }
        }
    }

    if (footerFormError && errorField.indexOf(target) == -1) {
        errorField.push(target);
    }
    if (!footerFormError) {
        if (errorField.indexOf(target) != -1) {
            errorField.splice(errorField.indexOf(target), 1);
        }
    }
    console.log(errorField);
});


footerForm.addEventListener('submit', (e) => {
    if (errorField.length > 0) {
        errorField.forEach(el => {
            console.log(el);
            el.style.borderColor = '#bb0000';
        });
        if (errorField.length > 1) {
            footerForm.firstElementChild.innerText = 'Enter Valid Email | Enter more than 5 characters';
        } else {
            if (errorField.indexOf(email) != -1) {
                footerForm.firstElementChild.innerText = 'Enter Valid Email';
            } else {
                footerForm.firstElementChild.innerText = 'Enter more than 5 characters';
            }
        }
    }
    if (footerCount == 0) {
        footerForm.firstElementChild.innerText = 'Fill in all Field';
        console.log(Array.from(footerForm.children))
    }
    console.log(errorField.length);


    e.preventDefault();
}
);


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

const login_btn = document.querySelector(".login__btn--signin");
if (login_btn) {
    login_btn.addEventListener('click', () => {
        window.location.href = "/dashboard/dashboard.html";
    });
}
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
