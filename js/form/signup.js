import {setLocalStorage} from "/js/util/localStorage/localStorage.js"
import { setCookie } from "../util/cookies/cookies.js";

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("#signup");
  const nameElement = document.querySelector("#Name");
  const userLastNameElement = document.querySelector("#userLastName");
  const userEmailElement = document.querySelector("#userEmail");
  const userPhoneNumberElement = document.querySelector("#userPhoneNumber");
  const userNameElement = document.querySelector("#userName");
  const userPasswordElement = document.querySelector("#userPassword");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.getElementById("nameError").classList.add("hidden");
    document.getElementById("lastNameError").classList.add("hidden");
    document.getElementById("emailError").classList.add("hidden");
    document.getElementById("phoneNumberError").classList.add("hidden");
    document.getElementById("emailError").classList.add("hidden");
    document.getElementById("userNameError").classList.add("hidden");
    document.getElementById("userPasswordError").classList.add("hidden");



    // Get error elements
    const nameError = document.querySelector("#nameError");
    const lastNameError = document.querySelector("#lastNameError");
    const emailError = document.querySelector("#emailError");
    const phoneNumberError = document.querySelector("#phoneNumberError");
    const userNameError = document.querySelector("#userNameError");
    const userPasswordError = document.querySelector("#userPasswordError");

    // Trimmed input values
    const name = nameElement.value.trim();
    const userLastName = userLastNameElement.value.trim();
    const userEmail = userEmailElement.value.trim();
    const userPhoneNumber = userPhoneNumberElement.value.trim();
    const userName = userNameElement.value.trim();
    const userPassword = userPasswordElement.value.trim();

    // Regex patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneNumberRegex = /^\d{11}$/; // Phone number validation (exactly 11 digits)

    let isValid = true;

    // Validate Name
    if (!name) {
      document.getElementById("nameError").classList.remove("hidden");
      isValid = false;
    } 

    // Validate Last Name
    if (!userLastName) {
      document.getElementById("lastNameError").classList.remove("hidden");
      isValid = false;
    }

    // Validate Email
    if (!emailRegex.test(userEmail)) {
      document.getElementById("emailError").classList.remove("hidden");
      isValid = false;
    } 

    // Validate Phone Number
    if (!phoneNumberRegex.test(userPhoneNumber)) {
      document.getElementById("phoneNumberError").classList.remove("hidden");
      isValid = false;
    } 

    // Validate Username
    if (!userName) {
      document.getElementById("userNameError").classList.remove("hidden");
      isValid = false;
    } 

    // Validate Password (minimum 8 characters)
    if (userPassword.length < 8) {
      document.getElementById("userPasswordError").classList.remove("hidden");
      isValid = false;
    } 


    // Prepare userData for API request
    const userData = {
      name,
      lastname: userLastName,
      email: userEmail,
      phonenumber: userPhoneNumber,
      username: userName,
      password: userPassword
    };

    // If the form is valid, proceed with signup
    if (isValid) {
      const result = await signup(userData);
      alert(result.message);

      if (result.success) {
        setCookie("userSignin" , "true")
        setLocalStorage("userData", { userName, userPassword });
        signupForm.reset(); // Reset form on successful registration
        window.location.href = "login.html"
      }
    }
  });
});

// Function to send signup request
async function signup(userData) {
  try {
    const response = await fetch("https://api.exiness.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      return { success: true, message: "✅ ثبت‌ نام با موفقیت انجام شد" };

    } else if (response.status === 400) {
      return { success: false, message: "⚠️ داده‌های ورودی نامعتبر هستند" };

    } else if (response.status === 409) {
      return { success: false, message: "❌ نام کاربری قبلاً ثبت شده است" };

    } else {
      return { success: false, message: "❗ خطای نامشخص، لطفاً دوباره امتحان کنید" };
    }
  } catch (error) {
    return { success: false, message: "🚨 خطا در ارتباط با سرور" };
  }
}