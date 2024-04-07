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
const tokenRefresher = () => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');
    console.log(token);
    try {
        const tokenRefresherResponse = yield fetch(`https://my-brand-aimedivin-backend.onrender.com/api/auth/token/${userId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        });
        if (tokenRefresherResponse.ok) {
            const newAccessToken = yield tokenRefresherResponse.json();
            const expirationTime = Date.now() + (60 * 60 * 1000);
            localStorage.setItem('token', newAccessToken.token);
            localStorage.setItem('userId', newAccessToken.userId);
            localStorage.setItem('expirationTime', expirationTime.toString());
            location.reload();
        }
        else {
            throw new Error('Not Authorized');
        }
    }
    catch (error) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        window.localStorage.href = '/';
    }
});
const expirationTime = localStorage.getItem('expirationTime');
const refreshToken = localStorage.getItem('refreshToken');
console.log(expirationTime);
if (expirationTime) {
    if (Date.now() >= Number(expirationTime)) {
        tokenRefresher();
    }
}
if (!expirationTime || !refreshToken) {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
}
