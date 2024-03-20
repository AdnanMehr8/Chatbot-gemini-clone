// import { copyResponse } from './copyResponse.js';
import { createElement } from './createElement.js';

// Initializations
export async function getChatResponse(userText, chatContainer, genAI, incomingChatDiv) {
    try {
        createElement();
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = userText;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text =  response.text().trim();
        // const text = response.candidates[0].content.parts.text();

        console.log(text);
        console.log(response);
        const pElement = document.createElement("p");
        pElement.textContent = text;
        incomingChatDiv.querySelector(".typing-animation").remove();
        incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
        localStorage.setItem("all-chats", chatContainer.innerHTML);
    } catch (error) {
        const pElement = document.createElement("p");
        pElement.classList.add("error");
        pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
        incomingChatDiv.querySelector(".typing-animation").remove();
        incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
    }
}
