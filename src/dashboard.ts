// Getting Page Title
const title = document.querySelector('title') as HTMLTitleElement;


// Blog Status update

const statusBlogValue = document.querySelector('.content__status_blog_value') as HTMLParagraphElement;

const blogNumber = JSON.parse(window.localStorage.getItem('blogs')!);
if (statusBlogValue) statusBlogValue.innerText = blogNumber.length;

// Displaying Messages

function displayMessage(): void {
    const contentDataTable = document.querySelector('.content__data_table') as HTMLTableElement;

    const dashMessage = JSON.parse(localStorage.getItem('messages')!)

    const fragment = document.createDocumentFragment();


    for (let i = 0; i < dashMessage.length; i++) {

        if (i == 5 && (title.innerText.toLowerCase() == 'dashboard') ) break;

        const tableRow = document.createElement('tr')

        const col1 = document.createElement('td')
        col1.textContent = dashMessage[i].email;

        const col2 = document.createElement('td')
        col2.textContent = dashMessage[i].subject;

        const col3 = document.createElement('td')
        const colForm = document.createElement('form')
        const colFormBtn = document.createElement('button');

        colFormBtn.classList.add('content__data_btn');
        colFormBtn.textContent = 'Reply';

        colForm.appendChild(colFormBtn)
        col3.appendChild(colForm);

        tableRow.appendChild(col1);
        tableRow.appendChild(col2);
        tableRow.appendChild(col3);
        fragment.appendChild(tableRow);
    }

    contentDataTable.appendChild(fragment);
}

displayMessage();
