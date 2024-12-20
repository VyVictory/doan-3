const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    return(console.log('Cookie: '+ name + ': value'))
};

const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
const getCookie = (name) => {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
};
const cookieModule = () => {
    return { setCookie, deleteCookie, getCookie };
};

export default cookieModule;


// const token = 
// const response = await axios.post('url', formData, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'multipart/form-data',
//   },
// });