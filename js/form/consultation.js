import { getCookie } from "../util/cookies/cookies.js";  // Assuming getCookie function is available

document.getElementById('request-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Clear any existing error messages
    const errorElements = document.querySelectorAll('.text-red-800');
    errorElements.forEach(element => element.classList.add('hidden'));

    // Get input values
    const reqAdv = document.getElementById('req-adv').value.trim();
    const reqDesc = document.getElementById('req-desc').value.trim();

    let isValid = true;

    // Validate "عنوان درخواست شما"
    if (reqAdv.split('').length < 4) { // Check if the input contains more than 4 words
        document.getElementById('req-adv-error').classList.remove('hidden');
        isValid = false;
    }

    // Validate "متن درخواست شما"
    if (reqDesc.split('').length < 4) { // Check if the input contains more than 4 words
        document.getElementById('req-desc-error').classList.remove('hidden');
        isValid = false;
    }

    // If the form is valid, submit the data to the server
    if (isValid) {
        const requestData = {
            reqAdv,
            reqDesc
        };

        // Assuming the user is logged in and the token is stored in a cookie
        const token = getCookie('authToken'); // You should have a valid auth token set when the user is logged in

        if (token) {
            submitConsultationRequest(requestData, token);
        } else {
            console.error("User is not authenticated.");
            // Show an error alert if the user is not logged in
            document.querySelector("#dan_status").classList.remove("translate-x-[150%]");
        }
    }
});

async function submitConsultationRequest(requestData, token) {
    try {
        const response = await fetch("/api/consultation-requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`  // Add token in Authorization header
            },
            body: JSON.stringify(requestData)
        });

        if (response.status === 201) {
            // Successfully created consultation request
            document.querySelector("#suc_status").classList.remove("translate-x-[150%]");
            setTimeout(() => {
                window.location.href = "thank-you.html"; // Redirect to a success page or thank you page
            }, 2000);
        } else if (response.status === 400) {
            // Handle invalid request
            console.error("Bad request: Invalid consultation data.");
            document.querySelector("#dan_status").classList.remove("translate-x-[150%]");
        } else {
            // Handle internal server error
            console.error("Server error. Please try again later.");
            document.querySelector("#dan_status").classList.remove("translate-x-[150%]");
        }
    } catch (error) {
        console.error("Error submitting the consultation request:", error);
        document.querySelector("#dan_status").classList.remove("translate-x-[150%]");
    }
}
