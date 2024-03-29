const apiUrl = "https://my-brand-aimedivin-backend.onrender.com/";

let container = '';

const blogsBtn = document.querySelector('.blogs__btn') as HTMLElement;
const blogsContent = document.querySelector('.blogs__content') as HTMLDivElement;

const blogViewContainer = document.querySelector('.blog--view-container')! as HTMLElement;
const blogMain = document.getElementsByTagName('main');
const blogTnTitle = document.getElementsByClassName('blog__tn_title');


window.addEventListener('load', async () => {
    // Retrieving All Blogs
    try {
        const response = await fetch(`${apiUrl}api/portfolio/blogs`);
        if (!response.ok) {
            return;
        }

        const blogs = await response.json();

        for (let i = 0; i < blogs.blogs.length; i++) {
            if (i == 2) break;
            container += `<div class="blogs__blog">
        				<figure class="blogs__thumbnail">
        					<img src="${blogs.blogs[i].imageUrl}" alt="">
        				</figure>
        				<div>
        					<form action="" method="">
        						<input type="hidden" value="${blogs.blogs[i]._id}">
        					</form>
        					<a href="/blog/${blogs.blogs[i]._id}" class="blog__tn_title">${blogs.blogs[i].title}</a>
        					<p class="blog__tn_description">${blogs.blogs[i].description.slice(0, 150)}... <a href="">Read More</a></p>
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

            for (let i = 0; i < blogs.blogs.length; i++) {
                if (i == blogsCount.length + 2) {
                    break;
                }
                container += `<div class="blogs__blog">
        				<figure class="blogs__thumbnail">
        					<img src="${blogs.blogs[i].imageUrl}" alt="">
        				</figure>
        				<div>
        					<form action="" method="">
        						<input type="hidden" value="${i}">
        					</form>
        					<a href="" class="blog__tn_title">${blogs.blogs[i].title}</a>
        					<p class="blog__tn_description">${blogs.blogs[i].description.slice(0, 150)}... <a href="">Read More</a></p>
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

            if (blogsCount.length == blogs.blogs.length) {
                blogsBtn.innerHTML = "There is no more blogs"
            }
        })

    } catch (error) {
        console.log(error);
    }

    // Retrieving single blog
    Array.from(blogTnTitle).forEach(el => {
        el.addEventListener('click', async (e) => {
            e.preventDefault();

            let blogContainer = '';
            let blogIndex;

            const blogTarget = e.target as HTMLAnchorElement;

            blogIndex = (blogTarget.parentElement!.firstElementChild!.firstElementChild! as HTMLInputElement).value;

            try {
                const response = await fetch(`${apiUrl}api/portfolio/blog/${blogIndex}`);
                if (!response.ok) {
                    return;
                }

                const blog = await response.json();
                const blogData = blog.blog;

                // window.location.href = `/blog/${blogData._id}`;

                blogContainer = `<div class="blog__view">
                    <div class="blog__view_close">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div class="blog__view_content">
                        <div class="blog__view_main_content">
                            <div class="blog__view_thumbnail_author">
                                <div class="blog__view_thumbnail">
                                    <img src="${blogData.imageUrl}" alt="" srcset="">
                                </div>
                                <div class="blog__view_author">
                                    <p>Author</p>
                                    <div class="blog__view_author_container">
                                        <figure>   
                                            <img src="/assets/images/my-photo-passport.jpg" alt="" srcset="">
                                        </figure>
                                        <div>
                                            <p class="blog__view_author_name">IRAGENA Aime Divn</p>
                                            <p class="blog__view_author_title">Software Engineer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="blog__view_description">
                                <p class="blog__view_title">${blogData.title}</p>
                                <p>${blogData.description}</p>
                            </div>
                        </div>
                        <div class="blog__view_sub_content">
                            <hr>
                            <div class="blog__view_cta_btn">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 35.7132C19.8189 35.7134 19.6395 35.6777 19.4721 35.6084C19.3048 35.539 19.1528 35.4373 19.0249 35.309L5.85796 22.1421C1.82485 18.109 1.82485 11.5463 5.85796 7.51317C9.73106 3.63731 15.9393 3.48144 20 7.05524C24.058 3.48558 30.2662 3.63593 34.1421 7.51317C38.1752 11.5463 38.1752 18.1104 34.1421 22.1421L20.9752 35.309C20.8473 35.4373 20.6953 35.539 20.5279 35.6084C20.3606 35.6777 20.1812 35.7134 20 35.7132ZM13.1738 7.2442C12.1775 7.24246 11.1906 7.43748 10.2699 7.8181C9.34912 8.19871 8.51259 8.75741 7.8083 9.46213C6.38737 10.8857 5.58933 12.8149 5.58933 14.8263C5.58933 16.8376 6.38737 18.7668 7.8083 20.1904L20 32.3821L32.1918 20.1904C33.6127 18.7668 34.4107 16.8376 34.4107 14.8263C34.4107 12.8149 33.6127 10.8857 32.1918 9.46213C30.7682 8.0412 28.839 7.24316 26.8276 7.24316C24.8162 7.24316 22.8871 8.0412 21.4635 9.46213L20.9752 9.95041C20.8472 10.0786 20.6952 10.1803 20.5279 10.2497C20.3605 10.3191 20.1812 10.3548 20 10.3548C19.8189 10.3548 19.6395 10.3191 19.4722 10.2497C19.3048 10.1803 19.1528 10.0786 19.0249 9.95041L18.5366 9.46213C17.8328 8.75743 16.9968 8.19872 16.0765 7.8181C15.1562 7.43747 14.1697 7.24244 13.1738 7.2442Z" fill="black"/>
                                </svg>
                                <svg width="45" height="46" viewBox="0 0 45 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_126_1055)">
                                    <path d="M32.4818 21.4861C32.4818 21.9811 32.0768 22.3861 31.5819 22.3861H11.7818C11.2868 22.3861 10.8818 21.9811 10.8818 21.4861C10.8818 20.9911 11.2868 20.5861 11.7818 20.5861H31.5819C32.0768 20.5861 32.4818 20.9911 32.4818 21.4861ZM26.0918 25.0861H11.7818C11.2868 25.0861 10.8818 25.4911 10.8818 25.9861C10.8818 26.4811 11.2868 26.8861 11.7818 26.8861H26.0918C26.5868 26.8861 26.9918 26.4811 26.9918 25.9861C26.9918 25.4911 26.5868 25.0861 26.0918 25.0861ZM31.5819 16.0861H11.7818C11.2868 16.0861 10.8818 16.4911 10.8818 16.9861C10.8818 17.4811 11.2868 17.8861 11.7818 17.8861H31.5819C32.0768 17.8861 32.4818 17.4811 32.4818 16.9861C32.4818 16.4911 32.0768 16.0861 31.5819 16.0861ZM38.7818 10.6861V32.2861C38.7818 32.7811 38.3769 33.1861 37.8819 33.1861H20.3318L14.2118 39.2161C13.9868 39.4861 12.6818 39.8461 12.6818 38.5861V33.1861H5.48185C4.98685 33.1861 4.58185 32.7811 4.58185 32.2861V10.6861C4.58185 10.1911 4.98685 9.78613 5.48185 9.78613H37.8819C38.3769 9.78613 38.7818 10.1911 38.7818 10.6861ZM36.9818 11.5861H6.38185V31.3861H13.5818C14.0768 31.3861 14.4818 31.7911 14.4818 32.2861V36.4261L19.3418 31.6561C19.5218 31.4761 19.7468 31.3861 19.9718 31.3861H36.9818V11.5861Z" fill="black"/>
                                    <path d="M549.982 -227.364V530.436H-252.818V-227.364H549.982ZM553.582 -230.964H-256.418V534.036H553.582V-230.964Z" fill="#0000FF"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_126_1055">
                                    <rect width="45" height="45" fill="white" transform="translate(0 0.5)"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.9076 21.7294C25.9937 21.7287 27.0499 22.0848 27.9137 22.743C28.7776 23.4012 29.4013 24.325 29.6887 25.3724C29.9762 26.4197 29.9116 27.5324 29.5048 28.5394C29.098 29.5464 28.3716 30.3919 27.4374 30.9457C26.5031 31.4995 25.4128 31.7309 24.3341 31.6045C23.2555 31.478 22.2482 31.0006 21.4674 30.2457C20.6866 29.4908 20.1755 28.5003 20.0127 27.4265C19.8499 26.3527 20.0444 25.2552 20.5664 24.3028L11.9965 19.8342C11.366 20.6446 10.4991 21.2389 9.51584 21.5347C8.53261 21.8306 7.48172 21.8133 6.50873 21.4854C5.53573 21.1575 4.68879 20.5351 4.08521 19.7044C3.48164 18.8738 3.1513 17.876 3.13995 16.8493C3.1286 15.8226 3.43681 14.8178 4.02189 13.974C4.60696 13.1303 5.43994 12.4893 6.40545 12.14C7.37096 11.7906 8.42121 11.7501 9.41074 12.0242C10.4003 12.2982 11.2801 12.8732 11.9283 13.6694L20.3637 9.28371C19.8602 8.12633 19.8158 6.82071 20.2396 5.63182C20.6635 4.44293 21.5238 3.45983 22.6459 2.882C23.7681 2.30418 25.068 2.17493 26.282 2.52047C27.4959 2.86602 28.533 3.66048 29.1826 4.74264C29.8323 5.82479 30.0459 7.11357 29.7801 8.34745C29.5143 9.58133 28.789 10.6679 27.7514 11.3866C26.7139 12.1053 25.4417 12.4023 24.1932 12.2174C22.9446 12.0325 21.8131 11.3795 21.0284 10.391L12.6079 14.7689C12.8872 15.3893 13.0353 16.0607 13.043 16.741C13.0507 17.4214 12.9178 18.096 12.6527 18.7225L21.3404 23.2526C21.8013 22.7709 22.355 22.3877 22.9681 22.1259C23.5812 21.8641 24.241 21.7292 24.9076 21.7294Z" fill="black"/>
                                </svg>
                            </div>
                            <div class="blog__view_comments">
                                <div class="blog__view_comment_title">
                                    <p>Comments</p>
                                    <svg width="36" height="35" viewBox="0 0 36 35" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_77_1377)">
                                            <path
                                                d="M15.0833 26.25H20.9167V23.3333H15.0833V26.25ZM4.875 8.75V11.6667H31.125V8.75H4.875ZM9.25 18.9583H26.75V16.0417H9.25V18.9583Z"
                                                fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_77_1377">
                                                <rect width="35" height="35" fill="white" transform="translate(0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div class="blog__comments">
                                    <div class="blog__comment">
                                        <div>
                                            <p class="blog__comment_username">John Doe</p>
                                            <p class="blog__comment_description">Captivating read! Looking forward to more
                                                content like thisCaptivating read! Looking forward to more ccontent like
                                                thisCaptivating read! Looking forward to more content like</p>
                                            <div class="blog__comment_btn">
                                                <div class="blog__comment_btn_like">
                                                    <svg width="76" height="68" viewBox="0 0 76 68" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M5.85295 67.9901C4.30511 67.9772 2.82474 67.4214 1.73021 66.442C0.635671 65.4627 0.0143994 64.1382 0 62.7533V26.1546C0 23.299 2.67248 20.9178 5.85295 20.9178H14.6324C16.7969 20.9178 18.6963 22.0343 19.7123 23.635C21.678 22.5481 23.6106 21.9157 24.8585 21.2735C27.796 19.7518 29.2979 15.4833 29.9936 11.027C30.3359 8.80384 30.5237 6.65969 30.8329 4.87126C30.9875 3.98198 31.1311 3.19151 31.5397 2.322C31.8005 1.66251 32.277 1.08844 32.9072 0.67436C33.5374 0.260278 34.2922 0.0253183 35.0735 0C39.4135 0 42.9695 1.52165 45.2334 3.85353C47.5083 6.17553 48.5684 9.09038 49.1427 11.9756C50.0703 16.6986 49.7169 20.7004 49.5403 23.5559H67.2095C72.0244 23.5559 76 27.0933 76 31.3915C76 32.9131 75.5141 34.0593 74.8957 35.8378C74.2772 37.6263 73.449 39.7803 72.5214 42.0825C70.6882 46.687 68.5016 51.9041 67.066 55.7478C66.5259 57.4013 65.6251 58.9427 64.4156 60.2831C63.6762 61.0499 62.7632 61.6675 61.7371 62.095C60.711 62.5226 59.5951 62.7503 58.4632 62.7632H23.3897C22.3938 62.755 21.4071 62.5911 20.4743 62.279V62.773C20.4743 65.6187 17.8239 68 14.6324 68L5.85295 67.9901ZM5.85295 62.7533H14.6324V26.1546H5.85295V62.7533ZM23.3897 57.5263H58.4632C59.2363 57.5263 59.4792 57.388 59.9872 56.8544C60.679 56.0127 61.2021 55.0699 61.5333 54.068C63.0241 50.0663 65.2107 44.8591 67.0218 40.3139C67.9274 38.0413 68.7446 35.9366 69.3078 34.2865C69.882 32.6463 70.1581 31.1642 70.1581 31.3816C70.1657 31.0355 70.0948 30.6916 69.9495 30.3707C69.8043 30.0498 69.5879 29.7587 69.3133 29.5148C69.0387 29.271 68.7116 29.0795 68.3519 28.952C67.9922 28.8245 67.6073 28.7636 67.2206 28.773H46.5144C46.1282 28.7743 45.7456 28.7072 45.3885 28.5756C45.0315 28.444 44.7071 28.2505 44.434 28.0061C44.1609 27.7618 43.9446 27.4715 43.7975 27.1521C43.6504 26.8326 43.5754 26.4902 43.5769 26.1447C43.5769 23.0619 44.3278 17.5484 43.4112 12.8649C42.9474 10.533 42.086 8.5667 40.8381 7.29207C39.7589 6.20573 38.2755 5.507 36.6638 5.32578C36.3656 6.81779 36.1668 9.36704 35.7913 11.7483C35.0294 16.6196 33.5937 22.7852 27.7739 25.7989C25.5984 26.9154 23.5001 27.5774 22.2523 28.3482C20.9933 29.1189 20.4853 29.5339 20.4853 31.3816V54.898C20.4853 56.3999 21.7222 57.5263 23.3897 57.5263Z"
                                                            fill="#A83C00" />
                                                    </svg>
                                                    <span>99+</span>
                                                </div>
                                                <div class="blog__comment_btn_reply">
                                                    <svg width="80" height="60" viewBox="0 0 80 60" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M28.9 11.8279V0L0 28.4824L28.9 58.0015V45.75L12 28.4824L28.9 11.8279ZM48.9 17.0603V0L20 28.4824L48.9 58.0015V38.7794C62.068 38.7794 70.064 40.6412 80 60C80 59.9956 78.528 17.0603 48.9 17.0603Z"
                                                            fill="#004C15" />
                                                    </svg>
                                                    <span>5</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="blog__comment">
                                        <div>
                                            <p class="blog__comment_username">John Doe</p>
                                            <p class="blog__comment_description">Captivating read! Looking forward to more
                                                content like thisCaptivating read!
                                                Looking forward to more content like
                                                thisCaptivating read! Looking forward to more content like this</p>
                                            <div class="blog__comment_btn">
                                                <div class="blog__comment_btn_like">
                                                    <svg width="76" height="68" viewBox="0 0 76 68" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M5.85295 67.9901C4.30511 67.9772 2.82474 67.4214 1.73021 66.442C0.635671 65.4627 0.0143994 64.1382 0 62.7533V26.1546C0 23.299 2.67248 20.9178 5.85295 20.9178H14.6324C16.7969 20.9178 18.6963 22.0343 19.7123 23.635C21.678 22.5481 23.6106 21.9157 24.8585 21.2735C27.796 19.7518 29.2979 15.4833 29.9936 11.027C30.3359 8.80384 30.5237 6.65969 30.8329 4.87126C30.9875 3.98198 31.1311 3.19151 31.5397 2.322C31.8005 1.66251 32.277 1.08844 32.9072 0.67436C33.5374 0.260278 34.2922 0.0253183 35.0735 0C39.4135 0 42.9695 1.52165 45.2334 3.85353C47.5083 6.17553 48.5684 9.09038 49.1427 11.9756C50.0703 16.6986 49.7169 20.7004 49.5403 23.5559H67.2095C72.0244 23.5559 76 27.0933 76 31.3915C76 32.9131 75.5141 34.0593 74.8957 35.8378C74.2772 37.6263 73.449 39.7803 72.5214 42.0825C70.6882 46.687 68.5016 51.9041 67.066 55.7478C66.5259 57.4013 65.6251 58.9427 64.4156 60.2831C63.6762 61.0499 62.7632 61.6675 61.7371 62.095C60.711 62.5226 59.5951 62.7503 58.4632 62.7632H23.3897C22.3938 62.755 21.4071 62.5911 20.4743 62.279V62.773C20.4743 65.6187 17.8239 68 14.6324 68L5.85295 67.9901ZM5.85295 62.7533H14.6324V26.1546H5.85295V62.7533ZM23.3897 57.5263H58.4632C59.2363 57.5263 59.4792 57.388 59.9872 56.8544C60.679 56.0127 61.2021 55.0699 61.5333 54.068C63.0241 50.0663 65.2107 44.8591 67.0218 40.3139C67.9274 38.0413 68.7446 35.9366 69.3078 34.2865C69.882 32.6463 70.1581 31.1642 70.1581 31.3816C70.1657 31.0355 70.0948 30.6916 69.9495 30.3707C69.8043 30.0498 69.5879 29.7587 69.3133 29.5148C69.0387 29.271 68.7116 29.0795 68.3519 28.952C67.9922 28.8245 67.6073 28.7636 67.2206 28.773H46.5144C46.1282 28.7743 45.7456 28.7072 45.3885 28.5756C45.0315 28.444 44.7071 28.2505 44.434 28.0061C44.1609 27.7618 43.9446 27.4715 43.7975 27.1521C43.6504 26.8326 43.5754 26.4902 43.5769 26.1447C43.5769 23.0619 44.3278 17.5484 43.4112 12.8649C42.9474 10.533 42.086 8.5667 40.8381 7.29207C39.7589 6.20573 38.2755 5.507 36.6638 5.32578C36.3656 6.81779 36.1668 9.36704 35.7913 11.7483C35.0294 16.6196 33.5937 22.7852 27.7739 25.7989C25.5984 26.9154 23.5001 27.5774 22.2523 28.3482C20.9933 29.1189 20.4853 29.5339 20.4853 31.3816V54.898C20.4853 56.3999 21.7222 57.5263 23.3897 57.5263Z"
                                                            fill="#A83C00" />
                                                    </svg>
                                                    <span>99+</span>
                                                </div>
                                                <div class="blog__comment_btn_reply">
                                                    <svg width="80" height="60" viewBox="0 0 80 60" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M28.9 11.8279V0L0 28.4824L28.9 58.0015V45.75L12 28.4824L28.9 11.8279ZM48.9 17.0603V0L20 28.4824L48.9 58.0015V38.7794C62.068 38.7794 70.064 40.6412 80 60C80 59.9956 78.528 17.0603 48.9 17.0603Z"
                                                            fill="#004C15" />
                                                    </svg>
                                                    <span>5</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="blog__comment_next">
                                        <p>Next >></p>
                                    </div>
                                    <form action="" class="blog__comment_new">
                                        <input type="hidden" value="${blogData._id}" name="blogId">
                                        <textarea placeholder="Add Your Comment" name="description"></textarea>
                                        <button>Post</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

            } catch (error) {
                console.log(error);
            }

            blogViewContainer.innerHTML = blogContainer;
            blogViewContainer.style.display = 'block';

            const blogViewClose = document.querySelector('.blog__view_close .fa-xmark')!;

            blogViewClose.addEventListener('click', () => {
                blogViewContainer.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            document.body.style.overflow = 'hidden';

            const blogCommentForm = document.querySelector('.blog__comment_new')! as HTMLFormElement;

            blogCommentForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Accessing form data
                const formData = new FormData(blogCommentForm);

                // Retrieve Form data
                const blogId = formData.get('blogId');
                const description = formData.get('description');

                const token = localStorage.getItem('token');

                try {
                    const response = await fetch(`${apiUrl}api/portfolio/blog/${blogId}/comment`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify({ description })
                        })
                    if (!response.ok || !token) {
                        messageConfirmation.firstElementChild!.innerHTML = `
                            <i class="fa-solid fa-xmark"></i> <span>You're not logged In !</span>`;
                        messageConfirmation.style.display = "block";

                        setTimeout(() => {
                            messageConfirmation.style.display = "none";
                        }, 2000);
                        return;
                    }
                    messageConfirmation.firstElementChild!.innerHTML = `
                            <i class="fa-solid fa-check"></i> <span>Comment was added !</span>`;
                    messageConfirmation.style.display = "block";

                    setTimeout(() => {
                        messageConfirmation.style.display = "none";
                    }, 2000);


                } catch (error) {

                }

            });
        })
    });
});

