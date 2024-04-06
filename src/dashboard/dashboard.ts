const statusUserValue = document.querySelector('.content__status_user_value') as HTMLParagraphElement;
const statusBlogValue = document.querySelector('.content__status_blog_value') as HTMLParagraphElement;
const statusMessageValue = document.querySelector('.content__status_message_value') as HTMLParagraphElement;


const contentComment = document.querySelector('.content__comment') as HTMLElement;


// Page Title
const pageTitle = document.querySelector('title') as HTMLTitleElement;

// User Status update
async function userCount() {
    const usersCountResponse = await fetch(`${apiUrl_D}api/dashboard/users`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

    if (!usersCountResponse.ok) {
        return;
    }

    const users = (await usersCountResponse.json()).users;

    if (statusBlogValue && users.length) statusUserValue.innerText = users.length;
}

// Blog Status update
async function blogCount() {
    const blogsCountResponse = await fetch(`${apiUrl_D}api/dashboard/blogs`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

    if (!blogsCountResponse.ok) {
        return;
    }

    const blogs = (await blogsCountResponse.json()).blogs;

    if (statusBlogValue && blogs.length) {
        statusBlogValue.innerText = blogs.length;
    } else {
        statusBlogValue.innerText = '0';
    };
}


// Displaying Messages

async function displayMessage() {
    const contentDataTable = document.querySelector('.content__data_table') as HTMLTableElement;

    const dashMessageResponse = await fetch(`${apiUrl_D}api/dashboard/messages`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    console.log('in');
    if (!dashMessageResponse.ok) {
        console.log('in');

        return;
    }

    const dashMessage = (await dashMessageResponse.json()).msg;

    dashMessage.reverse();

    if (statusMessageValue) {
        statusMessageValue.innerHTML = dashMessage.length
    }

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < dashMessage.length; i++) {

        if (i == 5 && (pageTitle.innerText.toLowerCase() == 'dashboard')) break;

        const tableRow = document.createElement('tr')

        const col0 = document.createElement('td')
        const date = new Date(dashMessage[i].createdAt)
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        col0.innerHTML = `<span class="calendar--icon material-symbols-outlined">calendar_month</span> ${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}<br> ${date.getHours()}h:${date.getMinutes()}`;
        col0.classList.add('content__data_date');

        const col1 = document.createElement('td')
        col1.textContent = dashMessage[i].email;

        const col2 = document.createElement('td')
        col2.textContent = dashMessage[i].subject.length > 15 ? ((dashMessage[i].subject as string).split('').slice(0, 15).join('') + '...') : dashMessage[i].subject;

        const col3 = document.createElement('td')
        const colForm = document.createElement('form')
        const colFormBtn = document.createElement('button');

        // colFormBtn.addEventListener('click', () => {
        //     window.location.href = ``
        // })

        colForm.classList.add('content__data_form')
        colFormBtn.classList.add('content__data_btn');
        colFormBtn.textContent = 'Reply';

        colForm.appendChild(colFormBtn)
        if (pageTitle.innerText.toLowerCase() == 'message') {
            tableRow.appendChild(col0);
            //colForm.appendChild(colFormDelBtn);
        }
        col3.appendChild(colForm);

        tableRow.appendChild(col1);
        tableRow.appendChild(col2);
        tableRow.appendChild(col3);
        fragment.appendChild(tableRow);
    }

    contentDataTable.appendChild(fragment);
}

const displayComments = async () => {
    let comments = ''
    try {
        const commentsResponse = await fetch(`${apiUrl_D}api/dashboard/comments`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (commentsResponse.ok) {
            const commentsData = (await commentsResponse.json()).comments
            console.log(commentsData);

            for (let i = 0; i < commentsData.length && i < 4; i++) {
                comments += `<div class="content__comment_profile">
                                <figure>
                                    <img src="${apiUrl_D}${commentsData[i].photo}" alt="">
                                </figure>
                                <div>
                                    <h3>${commentsData[i].username}</h3>
                                    <p>${commentsData[i].description}</p>
                                </div>
                            </div>`
            }

            if (comments.length) {

                contentComment.innerHTML = comments
            } else {
                contentComment.innerHTML = 'No recent comments'
            }
        }
    } catch (error) {

    }
}

userCount()
blogCount();
displayMessage();
displayComments();


// LOGOUT AND REDIRECTING
const logoutLink = document.querySelector('.logout--link')! as HTMLElement

logoutLink.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    console.log(dashMessageConfirmation);

    dashMessageConfirmation.firstElementChild!.innerHTML = `
                        <i class="fa-solid fa-check"></i>
                        <span>You have been successfully logged out.</span>`;

    dashMessageConfirmation.style.display = 'block'
    setTimeout(() => {
        window.location.href = '/'
    }, 3000);


});
