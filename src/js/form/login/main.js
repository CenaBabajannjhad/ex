import getInputValue from "../util/"
import resetInput from "../resetInput"

const formEl = document.querySelector("#login_form");
const userNameEl = document.querySelector("#userName");
const userPasswordEl = document.querySelector("#password");

formEl.addEventListener("submit" , formHandler)
function formHandler(e){
    e.preventDefault();
    // get user data
    const userName = getInputValue(userNameEl);
    const userPassword = getInputValue(userPasswordEl);

    console.log(userName);
    console.log(userPassword);
    // reset the value
    resetInput(userNameEl)
    resetInput(userPasswordEl)
}