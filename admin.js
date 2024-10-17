// admin.js

// Dummy function for fetching user data (in a real setup, you'll query a database)
function getUserDetails() {
    let userId = document.getElementById('user-id').value;
    if (!userId) {
        alert('Please enter a valid User ID.');
        return;
    }

    // Fetch user data (simulated here)
    let userXP = localStorage.getItem(userId + '_xp') || 0;
    let userLevel = Math.floor(userXP / 50000) + 1;

    document.getElementById('user-xp').innerText = userXP;
    document.getElementById('user-level').innerText = userLevel;
}

// Function to reset user cooldowns
function resetCooldown() {
    let userId = document.getElementById('user-id').value;
    if (!userId) {
        alert('Please enter a valid User ID.');
        return;
    }

    // Reset all cooldowns for the user
    localStorage.removeItem(userId + '_ratLastUpload');
    localStorage.removeItem(userId + '_sqlLastInject');

    alert('User cooldowns have been reset.');
}

// Mission upload form submission handling
document.getElementById('rat-upload-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate successful mission upload
    alert('RAT mission uploaded with ' + document.getElementById('rat-xp').value + ' XP reward.');

    // In a real application, you would send this data to the server
});

document.getElementById('sql-upload-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate successful mission upload
    alert('SQL Injection mission uploaded with ' + document.getElementById('sql-xp').value + ' XP reward.');

    // In a real application, you would send this data to the server
});
