// Function to set an item in localStorage
function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Function to get an item from localStorage
function getLocalStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

// Function to remove an item from localStorage
function removeLocalStorage(key) {
    localStorage.removeItem(key);
}


export {setLocalStorage , getLocalStorage , removeLocalStorage}