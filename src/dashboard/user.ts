
const contentDataTable = document.querySelector('.content__data_table') as HTMLTableElement;

let content: string = `<tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Birthdate</th>
                        </tr>`;

type userType = {
    _id: string;
    name: string;
    photo: string;
    dob: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
};

const getUsers = async () => {
    try {
        const usersResponse = await fetch(`${apiUrl_D}api/dashboard/users`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

        if (usersResponse.ok) {
            const usersResponseData: userType[] = (await usersResponse.json()).users;
            if (usersResponseData.length) {

                usersResponseData.forEach(user => {
                    content += `<tr>
                                <td>${user.name}</td>
                                <td>${user.email}</td>
                                <td class="user-photo"><img src="${apiUrl_D}${user.photo}" alt=""></td>
                                <td>${user.dob}</td>
                            </tr>`
                })
            } else {
                content += 'Currently, there are no registered users.'
            }
        }

    }
    catch (error) {
        console.log(error);

        dashMessageConfirmation.firstElementChild!.innerHTML = `<i class="fa-solid fa-xmark"></i>
                <span>Something went wrong, Try again!</span>`;
        dashMessageConfirmation.style.display = "block";

        setTimeout(() => {
            dashMessageConfirmation.style.display = "none";
        }, 3000);
    }
}

window.addEventListener('load', async () => {
    await getUsers();

    contentDataTable.innerHTML = content;
})