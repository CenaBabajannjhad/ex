function deleteCookie(key) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

function getCookie(key) {
    const decodedCookies = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookies.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
       let cookie = cookieArray[i].trim();
        if (cookie.indexOf(`${key}=`) === 0) {
        return cookie.substring(key.length, cookie.length).replace("=" , "");
      }
    }
    return null;
}
  
function setCookie(key, value, days = 365) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const expiresString = expires.toUTCString();
    document.cookie = `${key}=${value}; expires=${expiresString}; path=/`;
}


export {deleteCookie , getCookie , setCookie}