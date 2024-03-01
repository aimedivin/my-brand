const statusBlogValue = document.querySelector('.content__status_blog_value');
console.log(statusBlogValue);
const blogNumber = JSON.parse(window.localStorage.getItem('blogs'));
statusBlogValue.innerText = blogNumber.length;