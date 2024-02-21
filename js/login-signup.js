let login_page = document.querySelector('.login');
let login_btn = document.querySelector('.header__login_btn');
let main = document.getElementsByTagName('main');
console.log(main);


login_btn.addEventListener("click", () => {
    login_page.style.display = "flex";
    main[0].style.filter = "blur(10px)";
});
main[0].addEventListener("click", () => {
    login_page.style.display = "none";
    main[0].style.filter = "blur(0)"
});