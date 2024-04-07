"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const contentMain = document.querySelector(".content__main");
const allBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    // const blogs: storedBlog[] = JSON.parse(window.localStorage.getItem('blogs')!);
    let container = '';
    const blogsResponse = yield fetch(`${apiUrl_D}api/dashboard/blogs`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!blogsResponse.ok) {
        return;
    }
    const blogs = (yield blogsResponse.json()).blogs;
    blogs.reverse();
    if (blogs) {
        blogs.forEach(element => {
            container += `<div class="content__blog">
                    <div class="content__blog_thumbnail">
                        <img src="${apiUrl_D}${element.imageUrl}" alt="${element.title}_photo">
                    </div>
                    <div class="content__blog_info">
                        <h1>${element.title}</h1>
                        <h2>${element.description.slice(0, 170)} ...</h2>
                        <p></p>
                        <form action="" class="content__blog_cta_btn">
                            <input type="hidden" name="" value="${element._id}">
                            <a href="/dashboard/add-edit-blog.html" class="btn-edit">Edit</a>
                            <a href="/dashboard/add-edit-blog.html" class="btn-delete">Delete</a>
                        </form>
                    </div>
                </div>
                <hr>`;
        });
    }
    if (container.length) {
        contentMain.innerHTML = container;
    }
    else {
        contentMain.innerHTML = "<p>No Blogs Found, Add New.<p>";
    }
});
window.addEventListener('load', allBlogs);
// ----------------------- Blog CRUD operation and Form Validation ---------------------------------------
const editBtn = document.getElementsByClassName('btn-edit');
const addBlogBtn = document.querySelector('.btn-new-blog');
const editAddForm = document.querySelector('.content__add_edit_form');
const contentMainBlogs = document.querySelector('.content__main');
const errorMessage = document.getElementsByClassName('error-message');
;
const title = document.getElementById('title');
const photo = document.getElementById('photo');
const description = document.getElementById('description');
// array for input with invalid data
let errorFieldsForms = [];
let photoDataUrl = '';
const contentAddEditTitle = document.querySelector('.content__add_edit_title');
const contentAddEdit = document.querySelector('.content__add_edit');
const closeBtn = document.querySelector('.content__close_btn');
closeBtn.addEventListener('click', () => {
    contentAddEdit.style.display = 'none';
});
let blogId;
let editBlogImageUrl;
contentMainBlogs.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    let target = e.target;
    blogId = target.previousElementSibling.value;
    Array.from(errorMessage).forEach(element => {
        element.style.display = "none";
    });
    if (target.classList.value == 'btn-edit') {
        // Previous Form data reset
        editAddForm.reset();
        contentAddEdit.style.display = 'flex';
        // localStorage.setItem('mode', 'edit');
        contentAddEditTitle.innerHTML = 'Edit Blog';
        editAddForm.lastElementChild.innerText = "Update Blog";
        editAddForm.lastElementChild.classList.remove('post-blog');
        editAddForm.lastElementChild.classList.add("update-blog");
        photo.previousElementSibling.innerText = 'Update Photo';
        // Pre-populating Data and Editing Blog
        const blogResponse = yield fetch(`${apiUrl_D}api/dashboard/blog/${blogId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!blogResponse.ok) {
            return;
        }
        const blog = (yield blogResponse.json()).blog;
        editBlogImageUrl = blog.imageUrl;
        description.value = blog.description;
        title.value = blog.title;
    }
    // Deleting a blog
    if (target.classList.value == 'btn-delete') {
        const blogId = target.previousElementSibling.previousElementSibling.value;
        try {
            const blogResponse = yield fetch(`${apiUrl_D}api/dashboard/blog/${blogId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (blogResponse.ok) {
                dashMessageConfirmation.firstElementChild.innerHTML = `
                <i class="fa-solid fa-check"></i>
                <span>Blog was successfully deleted!</span>`;
                dashMessageConfirmation.style.display = "block";
            }
            else {
                dashMessageConfirmation.firstElementChild.innerHTML = `
                <i class="fa-solid fa-xmark"></i>
                <span>Something went wrong, Try again!</span>`;
                dashMessageConfirmation.style.display = "block";
            }
            allBlogs();
            setTimeout(() => {
                dashMessageConfirmation.style.display = "none";
            }, 3000);
        }
        catch (error) {
            dashMessageConfirmation.firstElementChild.innerHTML = `<i class="fa-solid fa-xmark"></i>
            <span>Something went wrong, Try again!</span>`;
            dashMessageConfirmation.style.display = "block";
            allBlogs();
            setTimeout(() => {
                dashMessageConfirmation.style.display = "none";
            }, 3000);
        }
    }
}));
// Adding New Blog
addBlogBtn.addEventListener('click', (e) => {
    e.preventDefault();
    Array.from(errorMessage).forEach(el => {
        el.style.display = "none";
    });
    contentAddEdit.style.display = 'flex';
    contentAddEditTitle.innerHTML = 'Add new Blog';
    editAddForm.lastElementChild.innerText = "Post Blog";
    editAddForm.lastElementChild.classList.remove("update-blog");
    editAddForm.lastElementChild.classList.add("post-blog");
    photo.previousElementSibling.innerText = 'Blog Photo';
    editAddForm.reset();
    photoDataUrl = '';
});
// Inputting, reset errorFieldsForms array
title.addEventListener('input', () => {
    errorFieldsForms = [];
    Array.from(errorMessage).forEach(el => {
        el.style.display = "none";
    });
});
photo.addEventListener('change', () => {
    errorFieldsForms = [];
    Array.from(errorMessage).forEach(el => {
        el.style.display = "none";
    });
});
description.addEventListener('input', () => {
    errorFieldsForms = [];
    Array.from(errorMessage).forEach(el => {
        el.style.display = "none";
    });
});
// Submit Event for the Add new blog form
editAddForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    let blogs = JSON.parse(localStorage.getItem('blogs'));
    let blogIndex = JSON.parse(localStorage.getItem('updateIndex'));
    e.preventDefault();
    // Form Validation
    // console.log(photo.files[0]);
    if (title.value.split(' ').join('').length < 4) {
        errorFieldsForms.push(title);
    }
    if (description.value.split(' ').join('').length < 100) {
        errorFieldsForms.push(description);
    }
    // Adding New 
    if (errorFieldsForms.length) {
        errorFieldsForms.forEach(el => {
            let childrenPreviousSibling = el.previousElementSibling;
            let parentPreviousSibling = el.parentElement.previousElementSibling;
            if (el.id == 'title') {
                parentPreviousSibling.innerText = "Enter valid title | *min = 4 characters";
                parentPreviousSibling.style.display = "block";
            }
            if (el.id == 'photo') {
                if (localStorage.getItem('mode') == "edit") {
                }
                else {
                    parentPreviousSibling.innerText = "Enter valid Image";
                    parentPreviousSibling.style.display = "block";
                }
            }
            if (el.id == 'description') {
                childrenPreviousSibling.innerText = "Enter valid description | *min = 100 characters";
                childrenPreviousSibling.style.display = "block";
            }
        });
    }
    else {
        console.log(e.target.lastElementChild.classList[0]);
        if (e.target.lastElementChild.classList[0] == "post-blog") {
            const formData = new FormData();
            formData.append('title', title.value);
            formData.append('imageUrl', photo.files[0]);
            formData.append('description', description.value);
            try {
                const blogPostResponse = yield fetch(`${apiUrl_D}api/dashboard/blog`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData
                });
                if (blogPostResponse.ok) {
                    dashMessageConfirmation.firstElementChild.innerHTML = `
                        <i class="fa-solid fa-check"></i>
                        <span>The blog was successfully posted!</span>`;
                    dashMessageConfirmation.style.display = "block";
                    contentAddEdit.style.display = 'none';
                    allBlogs();
                }
                else if (blogPostResponse.status == 409) {
                    dashMessageConfirmation.firstElementChild.innerHTML = `
                        <i class="fa-solid fa-xmark"></i>
                        <span>The blog with this data exists. Try again!</span>`;
                    dashMessageConfirmation.style.display = "block";
                }
                else if (blogPostResponse.status == 415) {
                    if ((yield blogPostResponse.json()).message == 'No image provided.') {
                        dashMessageConfirmation.firstElementChild.innerHTML = `
                            <i class="fa-solid fa-xmark"></i>
                            <span>Unsupported image type, Try again!</span>`;
                        dashMessageConfirmation.style.display = "block";
                    }
                }
                else {
                    dashMessageConfirmation.firstElementChild.innerHTML = `
                        <i class="fa-solid fa-xmark"></i>
                        <span>Something went wrong, Try again!</span>`;
                    dashMessageConfirmation.style.display = "block";
                }
                setTimeout(() => {
                    dashMessageConfirmation.style.display = "none";
                }, 3000);
            }
            catch (error) {
                console.log(error);
                dashMessageConfirmation.firstElementChild.innerHTML = `<i class="fa-solid fa-xmark"></i>
                <span>Something went wrong, Try again!</span>`;
                dashMessageConfirmation.style.display = "block";
                allBlogs();
                setTimeout(() => {
                    dashMessageConfirmation.style.display = "none";
                }, 3000);
            }
        }
        // Editing Existing Blog
        if (e.target.lastElementChild.classList[0] == "update-blog") {
            const formData = new FormData();
            formData.append('title', title.value);
            formData.append('description', description.value);
            if (photo.files[0]) {
                formData.append('imageUrl', photo.files[0]);
            }
            else {
                formData.append('newImageUrl', editBlogImageUrl);
            }
            try {
                const blogPostResponse = yield fetch(`${apiUrl_D}api/dashboard/blog/${blogId}`, {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData
                });
                console.log(blogPostResponse.status);
                if (blogPostResponse.ok) {
                    dashMessageConfirmation.firstElementChild.innerHTML = `
                        <i class="fa-solid fa-check"></i>
                        <span>The blog was successfully updated!</span>`;
                    dashMessageConfirmation.style.display = "block";
                    contentAddEdit.style.display = 'none';
                    allBlogs();
                }
                else if (blogPostResponse.status == 415) {
                    dashMessageConfirmation.firstElementChild.innerHTML = `
                        <i class="fa-solid fa-xmark"></i>
                        <span>Unsupported Media Type, Try again!</span>`;
                    dashMessageConfirmation.style.display = "block";
                }
                else {
                    dashMessageConfirmation.firstElementChild.innerHTML = `
                        <i class="fa-solid fa-xmark"></i>
                        <span>Something went wrong, Try again!</span>`;
                    dashMessageConfirmation.style.display = "block";
                }
                setTimeout(() => {
                    dashMessageConfirmation.style.display = "none";
                }, 3000);
            }
            catch (error) {
                console.log(error);
                dashMessageConfirmation.firstElementChild.innerHTML = `<i class="fa-solid fa-xmark"></i>
                <span>Something went wrong, Try again!</span>`;
                dashMessageConfirmation.style.display = "block";
                allBlogs();
                setTimeout(() => {
                    dashMessageConfirmation.style.display = "none";
                }, 3000);
            }
        }
    }
}));
