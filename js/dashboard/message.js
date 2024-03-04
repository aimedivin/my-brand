const contentDataTable = document.querySelector('.content__data_table');

const dashMessage = JSON.parse(localStorage.getItem('messages'))

const fargment = document.createDocumentFragment();


for (let i = 0; i < dashMessage.length; i++) {
    if (i == 6) break;

    const tableRow = document.createElement('tr')

    const col1 = document.createElement('td')
    col1.textContent = dashMessage[i].email;

    const col2 = document.createElement('td')
    col2.textContent = dashMessage[i].subject;

    const col3 = document.createElement('td')
    const colForm = document.createElement('form')
    const colFormBtn = document.createElement('button');
    const colFormDelBtn = document.createElement('button');

    colForm.classList.add('content__data_form');

    colFormBtn.classList.add('content__data_btn');
    colFormBtn.textContent = 'Reply';

    colFormDelBtn.classList.add('content__data_dbtn');
    colFormDelBtn.innerHTML = `<svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M5.86491 33.6667C4.90657 33.6667 4.10658 33.3458 3.46491 32.7042C2.82185 32.0611 2.50033 31.2604 2.50033 30.3021V4.5H0.416992V2.41667H8.75033V0.8125H21.2503V2.41667H29.5837V4.5H27.5003V30.3021C27.5003 31.2604 27.1795 32.0604 26.5378 32.7021C25.8948 33.3451 25.0941 33.6667 24.1357 33.6667H5.86491ZM10.4337 27.4167H12.517V8.66667H10.4337V27.4167ZM17.4837 27.4167H19.567V8.66667H17.4837V27.4167Z"
                                                    fill="#800202" fill-opacity="0.86" />
                                            </svg>`;

    colForm.appendChild(colFormBtn)
    colForm.appendChild(colFormDelBtn)
    col3.appendChild(colForm);

    console.log('in');

    tableRow.appendChild(col1);
    tableRow.appendChild(col2);
    tableRow.appendChild(col3);
    fargment.appendChild(tableRow);
}

contentDataTable.appendChild(fargment);