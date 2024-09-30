window.addEventListener('scroll' , () => {
    document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 100)
})

const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(card => {
  const faqIcon = card.querySelector('.faq-icon i'); // Select the <i> element
  faqIcon.addEventListener('click', () => {
    card.classList.toggle('open');

    // Toggle icon class
    if (card.classList.contains('open')) {
      faqIcon.classList.replace('bx-plus-circle', 'bx-minus-circle');
    } else {
      faqIcon.classList.replace('bx-minus-circle', 'bx-plus-circle');
    }
  });
});


const open = document.querySelector('.open-menu');
const close = document.querySelector('.close-menu');
const menu = document.querySelector('.nav-menu');

open.addEventListener('click', () => {
  menu.style.display = "flex";
  close.style.display = "inline-block";
  open.style.display = "none"
});

close.addEventListener('click', () => {
  menu.style.display = "none";
  close.style.display = "none";
  open.style.display = "inline-block"
});


/* Show the button when user scrolls down */
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("goToTopBtn").style.display = "block";
  } else {
    document.getElementById("goToTopBtn").style.display = "none";
  }
}


document.getElementById("goToTopBtn").addEventListener("click", function() {

  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
  });
});


// Login Page Redirect Wak Jangan Di Modif Woilah Rek

function checkButton() {
  const dashboard = document.querySelector('.dashboard');
  const loginStatus = localStorage.getItem('loginStatus');
  const statusElement = document.querySelector('.status');

  if (loginStatus === 'login') {
      // User is logged in, update status
      console.log("masuk")
      dashboard.style.display = 'block';
      statusElement.textContent = 'Logout';
      statusElement.style.color = '#B23B3B';
  } else {
      // User is not logged in, update status
      dashboard.style.display = 'none';
      statusElement.textContent = 'Login';
      statusElement.style.color = 'teal';
  }
}

function checkStatus(data) {
  const isLoggedIn = localStorage.getItem('isLogin');
  const statusElement = document.querySelector('.status');

  if (isLoggedIn === 'true' && typeof data === 'undefined') {
      // User is logged out (logic within checkStatus remains unchanged)
      localStorage.setItem('isLogin', false);
      alert('Logout Berhasil');
      localStorage.setItem('loginStatus', 'logout');
      checkButton();
      window.location.reload()
  } else if (isLoggedIn === 'true') {
    window.location.href = data;
  }
  else {
      // User is not logged in, redirect to login page with data-href
      window.location.href = 'auth/loginv2.html?redirect=' + encodeURIComponent(data);
  }
}

const isLoggedIn = localStorage.getItem('isLogin');

// Event delegation for links with data-href attribute
document.addEventListener('click', function(event) {
  const target = event.target;
  if (target.tagName === 'A' && target.hasAttribute('data-href')) {
    event.preventDefault(); // Prevent default navigation
    const data = target.getAttribute('data-href'); // Store the data-href value

    checkStatus(data);
    // alert(data) // Pass the data-href value to checkStatus
  }
});

document.addEventListener('click', function(event) {
  const target = event.target;
  if (target.tagName === 'DIV' && target.hasAttribute('data-href')) {
    event.preventDefault(); // Prevent default navigation
    const data = target.getAttribute('data-href'); // Store the data-href value

    checkStatus(data);
    // alert(data) // Pass the data-href value to checkStatus
  }
  if (target.tagName === 'IMG' && target.hasAttribute('data-href')) {
    event.preventDefault(); // Prevent default navigation
    const data = target.getAttribute('data-href'); // Store the data-href value

    checkStatus(data);
    // alert(data) // Pass the data-href value to checkStatus
  }
});


// Call checkButton() on page load
window.onload = checkButton;


