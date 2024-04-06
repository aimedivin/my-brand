const apiUrl = "http://localhost:3000/";

let container = '';

const blogsBtn = document.querySelector('.blogs__btn') as HTMLElement;
const blogsContent = document.querySelector('.blogs__content') as HTMLDivElement;

const blogViewContainer = document.querySelector('.blog--view-container')! as HTMLElement;


const blogTnTitle = document.getElementsByClassName('blog__tn_title');

const blogIdForm = document.getElementsByClassName('blog__id_form')

const googleIconCommentTn = document.getElementsByClassName('google--icon-comment-tn');


type commentType = {
    _id: string;
    creatorId: string;
    creatorName: string;
    blogId: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};


// Fetch single blog Data
const blogDataFetch = async (blogId: string) => {
    try {

        const blogResponse = await fetch(`${apiUrl}api/portfolio/blog/${blogId}`);

        if (blogResponse.ok) {
            const blogData = await blogResponse.json();
            return blogData.blog;
        } else {
            return;
        }
    } catch (error) {
        return
    }
}

// FETCHING LIKE FOR SPECIFIC USER
const userLikeFetch = async (blogId: string) => {
    try {
        const token = localStorage.getItem('token');
        const blogUserLikeResponse = await fetch(`${apiUrl}api/portfolio/blog/${blogId}/like`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

        if (blogUserLikeResponse.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}


// BLOG COMMENTS RETRIEVAL
const blogCommentFetch = async (blogId: string) => {

    let blogComments = '';
    const commentResponse = await fetch(`${apiUrl}api/portfolio/blog/${blogId}/comment`)

    const comments: { name: string, description: string }[] = [];

    if (commentResponse.ok) {
        const commentCreator: commentType[] = (await commentResponse.json()).comments
        commentCreator.forEach(comment => {
            comments.push({
                name: comment.creatorName,
                description: comment.description
            })
        })
    }
    if (!comments.length) {
        return {
            data: '<p class="blog__comment_description"> No comments Available on this Blog <p></p>', length: comments.length
        };
    } else {
        for (let i = 0; i < comments.length; i++) {

            blogComments += `<div class="blog__comment">
                                        <div>
                                            <p class="blog__comment_username">${comments[i].name}</p>
                                            <p class="blog__comment_description">${comments[i].description}</p>
                                            
                                        </div>
                                    </div>`
        }
    }
    return { data: blogComments, length: comments.length }
}


// Registered event and retrieve data for single blog
// const registerBlogActions = (arr: any ) => {
//     Array.from(arr).forEach
// }

// SINGLE BLOG ACTIONS
const singleBlog = (arr: HTMLCollection) => {
    // Retrieving single blog
    Array.from(arr).forEach((el, index) => {

        el.addEventListener('click', async (e) => {

            e.preventDefault()
            let blogComments;
            let blogContainer = '';
            const likeTn = document.getElementsByClassName('blogtn--like-count');
            const commentTn = document.getElementsByClassName('blogtn--comment-count');
            

            const blogTarget = e.target as HTMLElement;


            const blogIndex = (blogIdForm[index].firstElementChild as HTMLInputElement).value;


            const response = await fetch(`${apiUrl}api/portfolio/blog/${blogIndex}`);
            if (!response.ok) {
                return;
            }

            const blog = await response.json();
            const blogData = blog.blog;

            // BLOG DATE
            const date = new Date(blogData.createdAt)
            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            const blogDate = `${date.toLocaleDateString('en-US', { weekday: 'long' })}, 
                ${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`


            // BLOG COMMENTS RETRIEVAL
            blogComments = await blogCommentFetch(blogIndex);


            // FETCHING LIKE FOR SPECIFIC USER
            const userLike = await userLikeFetch(blogData._id);

            // DISPLAY SINGLE BLOG DATA
            blogContainer = `<div class="blog__view">
                    <div class="blog__view_close">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    
                    <div class="blog__view_content">
                        <div class="blog__view_main_content">
                            <p class="blog__view_title">${blogData.title}</p>
                            
                            <div class="blog__view_thumbnail_author">
                                <div class="blog__view_thumbnail">
                                    <figure>
                                        <img src="${apiUrl}${blogData.imageUrl}" alt="" srcset="">
                                    </figure>
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
                            <div class="blog__view_date">
                        <div>
                            <span class="material-symbols-outlined">calendar_month</span>
                            <span>${blogDate}</span>
                        </div>
                        </div>
                            <div class="blog__view_description">
                                <p>${blogData.description}</p>
                            </div>
                        </div>
                        
                        <div class="blog__view_sub_content">
                            <hr>
                            <div class="blog__view_cta_btn">
                                <div class="blog--like">
                                    <span class=" material-symbols-outlined"><i class="google--icon-like ${userLike ? 'fa-solid' : 'fa-regular'} fa-heart"></i></span>
                                    <span class="blog__view_count">${blogData.likes ? blogData.likes : 0}</span>
                                </div>
                                <div class="blog--comment">
                                    <span class="google--icon-comment material-symbols-outlined">chat</span>
                                    <span class="blog__view_count">${blogComments.length}</span>
                                </div>
                                <div class="blog--share">
                                    <span class="google--icon-share material-symbols-outlined">share</span>
                                    <span></span>
                                </div>
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
                                    ${blogComments.data}
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


            blogViewContainer.innerHTML = blogContainer;
            blogViewContainer.style.display = 'block';

            // BLOG VIEW CLOSE BUTTON
            const blogViewClose = document.querySelector('.blog__view_close .fa-xmark')!;

            blogViewClose.addEventListener('click', () => {
                blogViewContainer.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
            document.body.style.overflow = 'hidden';

            // BLOG LIKE BUTTON
            const likeBtn = document.querySelector(".google--icon-like")
            likeBtn?.addEventListener('click', async () => {
                try {
                    const blogLikeCount = document.querySelector('.blog--like .blog__view_count');
                    const token = localStorage.getItem('token');
                    const blogLikeResponse = await fetch(`${apiUrl}api/portfolio/blog/${blogData._id}/like`,
                        {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${token}`
                            },
                        });

                    let blogData_Like;

                    if (blogLikeResponse.ok) {
                        blogData_Like = await blogDataFetch(blogData._id);
                        if (blogData_Like) {
                            blogLikeCount!.innerHTML = `${blogData_Like.likes ? blogData_Like.likes : '--'}`
                            likeBtn.classList.remove('fa-regular');
                            likeBtn.classList.add('fa-solid');
                            likeTn[index].innerHTML = `${blogData_Like.likes ? blogData_Like.likes : '--'}`;
                        }
                        return;
                    }
                    else if (blogLikeResponse.status == 401) {
                        // Handling unauthorized access
                        messageConfirmation.firstElementChild!.innerHTML = `
                            <i class="fa-solid fa-xmark"></i> <span>Only registered Users can like blog!</span>`;
                        messageConfirmation.style.display = "block";

                        setTimeout(() => {
                            messageConfirmation.style.display = "none";
                        }, 2000);
                    }
                    else if (blogLikeResponse.status == 409) {
                        // Handling conflict - user already liked the blog, so deleting the like

                        const blogDeleteLikeResponse = await fetch(`${apiUrl}api/portfolio/blog/${blogData._id}/like`,
                            {
                                method: "DELETE",
                                headers: {
                                    "Authorization": `Bearer ${token}`
                                },
                            });


                        if (blogDeleteLikeResponse.ok) {

                            blogData_Like = await blogDataFetch(blogData._id);

                            blogLikeCount!.innerHTML = `${blogData_Like.likes > -1 ? blogData_Like.likes : '--'}`;
                            likeTn[index].innerHTML = `${blogData_Like.likes > -1 ? blogData_Like.likes : '--'}`;
                            likeBtn.classList.add('fa-regular');
                            likeBtn.classList.remove('fa-solid');
                        } else {
                            throw new Error('');
                        }
                    }
                    else {
                        throw new Error('');
                    }
                } catch (error) {
                    messageConfirmation.firstElementChild!.innerHTML = `
                                    <i class="fa-solid fa-xmark"></i>
                                    <span>Something went wrong, Try again!</span>`;
                    messageConfirmation.style.display = "block";

                    setTimeout(() => {
                        messageConfirmation.style.display = "none";
                    }, 2000);
                }
            });

            //BLOG VIEW ADD NEW COMMENT
            const blogCommentForm = document.querySelector('.blog__comment_new')! as HTMLFormElement;

            blogCommentForm.addEventListener('submit', async (e) => {

                e.preventDefault();

                const blogCommentsContainer = document.querySelector('.blog__comments')! as HTMLElement;

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

                    if (!token) {
                        messageConfirmation.firstElementChild!.innerHTML = `
                            <i class="fa-solid fa-xmark"></i> <span>Only registered users can comment on the blog!</span>`;
                        messageConfirmation.style.display = "block";

                        setTimeout(() => {
                            messageConfirmation.style.display = "none";
                        }, 2000);
                        return;
                    }
                    else if (!response.ok) {
                        console.log('in5');

                        messageConfirmation.firstElementChild!.innerHTML = `
                            <i class="fa-solid fa-xmark"></i> <span>Something went wrong, Try again!</span>`;
                        messageConfirmation.style.display = "block";

                        setTimeout(() => {
                            messageConfirmation.style.display = "none";
                        }, 2000);
                        return;
                    } else {

                        messageConfirmation.firstElementChild!.innerHTML = `
                            <i class="fa-solid fa-check"></i> <span>Comment was added !</span>`;
                        messageConfirmation.style.display = "block";

                        setTimeout(() => {
                            messageConfirmation.style.display = "none";
                        }, 2000);
                        console.log(blogCommentsContainer);

                        const blogComments = await blogCommentFetch(blogIndex);
                        blogCommentsContainer.innerHTML = `${blogComments.data} <form action="" class="blog__comment_new">
                                        <input type="hidden" value="${blogData._id}" name="blogId">
                                        <textarea placeholder="Add Your Comment" name="description"></textarea>
                                        <button>Post</button>
                                    </form>`;
                    }

                } catch (error) {
                    console.log(error);

                    messageConfirmation.firstElementChild!.innerHTML = `
                            <i class="fa-solid fa-xmark"></i> <span>Something went wrong, Try again!</span>`;
                    messageConfirmation.style.display = "block";

                    setTimeout(() => {
                        messageConfirmation.style.display = "none";
                    }, 2000);
                }
            });
        })
    });
}

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

            const date = new Date(blogs.blogs[i].createdAt)
            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            const blogDate = `${date.toLocaleDateString('en-US', { weekday: 'short' })}, 
            ${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`

            const userLike = await userLikeFetch(blogs.blogs[i]._id)

            container += `<div class="blogs__blog">
        				<figure class="blogs__thumbnail">
        					<img src="${apiUrl}${blogs.blogs[i].imageUrl}" alt="">
        				</figure>
        				<div>
        					<form action="" method="" class="blog__id_form">
        						<input type="hidden" value="${blogs.blogs[i]._id}">
        					</form>
        					<a href="/blog/${blogs.blogs[i]._id}" class="blog__tn_title">${blogs.blogs[i].title}</a>
        					<p class="blog__tn_description">${blogs.blogs[i].description.slice(0, 150)}... <a href="">Read More</a></p>
        				</div>
        				<div class="blogs__action">
        					<div class="blogs__cta_btn">
                                <div class="blog--like">
                                    <span class=" material-symbols-outlined"><i class="google--icon-like ${userLike ? 'fa-solid' : 'fa-regular'} fa-heart"></i></span>
                                    <span class="blog__view_count blogtn--like-count">${blogs.blogs[i].likes ? blogs.blogs[i].likes : 0}</span>
                                </div>
                                <div class="blog--comment">
                                    <span class="google--icon-comment-tn material-symbols-outlined">chat</span>
                                    <span class="blog__view_count blogtn--comment-count">${blogs.blogs[i].comments ? blogs.blogs[i].comments : 0}</span>
                                </div>
        					</div>
                            <div class="blog__date">
                                <span class="material-symbols-outlined">calendar_month</span>
                                <span>${blogDate}</span>
                            </div>
        				</div>
        				</div>`;
        }

        // Display Blog
        if (container.length) {
            blogsContent.innerHTML = container;
            singleBlog(blogTnTitle);
        } else {
            blogsContent.innerHTML = 'No Blog available, for now';
            blogsBtn.style.display = 'none';
        }

        // REGISTER EVENT FOR 
        singleBlog(googleIconCommentTn);


        // Blog Load More button
        blogsBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const response = await fetch(`${apiUrl}api/portfolio/blogs`);
            if (!response.ok) {
                return;
            }

            const blogs = await response.json();
            container = '';
            let blogsCount = Array.from(blogsContent.children);

            for (let i = 0; i < blogs.blogs.length; i++) {
                if (i == blogsCount.length + 2) {
                    break;
                }
                const date = new Date(blogs.blogs[i].createdAt)
                const months = [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ];

                const blogDate = `${date.toLocaleDateString('en-US', { weekday: 'short' })}, 
            ${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`

                const userLike = await userLikeFetch(blogs.blogs[i]._id)

                container += `<div class="blogs__blog">
        				<figure class="blogs__thumbnail">
        					<img src="${apiUrl}${blogs.blogs[i].imageUrl}" alt="">
        				</figure>
        				<div>
        					<form action="" method="" class="blog__id_form">
        						<input type="hidden" value="${blogs.blogs[i]._id}">
        					</form>
        					<a href="/blog/${blogs.blogs[i]._id}" class="blog__tn_title">${blogs.blogs[i].title}</a>
        					<p class="blog__tn_description">${blogs.blogs[i].description.slice(0, 150)}... <a href="">Read More</a></p>
        				</div>
        				<div class="blogs__action">
        					<div class="blogs__cta_btn">
                                <div class="blog--like">
                                    <span class=" material-symbols-outlined"><i class="google--icon-like ${userLike ? 'fa-solid' : 'fa-regular'} fa-heart"></i></span>
                                    <span class="blog__view_count blogtn--like-count">${blogs.blogs[i].likes ? blogs.blogs[i].likes : 0}</span>
                                </div>
                                <div class="blog--comment">
                                    <span class="google--icon-comment-tn material-symbols-outlined">chat</span>
                                    <span class="blog__view_count blogtn--comment-count">${blogs.blogs[i].comments ? blogs.blogs[i].comments : 0}</span>
                                </div>
        					</div>
                            <div class="blog__date">
                                <span class="material-symbols-outlined">calendar_month</span>
                                <span>${blogDate}</span>
                            </div>
        				</div>
        				</div>`;
            }

            blogsContent.innerHTML = container;

            if (blogsCount.length == blogs.blogs.length) {
                blogsBtn.innerHTML = "There is no more blogs"
            }

            // Registered event and retrieve data for single blog
            singleBlog(blogTnTitle)
        })

    } catch (error) {
        messageConfirmation.firstElementChild!.innerHTML = `
                                    <i class="fa-solid fa-xmark"></i>
                                    <span>Something went wrong, Try again!</span>`;
        messageConfirmation.style.display = "block";

        setTimeout(() => {
            messageConfirmation.style.display = "none";
        }, 2000);
    }
});

