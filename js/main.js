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
headerLoginBtn.addEventListener('click', e => {
	e.preventDefault();
	loginHideShow.style.display = 'block';

});

loginCloseBtn.addEventListener('click', () => {
	loginHideShow.style.display = 'none'
});	
signupCloseBtn.addEventListener('click', () => {
	signupHideShow.style.display = 'none'
});	


const login_btn = document.querySelector(".login__btn--signin");
if (login_btn) {
    login_btn.addEventListener('click', () => {
        window.location.href = "/dashboard/dashboard.html";
    });
}

				




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

// Display Blogs

const blogsBtn = document.querySelector('.blogs__btn');
const blogsContent = document.querySelector('.blogs__content')
let container = '';

window.addEventListener('load', () => {
	
    const blogs = JSON.parse(window.localStorage.getItem('blogs'));
	// console.log(blogs);

	for(let i = 0; i < blogs.length; i++) {
		if (i == 2) break;
		container += `<div class="blogs__blog">
					<figure class="blogs__thumbnail">
						<img src="${blogs[i].photo}" alt="">
					</figure>
					<div>
						<form action="" method="">
							<input type="hidden" id="blog__id"value="${i}">
						</form>
						<a href="" class="blog__tn_title">${blogs[i].title}</a>
						<p class="blog__tn_description">${blogs[i].description.slice(0,150)}... <a href="">Read More</a></p>
					</div>
					<div class="blogs__action">
						<div class="blogs__cta_btn">
							<svg class="blogs__like_img" width="40" height="40" viewBox="0 0 40 40" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M20 35.7132C19.8189 35.7134 19.6395 35.6777 19.4721 35.6084C19.3048 35.539 19.1528 35.4373 19.0249 35.309L5.85796 22.1421C1.82485 18.109 1.82485 11.5463 5.85796 7.51317C9.73106 3.63731 15.9393 3.48144 20 7.05524C24.058 3.48558 30.2662 3.63593 34.1421 7.51317C38.1752 11.5463 38.1752 18.1104 34.1421 22.1421L20.9752 35.309C20.8473 35.4373 20.6953 35.539 20.5279 35.6084C20.3606 35.6777 20.1812 35.7134 20 35.7132ZM13.1738 7.2442C12.1775 7.24246 11.1906 7.43748 10.2699 7.8181C9.34912 8.19871 8.51259 8.75741 7.8083 9.46213C6.38737 10.8857 5.58933 12.8149 5.58933 14.8263C5.58933 16.8376 6.38737 18.7668 7.8083 20.1904L20 32.3821L32.1918 20.1904C33.6127 18.7668 34.4107 16.8376 34.4107 14.8263C34.4107 12.8149 33.6127 10.8857 32.1918 9.46213C30.7682 8.0412 28.839 7.24316 26.8276 7.24316C24.8162 7.24316 22.8871 8.0412 21.4635 9.46213L20.9752 9.95041C20.8472 10.0786 20.6952 10.1803 20.5279 10.2497C20.3605 10.3191 20.1812 10.3548 20 10.3548C19.8189 10.3548 19.6395 10.3191 19.4722 10.2497C19.3048 10.1803 19.1528 10.0786 19.0249 9.95041L18.5366 9.46213C17.8328 8.75743 16.9968 8.19872 16.0765 7.8181C15.1562 7.43747 14.1697 7.24244 13.1738 7.2442Z"
									fill="black" />
							</svg>
							<svg class="blogs__comment_img" width="45" height="46" viewBox="0 0 45 46" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_126_1055)">
									<path
										d="M32.4818 21.4861C32.4818 21.9811 32.0768 22.3861 31.5819 22.3861H11.7818C11.2868 22.3861 10.8818 21.9811 10.8818 21.4861C10.8818 20.9911 11.2868 20.5861 11.7818 20.5861H31.5819C32.0768 20.5861 32.4818 20.9911 32.4818 21.4861ZM26.0918 25.0861H11.7818C11.2868 25.0861 10.8818 25.4911 10.8818 25.9861C10.8818 26.4811 11.2868 26.8861 11.7818 26.8861H26.0918C26.5868 26.8861 26.9918 26.4811 26.9918 25.9861C26.9918 25.4911 26.5868 25.0861 26.0918 25.0861ZM31.5819 16.0861H11.7818C11.2868 16.0861 10.8818 16.4911 10.8818 16.9861C10.8818 17.4811 11.2868 17.8861 11.7818 17.8861H31.5819C32.0768 17.8861 32.4818 17.4811 32.4818 16.9861C32.4818 16.4911 32.0768 16.0861 31.5819 16.0861ZM38.7818 10.6861V32.2861C38.7818 32.7811 38.3769 33.1861 37.8819 33.1861H20.3318L14.2118 39.2161C13.9868 39.4861 12.6818 39.8461 12.6818 38.5861V33.1861H5.48185C4.98685 33.1861 4.58185 32.7811 4.58185 32.2861V10.6861C4.58185 10.1911 4.98685 9.78613 5.48185 9.78613H37.8819C38.3769 9.78613 38.7818 10.1911 38.7818 10.6861ZM36.9818 11.5861H6.38185V31.3861H13.5818C14.0768 31.3861 14.4818 31.7911 14.4818 32.2861V36.4261L19.3418 31.6561C19.5218 31.4761 19.7468 31.3861 19.9718 31.3861H36.9818V11.5861Z"
										fill="black" />
									<path
										d="M549.982 -227.364V530.436H-252.818V-227.364H549.982ZM553.582 -230.964H-256.418V534.036H553.582V-230.964Z"
										fill="#0000FF" />
								</g>
								<defs>
									<clipPath id="clip0_126_1055">
										<rect width="45" height="45" fill="white" transform="translate(0 0.5)" />
									</clipPath>
								</defs>
							</svg>
							<svg class="blogs__share_img" width="33" height="34" viewBox="0 0 33 34" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M24.9076 21.7294C25.9937 21.7287 27.0499 22.0848 27.9137 22.743C28.7776 23.4012 29.4013 24.325 29.6887 25.3724C29.9762 26.4197 29.9116 27.5324 29.5048 28.5394C29.098 29.5464 28.3716 30.3919 27.4374 30.9457C26.5031 31.4995 25.4128 31.7309 24.3341 31.6045C23.2555 31.478 22.2482 31.0006 21.4674 30.2457C20.6866 29.4908 20.1755 28.5003 20.0127 27.4265C19.8499 26.3527 20.0444 25.2552 20.5664 24.3028L11.9965 19.8342C11.366 20.6446 10.4991 21.2389 9.51584 21.5347C8.53261 21.8306 7.48172 21.8133 6.50873 21.4854C5.53573 21.1575 4.68879 20.5351 4.08521 19.7044C3.48164 18.8738 3.1513 17.876 3.13995 16.8493C3.1286 15.8226 3.43681 14.8178 4.02189 13.974C4.60696 13.1303 5.43994 12.4893 6.40545 12.14C7.37096 11.7906 8.42121 11.7501 9.41074 12.0242C10.4003 12.2982 11.2801 12.8732 11.9283 13.6694L20.3637 9.28371C19.8602 8.12633 19.8158 6.82071 20.2396 5.63182C20.6635 4.44293 21.5238 3.45983 22.6459 2.882C23.7681 2.30418 25.068 2.17493 26.282 2.52047C27.4959 2.86602 28.533 3.66048 29.1826 4.74264C29.8323 5.82479 30.0459 7.11357 29.7801 8.34745C29.5143 9.58133 28.789 10.6679 27.7514 11.3866C26.7139 12.1053 25.4417 12.4023 24.1932 12.2174C22.9446 12.0325 21.8131 11.3795 21.0284 10.391L12.6079 14.7689C12.8872 15.3893 13.0353 16.0607 13.043 16.741C13.0507 17.4214 12.9178 18.096 12.6527 18.7225L21.3404 23.2526C21.8013 22.7709 22.355 22.3877 22.9681 22.1259C23.5812 21.8641 24.241 21.7292 24.9076 21.7294Z"
									fill="black" />
							</svg>
						</div>
					</div>
					</div>`;
	}

	if (container.length) {
		blogsContent.innerHTML = container;
	} else {
		blogsContent.innerHTML = 'No Blog available, for now';
		blogsBtn.style.display = 'none';
	}

	// Blog Load More button
	blogsBtn.addEventListener('click', (e) => {
		e.preventDefault();
		container = '';
		let blogsCount = Array.from(blogsContent.children);

		for(let i = 0; i < blogs.length; i++) {
			if ( i == blogsCount.length + 2) {
				break;
			}
			container += `<div class="blogs__blog">
					<figure class="blogs__thumbnail">
						<img src="${blogs[i].photo}" alt="">
					</figure>
					<div>
						<form action="" method="">
							<input type="hidden" id="blog__id"value="${i}">
						</form>
						<a href="" class="blog__tn_title">${blogs[i].title}</a>
						<p class="blog__tn_description">${blogs[i].description.slice(0, 150)}... <a href="">Read More</a></p>
					</div>
					<div class="blogs__action">
						<div class="blogs__cta_btn">
							<svg class="blogs__like_img" width="40" height="40" viewBox="0 0 40 40" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M20 35.7132C19.8189 35.7134 19.6395 35.6777 19.4721 35.6084C19.3048 35.539 19.1528 35.4373 19.0249 35.309L5.85796 22.1421C1.82485 18.109 1.82485 11.5463 5.85796 7.51317C9.73106 3.63731 15.9393 3.48144 20 7.05524C24.058 3.48558 30.2662 3.63593 34.1421 7.51317C38.1752 11.5463 38.1752 18.1104 34.1421 22.1421L20.9752 35.309C20.8473 35.4373 20.6953 35.539 20.5279 35.6084C20.3606 35.6777 20.1812 35.7134 20 35.7132ZM13.1738 7.2442C12.1775 7.24246 11.1906 7.43748 10.2699 7.8181C9.34912 8.19871 8.51259 8.75741 7.8083 9.46213C6.38737 10.8857 5.58933 12.8149 5.58933 14.8263C5.58933 16.8376 6.38737 18.7668 7.8083 20.1904L20 32.3821L32.1918 20.1904C33.6127 18.7668 34.4107 16.8376 34.4107 14.8263C34.4107 12.8149 33.6127 10.8857 32.1918 9.46213C30.7682 8.0412 28.839 7.24316 26.8276 7.24316C24.8162 7.24316 22.8871 8.0412 21.4635 9.46213L20.9752 9.95041C20.8472 10.0786 20.6952 10.1803 20.5279 10.2497C20.3605 10.3191 20.1812 10.3548 20 10.3548C19.8189 10.3548 19.6395 10.3191 19.4722 10.2497C19.3048 10.1803 19.1528 10.0786 19.0249 9.95041L18.5366 9.46213C17.8328 8.75743 16.9968 8.19872 16.0765 7.8181C15.1562 7.43747 14.1697 7.24244 13.1738 7.2442Z"
									fill="black" />
							</svg>
							<svg class="blogs__comment_img" width="45" height="46" viewBox="0 0 45 46" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_126_1055)">
									<path
										d="M32.4818 21.4861C32.4818 21.9811 32.0768 22.3861 31.5819 22.3861H11.7818C11.2868 22.3861 10.8818 21.9811 10.8818 21.4861C10.8818 20.9911 11.2868 20.5861 11.7818 20.5861H31.5819C32.0768 20.5861 32.4818 20.9911 32.4818 21.4861ZM26.0918 25.0861H11.7818C11.2868 25.0861 10.8818 25.4911 10.8818 25.9861C10.8818 26.4811 11.2868 26.8861 11.7818 26.8861H26.0918C26.5868 26.8861 26.9918 26.4811 26.9918 25.9861C26.9918 25.4911 26.5868 25.0861 26.0918 25.0861ZM31.5819 16.0861H11.7818C11.2868 16.0861 10.8818 16.4911 10.8818 16.9861C10.8818 17.4811 11.2868 17.8861 11.7818 17.8861H31.5819C32.0768 17.8861 32.4818 17.4811 32.4818 16.9861C32.4818 16.4911 32.0768 16.0861 31.5819 16.0861ZM38.7818 10.6861V32.2861C38.7818 32.7811 38.3769 33.1861 37.8819 33.1861H20.3318L14.2118 39.2161C13.9868 39.4861 12.6818 39.8461 12.6818 38.5861V33.1861H5.48185C4.98685 33.1861 4.58185 32.7811 4.58185 32.2861V10.6861C4.58185 10.1911 4.98685 9.78613 5.48185 9.78613H37.8819C38.3769 9.78613 38.7818 10.1911 38.7818 10.6861ZM36.9818 11.5861H6.38185V31.3861H13.5818C14.0768 31.3861 14.4818 31.7911 14.4818 32.2861V36.4261L19.3418 31.6561C19.5218 31.4761 19.7468 31.3861 19.9718 31.3861H36.9818V11.5861Z"
										fill="black" />
									<path
										d="M549.982 -227.364V530.436H-252.818V-227.364H549.982ZM553.582 -230.964H-256.418V534.036H553.582V-230.964Z"
										fill="#0000FF" />
								</g>
								<defs>
									<clipPath id="clip0_126_1055">
										<rect width="45" height="45" fill="white" transform="translate(0 0.5)" />
									</clipPath>
								</defs>
							</svg>
							<svg class="blogs__share_img" width="33" height="34" viewBox="0 0 33 34" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M24.9076 21.7294C25.9937 21.7287 27.0499 22.0848 27.9137 22.743C28.7776 23.4012 29.4013 24.325 29.6887 25.3724C29.9762 26.4197 29.9116 27.5324 29.5048 28.5394C29.098 29.5464 28.3716 30.3919 27.4374 30.9457C26.5031 31.4995 25.4128 31.7309 24.3341 31.6045C23.2555 31.478 22.2482 31.0006 21.4674 30.2457C20.6866 29.4908 20.1755 28.5003 20.0127 27.4265C19.8499 26.3527 20.0444 25.2552 20.5664 24.3028L11.9965 19.8342C11.366 20.6446 10.4991 21.2389 9.51584 21.5347C8.53261 21.8306 7.48172 21.8133 6.50873 21.4854C5.53573 21.1575 4.68879 20.5351 4.08521 19.7044C3.48164 18.8738 3.1513 17.876 3.13995 16.8493C3.1286 15.8226 3.43681 14.8178 4.02189 13.974C4.60696 13.1303 5.43994 12.4893 6.40545 12.14C7.37096 11.7906 8.42121 11.7501 9.41074 12.0242C10.4003 12.2982 11.2801 12.8732 11.9283 13.6694L20.3637 9.28371C19.8602 8.12633 19.8158 6.82071 20.2396 5.63182C20.6635 4.44293 21.5238 3.45983 22.6459 2.882C23.7681 2.30418 25.068 2.17493 26.282 2.52047C27.4959 2.86602 28.533 3.66048 29.1826 4.74264C29.8323 5.82479 30.0459 7.11357 29.7801 8.34745C29.5143 9.58133 28.789 10.6679 27.7514 11.3866C26.7139 12.1053 25.4417 12.4023 24.1932 12.2174C22.9446 12.0325 21.8131 11.3795 21.0284 10.391L12.6079 14.7689C12.8872 15.3893 13.0353 16.0607 13.043 16.741C13.0507 17.4214 12.9178 18.096 12.6527 18.7225L21.3404 23.2526C21.8013 22.7709 22.355 22.3877 22.9681 22.1259C23.5812 21.8641 24.241 21.7292 24.9076 21.7294Z"
									fill="black" />
							</svg>
						</div>
					</div>
					</div>`;
		}
		blogsContent.innerHTML = container;
		if (blogsCount.length == blogs.length) {
			console.log('in');
			blogsBtn.innerHTML = "There is no more blogs"
		}
		console.log(blogsCount.length, blogs.length);
	})
})