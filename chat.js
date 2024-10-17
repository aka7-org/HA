let messages = [];

function displayMessages() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = messages.map(msg => `<p>${msg}</p>`).join('');
}

function sendMessage() {
    const input = document.getElementById('chat-input').value;
    if (input.trim()) {
        messages.push(`Hacker: ${input}`);
        displayMessages();
        document.getElementById('chat-input').value = '';
    }
}
