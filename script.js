const checkInForm = document.getElementById("checkInForm");
const attendeeNameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const celebrationMessage = document.getElementById("celebrationMessage");
const winningTeamName = document.getElementById("winningTeamName");
const attendanceGoal = 50;
const teamIds = ["water", "zero", "power"];
const teamNames = {
  water: "Team Water Wise",
  zero: "Team Net Zero",
  power: "Team Renewables"
};
const teamLastCheckIn = {
  water: 0,
  zero: 0,
  power: 0
};

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

  const currentAttendance = Number(attendeeCount.textContent);
  const attendanceProgress = Math.min(
    currentAttendance / attendanceGoal * 100,
    100
  );
  progressBar.style.width = `${attendanceProgress}%`;
  progressBar.setAttribute(
    "aria-valuenow",
    Math.min(currentAttendance, attendanceGoal)
  );

  const teamCount = document.getElementById(`${teamSelect.value}Count`);
  teamCount.textContent = Number(teamCount.textContent) + 1;
  teamLastCheckIn[teamSelect.value] = currentAttendance;

  if (currentAttendance === attendanceGoal) {
    let winningTeam = teamSelect.value;

    for (let i = 0; i < teamIds.length; i += 1) {
      const teamId = teamIds[i];
      const currentTeamCount = Number(
        document.getElementById(`${teamId}Count`).textContent
      );
      const winningTeamCount = Number(
        document.getElementById(`${winningTeam}Count`).textContent
      );

      if (
        currentTeamCount > winningTeamCount ||
        (currentTeamCount === winningTeamCount &&
          teamLastCheckIn[teamId] > teamLastCheckIn[winningTeam])
      ) {
        winningTeam = teamId;
      }
    }

    winningTeamName.textContent = teamNames[winningTeam];
    celebrationMessage.hidden = false;
  }

  checkInForm.reset();
});