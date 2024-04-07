"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const contentDataTable = document.querySelector('.content__data_table');
let content = `<tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Birthdate</th>
                        </tr>`;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersResponse = yield fetch(`${apiUrl_D}api/dashboard/users`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (usersResponse.ok) {
            const usersResponseData = (yield usersResponse.json()).users;
            if (usersResponseData.length) {
                usersResponseData.forEach(user => {
                    content += `<tr>
                                <td>${user.name}</td>
                                <td>${user.email}</td>
                                <td class="user-photo"><img src="${apiUrl_D}${user.photo}" alt=""></td>
                                <td>${user.dob}</td>
                            </tr>`;
                });
            }
            else {
                content += 'Currently, there are no registered users.';
            }
        }
    }
    catch (error) {
        console.log(error);
        dashMessageConfirmation.firstElementChild.innerHTML = `<i class="fa-solid fa-xmark"></i>
                <span>Something went wrong, Try again!</span>`;
        dashMessageConfirmation.style.display = "block";
        setTimeout(() => {
            dashMessageConfirmation.style.display = "none";
        }, 3000);
    }
});
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    yield getUsers();
    contentDataTable.innerHTML = content;
}));
