// Get the modal
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// Get the form
const form = document.getElementById("contactForm");

// Function to open the modal
function openModal() {
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  closeModal();
}

// When the user clicks anywhere outside of the modal content, close the modal
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

// Handle form submission
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Display the modal
  openModal();

  // Optionally, you can also clear the form fields here if needed
  form.reset();
});
