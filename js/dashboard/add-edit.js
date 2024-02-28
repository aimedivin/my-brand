const editBtn = document.getElementsByClassName('btn-edit');
const deleteBtn = document.querySelector('.btn-delete');
const addBlogBtn = document.querySelector('.btn-new-blog');
const editAddForm = document.querySelector('.content__add_edit_form')
const mode = localStorage.getItem('mode');
const contentMainBlogs = document.querySelector('.content__main')
    ;
const title = document.getElementById('title');
const photo = document.getElementById('photo');
const description = document.getElementById('description');
let photoDataUrl = '';

if (photo) {
    photo.addEventListener('change', function () {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            photoDataUrl = reader.result
        })
        reader.readAsDataURL(this.files[0])
    })
}


if (contentMainBlogs) {
    contentMainBlogs.addEventListener('click', e => {
        if (e.target.classList.value == 'btn-edit') {
            window.localStorage.setItem("mode", "edit");
            window.localStorage.setItem("updateIndex", e.target.previousElementSibling.value);
            console.log(blogIndex);
        }
        if (e.target.classList.value == 'btn-delete') { }
    });
    addBlogBtn.addEventListener('click', (e) => {
        window.localStorage.setItem("mode", "addnew");
    });
}


console.log(mode);

if (mode == "addnew" && editAddForm) {
    editAddForm.lastElementChild.innerHTML = "Post Blog"
    editAddForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let users = JSON.parse(localStorage.getItem('users'));
        console.log(users);
        const newUser = { title: title.value, photo: photoDataUrl, description: description.value };
        if (users) {
            users.push(newUser);
            localStorage.setItem("users", `${JSON.stringify(users)}`);
        }
        else {
            localStorage.setItem("users", `[${JSON.stringify(newUser)}]`);
        }

    })


}
if (mode == "edit" && editAddForm) {
    editAddForm.lastElementChild.innerHTML = "Update Blog"
    let users = JSON.parse(localStorage.getItem('users'));
    let blogIndex = JSON.parse(localStorage.getItem('updateIndex'));
    title.value = users[blogIndex].title;
    photo.previousElementSibling.innerHTML = 'Update Photo'
    description.value = users[blogIndex].description;
    editAddForm.addEventListener('submit', (e) => {
        const newUser = { title: title.value, photo: photoDataUrl, description: description.value };
        if (users) {
            users[blogIndex] = newUser;
            localStorage.setItem("users", `${JSON.stringify(users)}`);
        }
    })
}