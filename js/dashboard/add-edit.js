// const editBtn = document.getElementsByClassName('btn-edit');
// const addBlogBtn = document.querySelector('.btn-new-blog');
// const editAddForm = document.querySelector('.content__add_edit_form')

// const contentMainBlogs = document.querySelector('.content__main')
//     ;
// const title = document.getElementById('title');
// const photo = document.getElementById('photo');
// const description = document.getElementById('description');
// let photoDataUrl = '';

// const contentAddEditTitle = document.querySelector('.content__add_edit_title')

// const contentAddEdit = document.querySelector('.content__add_edit')
// const closeBtn = document.querySelector('.content__close_btn');
// closeBtn.addEventListener('click', () => {
//     contentAddEdit.style.display = 'none'
// });


// if (photo) {
//     photo.addEventListener('change', function () {
//         const reader = new FileReader();
//         reader.addEventListener('load', () => {
//             photoDataUrl = reader.result
//         })
//         reader.readAsDataURL(this.files[0])
//     })
// }




// if (contentMainBlogs) {
//     contentMainBlogs.addEventListener('click', e => {
//         e.preventDefault();
//         if (e.target.classList.value == 'btn-edit') {
//             contentAddEdit.style.display = 'flex';
//             localStorage.setItem("updateIndex", e.target.previousElementSibling.value);
//             contentAddEditTitle.innerHTML = 'Edit Blog';

//             // Prepopulating Data
//             editAddForm.lastElementChild.innerText = "Update Blog"
//             let users = JSON.parse(localStorage.getItem('users'));
//             let blogIndex = JSON.parse(localStorage.getItem('updateIndex'));
//             title.value = users[blogIndex].title;
//             photo.previousElementSibling.innerText = 'Update Photo'
//             description.value = users[blogIndex].description;
//             editAddForm.addEventListener('submit', (e) => {
//                 const newUser = { title: title.value, photo: photoDataUrl, description: description.value };
//                 if (users) {
//                     users[blogIndex] = newUser;
//                     localStorage.setItem("users", `${JSON.stringify(users)}`);
//                 }
//             })
//         }
//         if (e.target.classList.value == 'btn-delete') {
//             let blogIndex = e.target.parentElement.firstElementChild.value;
//             let users = JSON.parse(localStorage.getItem('users'));
//             if (users[blogIndex]) {
//                 users.splice(e.target.parentElement.firstChild.value, 1);
//                 localStorage.setItem("users", `${JSON.stringify(users)}`);
//             }
//         }
//     });
//     addBlogBtn.addEventListener('click', (e) => {
//         e.preventDefault();
//         contentAddEdit.style.display = 'flex';
//         contentAddEditTitle.innerHTML = 'Add new Blog';
//         editAddForm.lastElementChild.innerText = "Post Blog"
//         photo.previousElementSibling.innerText = 'Blog Photo'
//         title.value = ''
//         description.value = ''
//     });

//     editAddForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         let users = JSON.parse(localStorage.getItem('users'));
//         console.log(users);
//         const newUser = { title: title.value, photo: photoDataUrl, description: description.value };
//         if (users) {
//             users.push(newUser);
//             localStorage.setItem("users", `${JSON.stringify(users)}`);
//         }
//         else {
//             localStorage.setItem("users", `[${JSON.stringify(newUser)}]`);
//         }
//     });
// }



