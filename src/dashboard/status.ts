// const apiUrl_D = "http://localhost:3000/";

// const token = localStorage.getItem('token');
// const userId = localStorage.getItem('userId');

window.addEventListener('load', async () => {
    const headerProfile = document.querySelector('.header__profile') as HTMLElement;

    try {
        const userInfoResponse = await fetch(`${apiUrl_D}api/auth/user/${userId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

        if (userInfoResponse.ok) {
            const userInfo = await userInfoResponse.json();
            if (userInfo.user.isAdmin) {
                headerProfile!.innerHTML = `
                    <figure class="profile__image">
                    <img src = "${apiUrl_D}${userInfo.user.photo}" alt = "${userInfo.user.name}" >
                    </figure>`

                headerProfile.addEventListener('click', () => {
                    const adminId: string = localStorage.getItem('userId')!;

                    getProfileData(adminId)
                })
            } else {
                window.location.href = '/';
            }
        } else {
            window.location.href = '/';
        }
    } catch (error) {

    }
})