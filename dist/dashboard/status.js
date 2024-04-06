"use strict";
// const apiUrl_D = "http://localhost:3000/";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// const token = localStorage.getItem('token');
// const userId = localStorage.getItem('userId');
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    const headerProfile = document.querySelector('.header__profile');
    try {
        const userInfoResponse = yield fetch(`${apiUrl_D}api/auth/user/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (userInfoResponse.ok) {
            const userInfo = yield userInfoResponse.json();
            if (userInfo.user.isAdmin) {
                headerProfile.innerHTML = `
                    <figure class="profile__image">
                    <img src = "${apiUrl_D}${userInfo.user.photo}" alt = "${userInfo.user.name}" >
                    </figure>`;
                headerProfile.addEventListener('click', () => {
                    const adminId = localStorage.getItem('userId');
                    getProfileData(adminId);
                });
            }
            else {
                window.location.href = '/';
            }
        }
        else {
            window.location.href = '/';
        }
    }
    catch (error) {
    }
}));
