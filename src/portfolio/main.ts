const headerProfile = document.querySelector(".header__profile")!;

const loginForm = document.querySelector('.login--hide-show')! as HTMLElement;

const userAction = document.querySelector('.user__action')! as HTMLElement;

const userInfo = document.querySelector('.user__info')! as HTMLElement

const screenWidth = screen.width;


const userCheck = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token) {
        try {
            const userProfileResponse = await fetch(`${apiUrl}api/auth/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (userProfileResponse.ok) {
                const userProfileData: userType = (await userProfileResponse.json()).user;

                headerProfile.innerHTML = `
                <figure class="profile__image">
                <img src="${apiUrl}${userProfileData.photo}" alt="">
                </figure>`;

                userAction.innerHTML = `
                <div class="user__action_container">
                <div class="user__action--close-btn">
				<i class="fa-solid fa-xmark"></i>
                </div>
                <div class="user__profile">
				<figure class="profile__image_open">
                <img src="${apiUrl}${userProfileData.photo}" alt="">
                </figure>
				<p>${userProfileData.name}</p>
                </div>
                <div class="user--links">
                ${userProfileData.isAdmin ? `
                <p class="user--dashboard">
                <span class="material-symbols-outlined">dashboard_customize</span>Dashboard</p>`
                        : `<p class="user--profile">
                <span class="material-symbols-outlined">person</span>Profile</p>`}

				<p class="user--logout-btn"><span class="material-symbols-outlined">power_settings_new</span>Logout</p>
                </div>
                </div>`

                const userDashboard = document.querySelector('.user--dashboard') as HTMLElement;
                const userProfile = document.querySelector('.user--profile') as HTMLElement;

                const userActionCloseBtn = document.querySelector('.user__action--close-btn')! as HTMLElement;
                
                const profileImage = document.querySelector('.profile__image')! as HTMLElement;
                const userLogoutBtn = document.querySelector('.user--logout-btn')! as HTMLElement;
                if (userDashboard) {
                    userDashboard.addEventListener('click', () => {
                        window.location.href = '/dashboard/dashboard.html'
                    })
                }

                if (userProfile) {
                    // userProfile.addEventListener('click', () => {
                    //     window.location.href = '/dashboard/dashboard.html'
                    // })
                }
                profileImage.addEventListener('click', (event) => {
                    profileImage.style.visibility = 'hidden'
                    userAction.style.display = 'block'

                    const hamburgerMenuBtn = document.querySelector(".header__menu_btn")! as HTMLElement;
                    hamburgerMenuBtn.style.display = 'none';

                    userInfo.innerHTML = `<div class="user__info_container">
                        <div class="user__info_close_btn">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <h1>User Info <i class="fa-solid fa-pen-to-square"></i></h1>
                        <form action="" class="user__info_form" method="post" enctype="multipart/form-data">
                            <label for="photo">
                                <span>Photo:</span>
                                <div class="user--photo">
                                    <input type="file" id="photo">
                                </div>
                            </label>
                            <label for="name">
                                <span>Name:</span>
                                <input type="text" id="name" readonly>
                            </label>
                            <label for="dob">
                                <span>Dob:</span>
                                <input type="text" id="dob" readonly>
                            </label>
                            <label for="email">
                                <span>Email:</span>
                                <input type="text" id="email" readonly>
                            </label>
                            <button type="submit" class="update-btn">Update User</button>
                        </form>
                    </div>`

                    const userId = localStorage.getItem('userId')
                    const token = localStorage.getItem('token')

                    const userProfile = document.querySelector('.user--profile');

                    const userInfoForm = document.querySelector('.user__info_form') as HTMLFormElement;

                    const photo = document.querySelector('.user__info_form #photo') as HTMLInputElement;
                    const name = document.querySelector('.user__info_form #name') as HTMLInputElement;
                    const dob = document.querySelector('.user__info_form #dob') as HTMLInputElement;
                    const email = document.querySelector('.user__info_form #email') as HTMLInputElement;
                    const updateBtn = document.querySelector('.user__info_form .update-btn') as HTMLButtonElement;
                    const editIcon = document.querySelector('.fa-pen-to-square') as HTMLButtonElement;

                    const userPhoto = document.querySelector('.user__info_form .user--photo');
                    const userInfoCloseBtn = document.querySelector('.user__info_close_btn .fa-xmark');

                    let editUserImageUrl: string;
                    userProfile?.addEventListener('click', async () => {
                        try {
                            const userDataResponse = await fetch(`${apiUrl}api/auth/user/${userId}`,
                                {
                                    headers: {
                                        "Authorization": `Bearer ${token}`
                                    }
                                })

                            if (userDataResponse.ok) {
                                const userData = await userDataResponse.json();
                                const newElement = document.createElement("img");
                                newElement.setAttribute('src', `${apiUrl}${userData.user.photo}`)
                                newElement.setAttribute('src', `${apiUrl}${userData.user.photo}`)
                                newElement.classList.add('user--profile-image')

                                userPhoto?.prepend(newElement);

                                editUserImageUrl = userData.user.photo

                                photo.style.display = 'none'
                                name.value = userData.user.name
                                email.value = userData.user.email
                                dob.value = userData.user.dob
                                updateBtn.style.display = 'none'

                                if (screenWidth < 768) {
                                    const hamburgerMenuBtn = document.querySelector(".header__menu_btn")! as HTMLElement;
                                    hamburgerMenuBtn.style.display = 'block';
                                }
                            } else {

                            }
                        } catch (error) {

                        }
                        userAction.style.display = 'none'
                        profileImage.style.visibility = 'visible'
                        userInfo.style.display = 'flex'
                    });

                    editIcon.addEventListener('click', () => {
                        const userPhoto = document.querySelector('.user--photo')

                        photo.style.display = 'block'
                        name.removeAttribute('readonly');
                        name.style.borderBottom = '1px solid'
                        dob.removeAttribute('readonly');
                        dob.style.borderBottom = '1px solid'

                        const newElement = document.createElement("input");

                        updateBtn.style.display = 'block'

                    });

                    userInfoForm?.addEventListener('submit', async (e) => {
                        e.preventDefault()

                        const formData = new FormData();
                        formData.append('name', name.value);
                        formData.append('dob', dob.value);
                        formData.append('email', email.value);
                        if (photo.files![0]) {
                            formData.append('photo', photo.files![0]);
                        } else {
                            formData.append('photoUrl', editUserImageUrl);
                        }


                        try {
                            const updateDataResponse = await fetch(`${apiUrl}api/auth/user/${userId}`,
                                {
                                    method: 'PUT',
                                    headers: {
                                        "Authorization": `Bearer ${token}`
                                    },
                                    body: formData
                                })
                            if (updateDataResponse.ok) {
                                messageConfirmation.firstElementChild!.innerHTML = `
                                    <i class="fa-solid fa-check"></i>
                                    <span>User Data Updated!</span>`;
                                messageConfirmation.style.display = "block";

                                setTimeout(() => {
                                    messageConfirmation.style.display = "none";
                                }, 2000);
                            } else if (updateDataResponse.status == 415) {
                                messageConfirmation.firstElementChild!.innerHTML = `
                                    <i class="fa-solid fa-xmark"></i>
                                    <span>Unsupported image type, Try again!</span>`;
                                messageConfirmation.style.display = "block";

                                setTimeout(() => {
                                    messageConfirmation.style.display = "none";
                                }, 2000);
                            }
                            else {
                                messageConfirmation.firstElementChild!.innerHTML = `
                                    <i class="fa-solid fa-xmark"></i>
                                    <span>Something went wrong, Try again!</span>`;
                                messageConfirmation.style.display = "block";

                                setTimeout(() => {
                                    messageConfirmation.style.display = "none";
                                }, 2000);
                            }
                        } catch (error) {
                            messageConfirmation.firstElementChild!.innerHTML = `
                                    <i class="fa-solid fa-xmark"></i>
                                    <span>Something went wrong, Try again!</span>`;
                            messageConfirmation.style.display = "block";

                            setTimeout(() => {
                                messageConfirmation.style.display = "none";
                            }, 2000);
                        }
                    })

                    userInfoCloseBtn?.addEventListener('click', () => {
                        userInfo.style.display = 'none'
                    })
                });

                userActionCloseBtn.addEventListener('click', () => {
                    profileImage.style.visibility = 'visible'
                    userAction.style.display = 'none'

                    if (screenWidth < 768) {
                        const hamburgerMenuBtn = document.querySelector(".header__menu_btn")! as HTMLElement;
                        hamburgerMenuBtn.style.display = 'block';
                    }
                });

                userLogoutBtn.addEventListener('click', () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('expirationTime');

                    messageConfirmation.firstElementChild!.innerHTML = `
                        <i class="fa-solid fa-check"></i>
                        <span>You have been successfully logged out.</span>`;

                    userAction.innerHTML = '';
                    userAction.style.display = 'none';
                    messageConfirmation.style.display = "block";

                    if (screenWidth < 768) {
                        const hamburgerMenuBtn = document.querySelector(".header__menu_btn")! as HTMLElement;
                        hamburgerMenuBtn.style.display = 'block';
                    }
                    setTimeout(() => {
                        messageConfirmation.style.display = "none";
                    }, 3000);

                    userCheck();
                });
            }
            else {
                throw new Error('Something went wrongq');
            }
        } catch (error) {
            console.log(error);
            
            messageConfirmation.firstElementChild!.innerHTML = `
                <i class="fa-solid fa-xmark"></i>
                <span>Something went wrongk!</span>`;
            messageConfirmation.style.display = "block";

            setTimeout(() => {
                messageConfirmation.style.display = "none";
            }, 3000);
        }
    }
    else {
        headerProfile.innerHTML = `
        <p class = "header__profile_btn">
        <a href="">
					Login
					<img src="assets/icons/🦆 icon _account login_.svg" alt="">
				</a>
                </p>`
        const headerProfileBtn = document.querySelector(".header__profile_btn")!;

        headerProfileBtn.addEventListener('click', e => {
            e.preventDefault();
            loginForm.style.display = 'block';
            document.querySelector("body")!.style.overflowY = 'hidden';
        })
    }
}

window.addEventListener('load', async () => {
    userCheck();
})

