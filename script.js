const checkInForm = document.getElementById("checkInForm");
const attendeeNameInput = document.getElementById("attendeeName");
const attendeeCount = document.getElementById("attendeeCount");
const greeting = document.getElementById("greeting");

checkInForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const attendeeName = attendeeNameInput.value.trim();

  if (attendeeName.length === 0) {
    greeting.textContent = "Please enter your name before checking in.";
    greeting.classList.remove("success-message");
    greeting.style.display = "block";
    attendeeNameInput.focus();
    return;
  }

  greeting.textContent = `Welcome, ${attendeeName}! Thanks for checking in to the Team Sustainability Summit.`;
  greeting.classList.add("success-message");
  greeting.style.display = "block";
  attendeeCount.textContent = Number(attendeeCount.textContent) + 1;

  checkInForm.reset();
});