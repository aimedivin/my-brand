// ---------------- Form Validation --------------

const circleCheck = '<i class="fa-solid fa-circle-check"></i>';
const circleXmark = '<i class="fa-solid fa-circle-xmark"></i>';



// Login form validation
// const loginForm = document.querySelector('.login__form_fields');
// console.log(loginForm);
// const loginEmail = document.getElementById('email');
// let loginFormError = false;
// let loginErrorField = []
// let loginCount = 0;

// if (loginForm){
//     loginForm.addEventListener('input', (e) => {
//         let target = e.target;
//         loginCount++;
        
//         loginForm.firstElementChild.innerText = '';
        
//         loginErrorField.forEach(el => {
//             el.style.borderColor = 'black'
//         });
//         if (!target.value.length) {
//             target.nextElementSibling.style.display = 'none';
//             loginFormError = true;
//             footerCount = 0;
//         } else {
//             target.nextElementSibling.style.display = 'block';
//             loginFormError = target.id == 'email' ? ((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(target.value) ? false : true) : (target.value.split(" ").join("").length < 8 ? true : false);
//         }



//         if (loginFormError && !loginErrorField.includes(target)) {
//             console.log("dsfd");
//             loginErrorField.push(target);
//             target.nextElementSibling.innerHTML = circleXmark;
//         }
//         if (!loginFormError) {
//             if (loginErrorField.indexOf(target) != -1) {
//                 loginErrorField.splice(loginErrorField.indexOf(target), 1);
//             }
            
//             target.nextElementSibling.innerHTML = circleCheck;
//         }
//         // console.log(errorField);
//     });


//     loginForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         console.log(loginErrorField.length);
//         if (loginErrorField.length > 0) {
//             loginErrorField.forEach(el => {
//                 el.style.borderColor = '#bb0000';
//             });
//             if (loginErrorField.length > 1) {
//                 loginForm.firstElementChild.innerText = 'Enter Valid Email | Password (length > 8)';
//             } else {
//                 if (loginErrorField.includes(loginEmail)) {
//                     loginForm.firstElementChild.innerText = 'Enter Valid Email';
//                 } else {
//                     loginForm.firstElementChild.innerText = 'Enter more than 5 characters';
//                 }
//             }
//         }
//         if (loginCount == 0) {
//             loginForm.firstElementChild.innerText = 'Fill in all Field';
//         } 
//     }
//     );
// }

// ----Send us message form
const footerForm = document.querySelector('.footer__form');
const email = document.getElementById('footer-email');
let footerFormError = false;
let errorField = []
let footerCount = 0;


footerForm.addEventListener('input', (e) => {
    let target = e.target;
    footerCount++;
    footerForm.firstElementChild.innerText = '';
    errorField.forEach(el => {
        el.style.borderColor = 'black'
    });
    if (!target.value.length) {
        target.nextElementSibling.style.display = 'none';
        footerFormError = true;
        footerCount = 0;
    } else {
        target.nextElementSibling.style.display = 'block';
        if (target.id == 'footer-email') {
            if ((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value)) {
                email.nextElementSibling.innerHTML = circleCheck;
                footerFormError = false;
            } else {
                email.nextElementSibling.innerHTML = circleXmark;
                footerFormError = true;
            }
        } else {
            if (target.value.split(" ").join("").length < 5) {
                target.nextElementSibling.innerHTML = circleXmark;
                footerFormError = true;
            } else {
                target.nextElementSibling.innerHTML = circleCheck;
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
    console.log(errorField);
});


footerForm.addEventListener('submit', (e) => {
    if (errorField.length > 0) {
        errorField.forEach(el => {
            console.log(el);
            el.style.borderColor = '#bb0000';
        });
        if (errorField.length > 1) {
            footerForm.firstElementChild.innerText = 'Enter Valid Email | Enter more than 5 characters';
        } else {
            if (errorField.indexOf(email) != -1) {
                footerForm.firstElementChild.innerText = 'Enter Valid Email';
            } else {
                footerForm.firstElementChild.innerText = 'Enter more than 5 characters';
            }
        }
    }
    if (footerCount == 0) {
        footerForm.firstElementChild.innerText = 'Fill in all Field';
        console.log(Array.from(footerForm.children))
    }
    console.log(errorField.length);


    e.preventDefault();
}
);
