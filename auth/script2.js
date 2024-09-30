const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const text = document.getElementById("text");
const signInForm = document.querySelector("#SignForm");
const submitButton = document.querySelector(
  '#SignForm button[type="submit"]'
);

function openModal() {
    modal.classList.add('show');
    if (formIsFilled(signInForm)){
        text.innerText = ""
        }
        else {
            text.innerText = "Please fill in all the required fields"
        }
    
  }
  function closeModal() {
    modal.classList.remove('show')
    if(formIsFilled(signInForm)){
        const queryParams = new URLSearchParams(window.location.search);
        const redirectUrl = queryParams.get("redirect");
    
        const targetUrl =
          redirectUrl && redirectUrl !== "undefined"
            ? redirectUrl
            : "undefined";
    
        window.location.href =
          "loginv2.html?redirect=" + encodeURIComponent(targetUrl);
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



submitButton.addEventListener("click", function (event) {
  event.preventDefault(); 
  if (formIsFilled(signInForm)) {
    const username = document.getElementById("Susername").value;
    const password = document.getElementById("Spassword").value;
 
    localStorage.setItem("Susername", username);
    localStorage.setItem("Spassword", password);
    openModal()
    text.innerText = "New account created successfully \n Username : "  + username + "\n Password: " + password
  } else {
    openModal()
  }
});

function formIsFilled(form) {
  const requiredFields = form.querySelectorAll("[required]");
  for (const field of requiredFields) {
    if (!field.value.trim()) {
      return false;
    }
  }
  return true;
}
