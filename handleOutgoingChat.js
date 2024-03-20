import { showTypingAnimation } from './showTypingAnimation.js';
import { createElement } from './createElement.js';

export function handleOutgoingChat(chatInput, initialHeight, chatContainer, genAI) {
    const userText = chatInput.value.trim();
    if (!userText) return;
    chatInput.value = "";
    chatInput.style.height = `${initialHeight}px`;
    const html = `<div class="chat-content">
    <div class="chat-details">
        <img src="Images/user.jpg" alt="user-img">
        <p></p>
    </div>
</div>`;

    const outgoingChatDiv = createElement(html, 'outgoing');
    outgoingChatDiv.querySelector("p").textContent = userText;
    document.querySelector(".default-text")?.remove();
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    setTimeout(() => showTypingAnimation(userText, chatContainer, genAI), 500); // Pass chatContainer instead of initialHeight
}
