// xp_system.js

// Load user XP from localStorage or set default XP if not present
let userXP = parseInt(localStorage.getItem('xp')) || 0;
let userLevel = Math.floor(userXP / 50000) + 1;

// Function to update and display user XP and level on the profile page
function updateXPDisplay() {
    document.getElementById('xp-display').innerText = `XP: ${userXP}`;
    document.getElementById('level-display').innerText = `Level: ${userLevel}`;
}

// Call the function on load to display current XP and level
window.onload = updateXPDisplay;

// Function to add XP after completing a mission
function addXP(amount) {
    userXP += amount;
    userLevel = Math.floor(userXP / 50000) + 1;
    localStorage.setItem('xp', userXP); // Store the updated XP in localStorage
    updateXPDisplay(); // Update the XP display on profile page
}

// Function to check if a mission is in cooldown (returns true or false)
function isMissionInCooldown(missionKey) {
    let lastCompletion = localStorage.getItem(`${missionKey}LastCompleted`);
    if (!lastCompletion) return false;

    let cooldownDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    let now = new Date().getTime();
    return now - lastCompletion < cooldownDuration;
}

// Function to mark a mission as completed and put it in cooldown
function completeMission(missionKey, xpReward) {
    let now = new Date().getTime();
    localStorage.setItem(`${missionKey}LastCompleted`, now); // Store completion time

    addXP(xpReward); // Add XP for completing the mission
    alert(`Mission completed! You earned ${xpReward} XP. Total XP: ${userXP}`);
}
