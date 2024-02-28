const contentMain = document.querySelector(".content__main");


window.addEventListener('load', ()=> {
    const users = JSON.parse(window.localStorage.getItem('users'));
    let container = [];
    if (users) {
        users.forEach((element, index) => {
            container += `<div class="content__blog">
                    <div class="content__blog_thumbnail">
                        <img src="${element.photo}" alt="">
                    </div>
                    <div class="content__blog_info">
                        <h1>${element.title}</h1>
                        <h2>${element.description}</h2>
                        <p></p>
                        <form action="" class="content__blog_cta_btn">
                            <input type="hidden" name="" value="${index}">
                            <a href="/dashboard/add-edit-blog.html" class="btn-edit">Edit</a>
                            <a href="/dashboard/add-edit-blog.html" class="btn-delete">Delete</a>
                        </form>
                    </div>
                </div>
                <hr>`
        });
    }
    if (container) {
        contentMain.innerHTML = container;
    }

})