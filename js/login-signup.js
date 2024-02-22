let login_page = document.querySelector('.login');
let login_btn = document.querySelector('.header__login_btn');
let main = document.getElementsByTagName('main');
console.log(main);


login_btn.addEventListener("click", () => {
    login_page.style.display = "flex";
    main[0].style.backgroundColor = "#000000ca";
    Array.from(main[0].children).forEach(element => {
        element.style.filter = "brightness(10%)";
    }); 
});
main[0].addEventListener("click", () => {
    login_page.style.display = "none";
    main[0].style.backgroundColor = "transparent";
    Array.from(main[0].children).forEach(element => {
        element.style.filter = "blur(0)";
    });
});