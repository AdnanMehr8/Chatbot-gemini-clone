const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");



let userText = null;
const initialHeight = chatInput.scrollHeight;
// To use the copyResponse function in this file
import { copyResponse } from './copyFunction.js';

const loadDataFromLocalstorage = () => {
    const themeColor = localStorage.getItem("theme-color");
    document.body.classList.toggle("light-mode",themeColor === "light_mode" );
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    const defaultText = `<div class = "default-text">
                            <h1>ChatGpt Clone</h1>
                            <p>Start a conversation and explore the power of AI.<br> Your chat history will be displayed here.</p>
                            </div>`

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);

}
loadDataFromLocalstorage();

const createElement =(html , className) => {
    // create new div and apply chat, speicified class and set html content of div
    const ChatDiv = document.createElement("div");
    ChatDiv.classList.add("chat", className);
    ChatDiv.innerHTML = html;
    return ChatDiv; //return the created chat div
}
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "Your_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

// Function to handle fetching chat response
// async function getChatResponse(incomingChatDiv) {
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//         const prompt = userText;
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
        
//         // Check if response is ok, if not throw an error
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
        
//         const text = await response.text();

//         // Create a paragraph element for the response
//         const pElement = document.createElement("p");
//         pElement.textContent = text;
//         // Remove the typing animation, 
//         incomingChatDiv.querySelector(".typing-animation").remove();
//         // Append the response to the existing chat container
//         incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
//         chatContainer.scrollTo(0, chatContainer.scrollHeight);
//         // Save the chats to local storage
//         localStorage.setItem("all-chats", chatContainer.innerHTML);
//     } catch (error) {
//         // Handle errors
//         const pElement = document.createElement("p");
//         pElement.classList.add("error");
//         pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
//         incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
//     }
// }

async function getChatResponse(incomingChatDiv) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = userText;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        // Create a paragraph element for the response
        const pElement = document.createElement("p");
        pElement.textContent = text;
        // Remove the typing animation, 
        incomingChatDiv.querySelector(".typing-animation").remove();
        // Append the response to the existing chat container
        incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
        // Save the chats to local storage
        localStorage.setItem("all-chats", chatContainer.innerHTML);
    } catch (error) {
                    // Handle errors
                const pElement = document.createElement("p");
                pElement.classList.add("error");
                pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
                incomingChatDiv.querySelector(".typing-animation").remove();
                incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
    }
}

// Function to display typing animation and initiate chat response
const showTypingAnimation = async () => {
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

    // Create an incoming Chat div with typing animation and append it to chat container
    const incomingChatDiv = createElement(html, 'incoming');
    chatContainer.appendChild(incomingChatDiv);

    // Attach event listener to the copy icon
    const copyIcon = incomingChatDiv.querySelector("#copyIcon");
    copyIcon.addEventListener("click", () => copyResponse(copyIcon));
    
    chatContainer.scrollTo(0, chatContainer.scrollHeight);

    // Wait for getChatResponse to finish before proceeding
    await getChatResponse(incomingChatDiv);
}


function handleOutgoingChat() {
    userText = chatInput.value.trim(); //Get chatInput value and remove extra spaces
    if(!userText) return; //if chatInput is empty enter from here
    chatInput.value = "";
    chatInput.style.height = `${initialHeight}px`;
    const html = `<div class="chat-content">
    <div class="chat-details">
        <img src="Images/user.jpg" alt="user-img">
        <p></p>
    </div>
</div>`;

// Create an outgoing Chat div with user's message and append it to chat container
const outgoingChatDiv = createElement(html , 'outgoing');
outgoingChatDiv.querySelector("p").textContent = userText;
document.querySelector(".default-text")?.remove();
chatContainer.appendChild(outgoingChatDiv);
chatContainer.scrollTo(0, chatContainer.scrollHeight);
setTimeout(showTypingAnimation, 500);
}

themeButton.addEventListener("click",() => {
    // Toggle Body's class for theme mode and save the updated theme to the local storage.
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme-color", themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
});

deleteButton.addEventListener("click",() => {
    // Remove the chats from local storage and call loadDataFromLocalstorage function
    if (confirm("Are you sure you want to delete all the chats?")){
        localStorage.removeItem("all-chats");
        loadDataFromLocalstorage();
    }
});



chatInput.addEventListener("input", () => {
    // Adjust the height of input field dynamically based on its content
    chatInput.style.height = `${initialHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If the Enter key is pressed without shift key and window width is larger than 800 pixels, handle the outgoing chat
   if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleOutgoingChat();
   }
});




sendButton.addEventListener("click", handleOutgoingChat);
