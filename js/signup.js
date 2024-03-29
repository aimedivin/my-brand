// ---------------- Form Validation --------------

const signupCircleCheck = '<i class="fa-solid fa-circle-check"></i>';
const signupCircleXmark = '<i class="fa-solid fa-circle-xmark"></i>';

//
// const validate = (e, ) => {

// }

// signup form validation
const signupForm = document.querySelector('.signup__form_fields');

const signupFullName = document.getElementById('signup-fullname');

const signupPhoto = document.getElementById('signup-picture');
const signupDate = document.getElementById('signup-date');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
let signupFormError = false;
let signupBoxError = false;
let signupErrorField = []
let signupErrorCount = 0;

signupFullName.addEventListener('input', () => {
    signupFormError = signupFullName.value.split(" ").join("").length < 5 ? true : false;
});

signupPhoto.addEventListener('input', () => {
    signupBoxError = signupPhoto.files[0].type.slice(0, 5) != 'image' ? true : false;
});
signupPhoto.addEventListener('change', () => {
    signupBoxError = signupPhoto.files[0].type.slice(0, 5) != 'image' ? true : false;
});


signupDate.addEventListener('input', () => {
    signupBoxError = false;
});
signupFullName.addEventListener('input', () => {
})
signupEmail.addEventListener('input', () => {
    signupFormError = ((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(signupEmail.value)? false: true);
});
signupPassword.addEventListener('input', () => {
    signupFormError = signupPassword.value.split(" ").join("").length < 8 ? true : false;
});


signupForm.addEventListener('input', (e) => {
    let target = e.target;
    signupErrorCount++;
    signupErrorField = [...new Set(signupErrorField)];

    if (target.id == 'signup-fullname' || target.id == 'signup-email' || target.id == 'signup-password') {
        if (signupFormError) {
            target.nextElementSibling.style.display = "block"
            target.nextElementSibling.innerHTML = signupCircleXmark;
            target.parentElement.style.borderColor = 'red';
            // console.log(target.parentElement);
            signupErrorField.push(target);
        } else {
            // console.log("in");
            target.nextElementSibling.innerHTML = signupCircleCheck;
            target.parentElement.style.borderColor = '#7b7b7b';
            if (signupErrorField.includes(target)) {
                signupErrorField.splice(signupErrorField.indexOf(target), 1);
            }
        }
        if (target.value.split(" ").join("").length == 0) {
            target.nextElementSibling.style.display = "none"
            target.parentElement.style.borderColor = '#7b7b7b';
            signupErrorField.push(target);
        }
    } else {
        target.parentElement.style.borderColor = signupBoxError ? 'red': '#7b7b7b';
        if (signupErrorField.includes(target)) {
            signupErrorField.splice(signupErrorField.indexOf(target), 1);
        }
    }
    
});

signupForm.addEventListener('submit', e => {
    e.preventDefault();
    if (signupErrorField.length) {
        signupForm.previousElementSibling.innerHTML = 'Please enter valid inputs';
        signupErrorField.forEach(el => {
            el.style.border = 'red';
        })
        console.log(signupErrorField);
    } else {
        if ((signupPassword.value.split(" ").join("").length < 8) || !((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(signupEmail.value)) || (signupFullName.value.split(" ").join("").length < 5)) {
            signupForm.previousElementSibling.innerHTML = 'Fill in all fields';
        } else {
            //signupForm.previousElementSibling.innerHTML = 'Registration was successful';
        }
    }
});