
const tokenRefresher = async () => {
    const token = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');
    console.log(token);

    try {
        const tokenRefresherResponse = await fetch(`https://my-brand-aimedivin-backend.onrender.com/api/auth/token/${userId}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            })

        if (tokenRefresherResponse.ok) {
            const newAccessToken = await tokenRefresherResponse.json();
            const expirationTime = Date.now() + (60 * 60 * 1000);

            localStorage.setItem('token', newAccessToken.token);
            localStorage.setItem('userId', newAccessToken.userId);
            localStorage.setItem('expirationTime', expirationTime.toString());

            location.reload();
        } else {
            throw new Error('Not Authorized');
        }
    } catch (error) {
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
        window.localStorage.href = '/';
    }
}

const expirationTime = localStorage.getItem('expirationTime');
const refreshToken = localStorage.getItem('refreshToken');

console.log(expirationTime);
if (expirationTime) {
    if (Date.now() >= Number(expirationTime)) {
        tokenRefresher()
    }
}

if (!expirationTime || !refreshToken) {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
}


