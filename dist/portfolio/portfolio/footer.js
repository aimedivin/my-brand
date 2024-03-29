"use strict";
// ---------------- Form Validation --------------
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const circleCheck = '<i class="fa-solid fa-circle-check"></i>';
const circleXmark = '<i class="fa-solid fa-circle-xmark"></i>';
const footerForm = document.querySelector('.footer__form');
const email = document.getElementById('footer-email');
const message = document.getElementById('message');
const subject = document.getElementById('subject');
const messageConfirmation = document.querySelector('.message--confirmation');
let footerFormError = false;
let errorField = [];
let footerCount = 0;
footerForm.addEventListener('input', (e) => {
    let target = e.target;
    let targetNextSibling = target.nextElementSibling;
    footerCount++;
    footerForm.firstElementChild.innerHTML = '';
    errorField.forEach(el => {
        el.style.borderColor = 'black';
    });
    if (!(target).value.length) {
        targetNextSibling.style.display = 'none';
        footerFormError = true;
        footerCount = 0;
    }
    else {
        targetNextSibling.style.display = 'block';
        if (target.id == 'footer-email') {
            if ((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value)) {
                targetNextSibling.innerHTML = circleCheck;
                footerFormError = false;
            }
            else {
                targetNextSibling.innerHTML = circleXmark;
                footerFormError = true;
            }
        }
        else {
            if (target.value.split(" ").join("").length < 5) {
                targetNextSibling.innerHTML = circleXmark;
                footerFormError = true;
            }
            else {
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
footerForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    let formFirstChild = footerForm.firstElementChild;
    if (errorField.length > 0) {
        errorField.forEach(el => {
            console.log(el);
            el.style.borderColor = '#bb0000';
        });
        if (errorField.length > 1) {
            formFirstChild.innerText = 'Enter Valid Email | Enter more than 5 characters';
        }
        else {
            if (errorField.indexOf(email) != -1) {
                formFirstChild.innerText = 'Enter Valid Email';
            }
            else {
                formFirstChild.innerText = 'Enter more than 5 characters';
            }
        }
    }
    else if ((footerCount == 0) || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value) || (message.value.split(" ").join("").length < 5) || subject.value.split(" ").join("").length < 5) {
        formFirstChild.innerText = 'Fill in all Field';
        console.log(Array.from(footerForm.children));
    }
    else {
        try {
            const response = yield fetch(`${apiUrl}api/portfolio/message`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    subject: subject.value,
                    description: message.value
                })
            });
            if (response.ok) {
                email.value = '';
                email.nextElementSibling.style.display = 'none';
                subject.value = '';
                subject.nextElementSibling.style.display = 'none';
                message.value = '';
                message.nextElementSibling.style.display = 'none';
                messageConfirmation.style.display = "flex";
            }
            else {
                messageConfirmation.firstElementChild.innerHTML = `<h1>Updates</h1>
                <i class="fa-solid fa-xmark"></i>
                <span>Your message was not sent, Try again!</span>`;
                messageConfirmation.style.display = "flex";
            }
            setTimeout(() => {
                messageConfirmation.style.display = "none";
            }, 5500);
        }
        catch (error) {
            console.log(error);
        }
    }
}));
