function validateCredentials(username, password) {
  const Susername = localStorage.getItem("Susername");
  const Spassword = localStorage.getItem("Spassword");

  return fetch("../db/db.json")
    .then((response) => response.json())
    .then((data) => {
      const users = data.users;
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (
          (user.username === username && user.password === password) ||
          (username === Susername && password === Spassword)
        ) {
          return true;
        }
      }
      return false;
    });
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const text = document.getElementById("text");

    function openModal() {
      modal.classList.add('show');
      const loginStatus = localStorage.getItem("loginStatus")
      if (loginStatus == "login"){
        text.innerText = "Login Successful";
      } else {
        text.innerText = "Wrong Username or Password";
      }
    }
    function closeModal() {
      modal.classList.remove('show');
      const loginStatus = localStorage.getItem("loginStatus")
     if (loginStatus == "login") {
        const queryParams = new URLSearchParams(window.location.search);
        const redirectUrl = queryParams.get("redirect");
        if (redirectUrl === "undefined") {
          window.location.href = "../index.html";
        } else {
          window.location.href = redirectUrl;
        }
      } else {
        modal.style.display = "none";
        window.location.reload()
      }
    }
    span.onclick = function () {
      closeModal();
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        closeModal();
      }
    };

    validateCredentials(username, password)
      .then((isValid) => {
        if (isValid) {
          // Login successful
          localStorage.setItem("isLogin", true);
          localStorage.setItem("loginStatus", "login");
          localStorage.setItem("username", username);
          console.log(username);

          openModal();

          // const queryParams = new URLSearchParams(window.location.search);
          // const redirectUrl = queryParams.get('redirect');
          // if (redirectUrl === "undefined"){
          //     window.location.href = "../index.html";
          // } else {
          //     window.location.href = redirectUrl;
          // }
        } else {
          // Invalid credentials
        //   alert("Invalid username or password");
        openModal()
        }
      })
      .catch((error) => {
        console.error("Error validating credentials:", error);
      });
  });
