import { getLocalStorage ,removeLocalStorage } from "../util/localStorage/localStorage.js";
import { setCookie } from "../util/cookies/cookies.js";

const userData = getLocalStorage("userData");
if(userData){
    document.getElementById("userName").value = userData.userName;
    document.getElementById("password").value = userData.userPassword;  
}

document.getElementById("login_form").addEventListener("submit", async function (event) {
    event.preventDefault();
    removeLocalStorage("userData")
    // Get input values
    const username = document.getElementById("userName").value.trim();
    const password = document.getElementById("password").value.trim();

    // Select error elements
    const nameError = document.getElementById("nameError");
    const passwordError = document.getElementById("passwordError");

    // Reset previous error states
    nameError.classList.add("hidden");
    passwordError.classList.add("hidden");

    let isInvalid = false;

    // Validate username
    if (!username) {
        nameError.textContent = "نام کاربری الزامی است.";
        nameError.classList.remove("hidden");
        isInvalid = true;
    }

    // Validate password
    if (!password) {
        passwordError.textContent = "رمز عبور الزامی است.";
        passwordError.classList.remove("hidden");
        isInvalid = true;
    }

    // Stop if there are validation errors
    if (isInvalid) return;

    // Send login request
    const result = await loginUser({ username, password });
    if(result.success){
        setTimeout(() => {
            window.location.href = "index.html";
        } , 2000)
    }

    // Handle errors from API
    if (!result.success) {
        if (result.errorType === "validation" || result.errorType === "unauthorized") {
            nameError.textContent = result.message;
            nameError.classList.remove("hidden");
        } else {
            alert(result.message);
        }
        return;
    }

    // Save user data on success
    setCookie("token", result.token);
});


async function loginUser({ username, password }) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
  
      // Parse response
      const data = await response.json();
  
      if (response.ok) {
        return { success: true, token: data.token };
      } else if (response.status === 400) {
        return { success: false, errorType: "validation", message: "⚠️ داده‌های ورودی نامعتبر هستند" };
      } else if (response.status === 401) {
        return { success: false, errorType: "unauthorized", message: "❌ نام کاربری یا رمز عبور اشتباه است" };
      } else {
        return { success: false, message: "❗ خطای نامشخص، لطفاً دوباره امتحان کنید" };
      }
    } catch (error) {
      return { success: false, message: "🚨 خطا در ارتباط با سرور" };
    }
  }
  