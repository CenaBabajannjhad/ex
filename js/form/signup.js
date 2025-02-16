import {setLocalStorage} from "/js/util/localStorage/localStorage.js"

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("#signup");
  const nameElement = document.querySelector("#Name");
  const userLastNameElement = document.querySelector("#userLastName");
  const userEmailElement = document.querySelector("#userEmail");
  const userPhoneNumberElement = document.querySelector("#userPhoneNumber");
  const userNameElement = document.querySelector("#userName");
  const userPasswordElement = document.querySelector("#userPassword");

  // Function to show error messages
  function showError(inputElement, errorElement) {
    errorElement.classList.remove("hidden");
    inputElement.classList.add("border-red-800");
  }

  // Function to hide error messages
  function hideError(inputElement, errorElement) {
    errorElement.classList.add("hidden");
    inputElement.classList.remove("border-red-800");
  }

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

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
      showError(nameElement, nameError);
      isValid = false;
    } else {
      hideError(nameElement, nameError);
    }

    // Validate Last Name
    if (!userLastName) {
      showError(userLastNameElement, lastNameError);
      isValid = false;
    } else {
      hideError(userLastNameElement, lastNameError);
    }

    // Validate Email
    if (!emailRegex.test(userEmail)) {
      showError(userEmailElement, emailError);
      isValid = false;
    } else {
      hideError(userEmailElement, emailError);
    }

    // Validate Phone Number
    if (!phoneNumberRegex.test(userPhoneNumber)) {
      showError(userPhoneNumberElement, phoneNumberError);
      isValid = false;
    } else {
      hideError(userPhoneNumberElement, phoneNumberError);
    }

    // Validate Username
    if (!userName) {
      showError(userNameElement, userNameError);
      isValid = false;
    } else {
      hideError(userNameElement, userNameError);
    }

    // Validate Password (minimum 8 characters)
    if (userPassword.length < 8) {
      showError(userPasswordElement, userPasswordError);
      isValid = false;
    } else {
      hideError(userPasswordElement, userPasswordError);
    }


    // Prepare userData for API request
    const userData = {
      name,
      lastName: userLastName,
      email: userEmail,
      phoneNumber: userPhoneNumber,
      username: userName,
      password: userPassword
    };

    // If the form is valid, proceed with signup
    if (isValid) {
      const result = await signup(userData);
      alert(result.message);

      if (result.success) {
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
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      return { success: true, message: "✅ ثبت‌نام با موفقیت انجام شد" };
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