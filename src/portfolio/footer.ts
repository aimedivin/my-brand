// ---------------- Form Validation --------------

const circleCheck: string = '<i class="fa-solid fa-circle-check"></i>';
const circleXmark: string = '<i class="fa-solid fa-circle-xmark"></i>';
const footerForm = document.querySelector('.footer__form') as HTMLFormElement;
const email = document.getElementById('footer-email') as HTMLInputElement;
const message = document.getElementById('message') as HTMLTextAreaElement;
const subject = document.getElementById('subject') as HTMLInputElement;

const messageConfirmation = document.querySelector('.message--confirmation') as HTMLElement;

let footerFormError = false;
let errorField: (HTMLInputElement | HTMLTextAreaElement)[] = [];
let footerCount = 0;

footerForm.addEventListener('input', (e) => {
    let target = e.target! as HTMLInputElement | HTMLTextAreaElement;
    let targetNextSibling = target.nextElementSibling as HTMLElement;

    footerCount++;

    footerForm.firstElementChild!.innerHTML = '';

    errorField.forEach(el => {
        el.style.borderColor = 'black'
    });
    if (!(target).value.length) {
        targetNextSibling.style.display = 'none';
        footerFormError = true;
        footerCount = 0;
    } else {
        targetNextSibling!.style.display = 'block';
        if (target.id == 'footer-email') {
            if ((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value)) {
                targetNextSibling.innerHTML = circleCheck;
                footerFormError = false;
            } else {
                targetNextSibling.innerHTML = circleXmark;
                footerFormError = true;
            }
        } else {
            if (target.value.split(" ").join("").length < 5) {
                targetNextSibling.innerHTML = circleXmark;
                footerFormError = true;
            } else {
                targetNextSibling.innerHTML = circleCheck;
                footerFormError = false;
            }
        }
    }

    if (footerFormError && !errorField.includes(target)) {
        errorField.push(target);
    }

    if (!footerFormError && errorField.includes(target)) {
        errorField.splice(errorField.indexOf(target), 1);
    }
    // console.log(errorField);
});


footerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let formFirstChild = footerForm.firstElementChild as HTMLParagraphElement;

    if (errorField.length > 0) {
        errorField.forEach(el => {
            console.log(el);
            el.style.borderColor = '#bb0000';
        });

        if (errorField.length > 1) {
            formFirstChild.innerText = 'Enter Valid Email | Enter more than 5 characters';
        } else {
            if (errorField.indexOf(email) != -1) {
                formFirstChild.innerText = 'Enter Valid Email';
            } else {
                formFirstChild.innerText = 'Enter more than 5 characters';
            }
        }
    }

    else if ((footerCount == 0) || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value) || (message.value.split(" ").join("").length < 5) || subject.value.split(" ").join("").length < 5) {
        formFirstChild.innerText = 'Fill in all Field';
        console.log(Array.from(footerForm.children))
    }

    else {

        try {
            const response = await fetch(`${apiUrl}api/portfolio/message`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            email: email.value,
                            subject: subject.value,
                            description: message.value
                        }
                    )
                })
                
            if (response.ok) {
                email.value = '';
                (email.nextElementSibling as HTMLSpanElement).style.display = 'none';

                subject.value = '';
                (subject.nextElementSibling as HTMLSpanElement).style.display = 'none';

                message.value = '';
                (message.nextElementSibling as HTMLSpanElement).style.display = 'none';
                messageConfirmation.style.display = "flex";
            } else {
                messageConfirmation.firstElementChild!.innerHTML = `<h1>Updates</h1>
                <i class="fa-solid fa-xmark"></i>
                <span>Your message was not sent, Try again!</span>`;
                messageConfirmation.style.display = "flex";
            }

            setTimeout(() => {
                messageConfirmation.style.display = "none";
            }, 5500);

        } catch (error) {
            console.log(error);
        }        
    }
});