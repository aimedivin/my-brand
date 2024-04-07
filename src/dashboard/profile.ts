const profileLink = document.querySelector('.profile--link')! as HTMLElement;
const dashboardUserInfo = document.querySelector('.user__info')! as HTMLElement

const getProfileData = async (id: string) => {
    dashboardUserInfo.innerHTML = `<div class="user__info_container">
			<div class="user__info_close_btn">
				<i class="fa-solid fa-xmark"></i>
			</div>
			<h1>User Info </h1>
			<form action="" class="user__info_form" method="post" enctype="multipart/form-data">
				<label for="photo">
					<span>Photo:</span>
					<figure class="user--photo">
					</figure>
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
				<label for="email">
					<span>Admin:</span>
					<input type="text" id="admin" readonly>
				</label>
			</form>
		</div>`

    const token = localStorage.getItem('token')

    const userProfile = document.querySelector('.user--profile');

    const userInfoForm = document.querySelector('.user__info_form') as HTMLFormElement;

    const name = document.querySelector('.user__info_form #name') as HTMLInputElement;
    const dob = document.querySelector('.user__info_form #dob') as HTMLInputElement;
    const email = document.querySelector('.user__info_form #email') as HTMLInputElement;
    const admin = document.querySelector('.user__info_form #admin') as HTMLInputElement;

    const userPhoto = document.querySelector('.user__info_form .user--photo');
    const userInfoCloseBtn = document.querySelector('.user__info_close_btn .fa-xmark');

    try {

        const userDataResponse = await fetch(`${apiUrl_D}api/auth/user/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

        if (!userDataResponse.ok) {
            // throw new Error('')
        }
        const userData = await userDataResponse.json();
        const newElement = document.createElement("img");
        newElement.setAttribute('src', `${apiUrl_D}${userData.user.photo}`)
        newElement.classList.add('user--profile-image')

        userPhoto?.prepend(newElement);

        name.value = userData.user.name
        email.value = userData.user.email
        dob.value = userData.user.dob;
        admin.value = userData.user.isAdmin;

        dashboardUserInfo.style.display = 'flex'
        document.body.style.overflow = 'hidden'
        userInfoCloseBtn?.addEventListener('click', () => {
            dashboardUserInfo.style.display = 'none'
            document.body.style.overflow = 'auto'
        })

    } catch (error) {

        dashMessageConfirmation.firstElementChild!.innerHTML = `
                        <i class="fa-solid fa-xmark"></i>
                        <span>Something went wrong, Try again!</span>`;
        dashMessageConfirmation.style.display = "block";
        setTimeout(() => {
            dashMessageConfirmation.style.display = "none";
        }, 3000);
    }
}

profileLink.addEventListener('click', async (event) => {
    event.preventDefault()

    const adminId: string = localStorage.getItem('userId')!;
    
    getProfileData(adminId)
});
