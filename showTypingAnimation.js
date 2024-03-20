import { getChatResponse } from './getChatResponse.js';
import { copyResponse } from './copyResponse.js';
import { createElement } from './createElement.js';

export async function showTypingAnimation(userText, chatContainer, genAI) {
    const html = `
        <div class="chat-content">
            <div class="chat-details">
                <img src="Images/chatbot.jpg" alt="chatbot-img">
                <div class="typing-animation">
                    <div class="typing-dot" style="--delay:0.2s"></div>
                    <div class="typing-dot" style="--delay:0.3s"></div>
                    <div class="typing-dot" style="--delay:0.4s"></div>
                </div>
            </div>
            <span class="material-symbols-outlined" id="copyIcon">content_copy</span>
        </div>`;

    const incomingChatDiv = createElement(html, 'incoming');
    chatContainer.appendChild(incomingChatDiv);

    const copyIcon = incomingChatDiv.querySelector("#copyIcon");
    copyIcon.addEventListener("click", () => copyResponse(copyIcon));

    chatContainer.scrollTo(0, chatContainer.scrollHeight);

    await getChatResponse(userText, chatContainer, genAI, incomingChatDiv);
}
