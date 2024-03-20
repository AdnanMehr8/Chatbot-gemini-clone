// // Import statements for the functions
// import { copyResponse } from './copyResponse.js';
// import { createElement } from './createElement.js';
// import { getChatResponse } from './getChatResponse.js';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { handleOutgoingChat } from './handleOutgoingChat.js';
// import { loadDataFromLocalStorage } from './loadDataFromLocalStorage.js';
// import { showTypingAnimation } from './showTypingAnimation.js';

// // DOM element selectors
// const chatInput = document.querySelector("#chat-input");
// const sendButton = document.querySelector("#send-btn");
// const chatContainer = document.querySelector(".chat-container");
// const themeButton = document.querySelector("#theme-btn");
// const deleteButton = document.querySelector("#delete-btn");

// // Your API Key
// const API_KEY = "AIzaSyALwSvlTW-_XvwTvcVRL0RaYtvVneZzUhA";

// // Initialization of Google Generative AI
// const genAI = new GoogleGenerativeAI(API_KEY);

// let userText = null;
// const initialHeight = chatInput.scrollHeight;

// // Event listener for send button click
// sendButton.addEventListener("click", () => handleOutgoingChat(chatInput, initialHeight, chatContainer, genAI));

// // Event listener for theme button click
// themeButton.addEventListener("click", () => {
//     document.body.classList.toggle("light-mode");
//     localStorage.setItem("theme-color", themeButton.innerText);
//     themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
// });

// // Event listener for delete button click
// deleteButton.addEventListener("click", () => {
//     if (confirm("Are you sure you want to delete all the chats?")) {
//         localStorage.removeItem("all-chats");
//         loadDataFromLocalStorage();
//     }
// });

// // Event listener for chat input
// chatInput.addEventListener("input", () => {
//     chatInput.style.height = `${initialHeight}px`;
//     chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// // Event listener for Enter key press
// chatInput.addEventListener("keydown", (e) => {
//     if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//         e.preventDefault();
//         handleOutgoingChat(chatInput, initialHeight, chatContainer, genAI);
//     }
// });

// // Initial loading of data from local storage
// loadDataFromLocalStorage();
import { handleOutgoingChat } from './handleOutgoingChat.js';
import { loadDataFromLocalStorage } from './loadDataFromLocalStorage.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { showTypingAnimation } from './showTypingAnimation.js';

// DOM element selectors
const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
// const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");

// Your API Key
const API_KEY = "AIzaSyALwSvlTW-_XvwTvcVRL0RaYtvVneZzUhA";

// Initialization of Google Generative AI
const genAI = new GoogleGenerativeAI(API_KEY);

let userText = null;
const initialHeight = chatInput.scrollHeight;

// Event listener for send button click
sendButton.addEventListener("click", () => handleOutgoingChat(chatInput, initialHeight, chatContainer, genAI));

// Event listener for theme button click
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("theme-color", themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
});

// Event listener for delete button click
deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all the chats?")) {
        localStorage.removeItem("all-chats");
        loadDataFromLocalStorage();
    }
});

// Event listener for chat input
chatInput.addEventListener("input", () => {
    chatInput.style.height = `${initialHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// Event listener for Enter key press
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleOutgoingChat(chatInput, initialHeight, chatContainer, genAI);
    }
});

// Initial loading of data from local storage
loadDataFromLocalStorage();
