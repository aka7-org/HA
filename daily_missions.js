// daily_missions.js

// Available missions with associated XP and a link to the mission page
const missions = [
    { name: 'Upload a RAT', xp: 130000, link: 'rat_upload.html', key: 'rat' },
    { name: 'Perform SQL Injection', xp: 100000, link: 'sql_inject.html', key: 'sql' },
    { name: 'Brute Force Attack', xp: 120000, link: 'brute_force.html', key: 'brute' },
    { name: 'DDoS Attack', xp: 90000, link: 'ddos.html', key: 'ddos' },
    { name: 'Password Cracking', xp: 200000, link: 'password_crack.html', key: 'password' },
    { name: 'Bypass Firewall', xp: 80000, link: 'firewall_bypass.html', key: 'firewall' },
    { name: 'Create a Keylogger', xp: 110000, link: 'keylogger.html', key: 'keylogger' }
];

// Cooldown duration (24 hours in milliseconds)
const cooldownDuration = 24 * 60 * 60 * 1000;

// Helper function to get or set daily missions for a user
function getDailyMissions() {
    let storedMissions = localStorage.getItem('dailyMissions');
    let missionDate = localStorage.getItem('missionDate');
    let today = new Date().toISOString().split('T')[0]; // Get today's date

    // If no missions stored for today, generate new ones
    if (!storedMissions || missionDate !== today) {
        let dailyMissions = [];
        while (dailyMissions.length < 3) {
            let randomMission = missions[Math.floor(Math.random() * missions.length)];
            if (!dailyMissions.find(m => m.key === randomMission.key)) {
                dailyMissions.push(randomMission);
            }
        }
        localStorage.setItem('dailyMissions', JSON.stringify(dailyMissions));
        localStorage.setItem('missionDate', today);
        return dailyMissions;
    } else {
        return JSON.parse(storedMissions);
    }
}

// Helper function to check if a mission is in cooldown
function isMissionInCooldown(missionKey) {
    let lastCompletion = localStorage.getItem(`${missionKey}LastCompleted`);
    if (!lastCompletion) return false;

    let now = new Date().getTime();
    return now - lastCompletion < cooldownDuration;
}

// Helper function to mark a mission as completed and start the cooldown
function completeMission(missionKey) {
    let now = new Date().getTime();
    localStorage.setItem(`${missionKey}LastCompleted`, now);

    // Add XP to user
    let userXP = parseInt(localStorage.getItem('xp')) || 0;
    let mission = missions.find(m => m.key === missionKey);
    if (mission) {
        userXP += mission.xp;
        localStorage.setItem('xp', userXP);
        alert(`Mission completed! You earned ${mission.xp} XP. Total XP: ${userXP}`);
    }

    // Redirect back to the missions page after completion
    window.location.href = 'missions.html';
}

// Function to display daily missions and handle cooldowns
function displayDailyMissions() {
    const missionList = document.getElementById('missions-list');
    const dailyMissions = getDailyMissions();

    dailyMissions.forEach(mission => {
        let li = document.createElement('li');

        // Check if the mission is in cooldown
        if (isMissionInCooldown(mission.key)) {
            let cooldownEnd = new Date(parseInt(localStorage.getItem(`${mission.key}LastCompleted`)) + cooldownDuration);
            let hoursLeft = Math.floor((cooldownEnd.getTime() - new Date().getTime()) / (60 * 60 * 1000));
            li.innerHTML = `${mission.name} - Cooldown for ${hoursLeft} more hours`;
            li.style.color = 'red';
        } else {
            li.innerHTML = `<a href="${mission.link}">${mission.name}</a> - Earn ${mission.xp} XP`;
            li.style.color = 'green';
        }

        missionList.appendChild(li);
    });
}

// Display the missions when the page loads
window.onload = displayDailyMissions;
