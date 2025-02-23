const form = document.querySelector("#adminLogin");

form.addEventListener("submit" , async (e) => {
    e.preventDefault();

    const userName = document.querySelector("#userName").value;
    const password = document.querySelector("#password").value;

    const data = {
        userName,
        password
    }

    loginAdmin(data)
})

async function loginAdmin(data) {
    try{
        const res = await fetch("https://api.exiness.com/api/admin/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if(res.ok){
            loginDashboard(data)
        }else{
            throw new Error("error")
        }

    }catch(error){
        console.log("loginAdmin =>  " , error);
    }
}

async function loginDashboard(data) {
    try{
        const res = await fetch("https://api.exiness.com/api/admin/dashboard", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
        });

        if(res.ok){
            window.location.href = "index.html";
        }


    }catch(error){
        console.log("loginDashboard =>  " , error);
    }
}