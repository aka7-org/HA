// Check if the user has XP stored in localStorage
let userXP = localStorage.getItem('xp') ? parseInt(localStorage.getItem('xp')) : 0;
let userLevel = Math.floor(userXP / 50000) + 1;

// Function to display the current XP and Level
function displayXP() {
    document.getElementById('xp-display').innerText = `XP: ${userXP}`;
    document.getElementById('level-display').innerText = `Level: ${userLevel}`;
}

// Call this function when the page loads
displayXP();

// Function to update XP
function addXP(amount) {
    userXP += amount;
    userLevel = Math.floor(userXP / 50000) + 1;
    localStorage.setItem('xp', userXP); // Save to localStorage
    displayXP(); // Update the display
}

// Example: Adding XP for performing a task
// addXP(130000); // Add XP for Upload RAT (example)
