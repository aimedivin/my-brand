
// dark mode button 
const modeBtn = document.querySelector('.header__dark_light i');


window.addEventListener('load', () => {
    const mode = localStorage.getItem('dark');
    if (!mode) {
        localStorage.setItem('dark', 'false');
    }
    if (mode == 'true') {
        modeBtn.removeAttribute('class')
        modeBtn.setAttribute('class', 'fa-solid fa-sun')
        document.body.classList.add('dark-mode')
    } else {
        modeBtn.removeAttribute('class')
        modeBtn.setAttribute('class', 'fa-solid fa-moon')
        document.body.classList.remove('dark-mode')
    }
});

modeBtn.addEventListener('click', () => {
    const mode = localStorage.getItem('dark');
    if (!mode) {
        localStorage.setItem('dark', 'false');
    }
    if (mode == 'false') {
        modeBtn.removeAttribute('class')
        modeBtn.setAttribute('class', 'fa-solid fa-sun')
        localStorage.setItem('dark', 'true');
        document.body.classList.add('dark-mode')
    } else {
        modeBtn.removeAttribute('class')
        modeBtn.setAttribute('class', 'fa-solid fa-moon')
        localStorage.setItem('dark', 'false');
        document.body.classList.remove('dark-mode')
    }
});