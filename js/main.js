// Mobile Menu 

let hamburger_menu_btn = document.querySelector(".header__menu_btn");
let menu = document.querySelector(".header__navigation");
let menu_status = false;

hamburger_menu_btn.addEventListener('click', () => {
    if (!menu_status) {
        hamburger_menu_btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        menu.style.display = "flex";
        menu_status = true;
    }
    else {
        hamburger_menu_btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        menu.style.display = "none";
        menu_status = false
    }
});

// Array.from(menu.children).forEach(element => {
//     console.log(element.children);
//     element.addEventListener('click', () => {
//         hamburger_menu_btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
//         menu.style.display = "none";
//         menu_status = false
//     });
// })

