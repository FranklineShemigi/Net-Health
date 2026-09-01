// ==========================================
// NET-HEALTH AI TUTOR
// ACESO
// ==========================================


// ===== DOM ELEMENTS =====

const chatArea =
    document.getElementById("chat-area");

const chatForm =
    document.getElementById("chat-form");

const chatInput =
    document.getElementById("chat-input");

const sendButton =
    document.getElementById("send-btn");

const newChatButton =
    document.getElementById("new-chat-btn");

const aiStatus =
    document.querySelector(".ai-status");

const suggestionButtons =
    document.querySelectorAll(".suggestion-btn");


// ==========================================
// BACKEND URL
// ==========================================

const API_URL =
    "http://localhost:3000/api/ai/chat";


// ==========================================
// UPDATE SEND BUTTON
// ==========================================

function updateSendButton() {

    sendButton.disabled =
        chatInput.value.trim() === "";

}


// ==========================================
// ADD MESSAGE
// ==========================================

function addMessage(message, sender) {

    const messageElement =
        document.createElement("div");

    messageElement.classList.add(
        "chat-message"
    );


    const messageContent =
        document.createElement("div");

    messageContent.classList.add(
        "message-content"
    );


    const senderName =
        document.createElement("strong");


    const messageText =
        document.createElement("p");


    if (sender === "user") {

        messageElement.classList.add(
            "user-message"
        );

        senderName.textContent =
            "You";

        messageText.textContent =
            message;

    } else {

        messageElement.classList.add(
            "tutor-message"
        );


        const avatar =
            document.createElement("div");

        avatar.classList.add(
            "message-avatar"
        );

        avatar.textContent =
            "🤖";


        senderName.textContent =
            "Aceso";


        messageText.innerHTML =
            message;


        messageElement.appendChild(
            avatar
        );

    }


    messageContent.appendChild(
        senderName
    );

    messageContent.appendChild(
        messageText
    );


    messageElement.appendChild(
        messageContent
    );


    chatArea.appendChild(
        messageElement
    );


    chatArea.scrollTop =
        chatArea.scrollHeight;

}


// ==========================================
// TYPING INDICATOR
// ==========================================

function showTypingIndicator() {

    const typingElement =
        document.createElement("div");

    typingElement.id =
        "typing-indicator";

    typingElement.classList.add(
        "chat-message",
        "tutor-message"
    );


    typingElement.innerHTML = `

        <div class="message-avatar">
            🤖
        </div>

        <div class="message-content">

            <strong>
                Aceso
            </strong>

            <p>
                Thinking...
            </p>

        </div>

    `;


    chatArea.appendChild(
        typingElement
    );


    chatArea.scrollTop =
        chatArea.scrollHeight;

}


// ==========================================
// REMOVE TYPING INDICATOR
// ==========================================

function removeTypingIndicator() {

    const typingIndicator =
        document.getElementById(
            "typing-indicator"
        );


    if (typingIndicator) {

        typingIndicator.remove();

    }

}


// ==========================================
// ASK ACESO
// ==========================================

async function askAceso(question) {

    const response =
        await fetch(
            API_URL,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    message:
                        question

                })

            }
        );


    const data =
        await response.json();


    if (!response.ok) {

        throw new Error(
            data.error ||
            "Aceso server error"
        );

    }


    if (!data.reply) {

        throw new Error(
            "Aceso returned no response"
        );

    }


    return data.reply;

}


// ==========================================
// HANDLE QUESTION
// ==========================================

async function handleQuestion(question) {

    const cleanedQuestion =
        question.trim();


    if (!cleanedQuestion) {

        return;

    }


    // Add user message

    addMessage(
        cleanedQuestion,
        "user"
    );


    // Clear input

    chatInput.value = "";


    // Disable button while processing

    sendButton.disabled =
        true;


    // Show thinking

    showTypingIndicator();

    aiStatus.textContent =
        "● Thinking...";


    try {

        const response =
            await askAceso(
                cleanedQuestion
            );


        removeTypingIndicator();


        addMessage(
            response,
            "tutor"
        );


        aiStatus.textContent =
            "● Ready";

    }


    catch (error) {

        console.error(
            "Aceso error:",
            error
        );


        removeTypingIndicator();


        addMessage(
            `
            Sorry, I couldn't connect to
            Aceso right now.

            Please make sure the Aceso
            backend is running.
            `,
            "tutor"
        );


        aiStatus.textContent =
            "● Offline";

    }


    finally {

        updateSendButton();

        chatInput.focus();

    }

}


// ==========================================
// FORM SUBMISSION
// ==========================================

chatForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        handleQuestion(
            chatInput.value
        );

    }
);


// ==========================================
// INPUT
// ==========================================

chatInput.addEventListener(
    "input",
    updateSendButton
);


// ==========================================
// SUGGESTED QUESTIONS
// ==========================================

suggestionButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const question =
                    button.textContent.trim();


                chatInput.value =
                    question;


                // Directly send suggestion

                handleQuestion(
                    question
                );

            }
        );

    }
);


// ==========================================
// ENTER KEY
// ==========================================

chatInput.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            chatForm.requestSubmit();

        }

    }
);


// ==========================================
// NEW CHAT
// ==========================================

if (newChatButton) {

    newChatButton.addEventListener(
        "click",
        () => {

            chatArea.innerHTML = "";


            addMessage(
                `
                Hello! I'm Aceso, your Net-Health
                Clinical Learning Assistant.

                Ask me about medicines, anatomy,
                physiology, pharmacology, clinical
                concepts, or other healthcare topics.
                `,
                "tutor"
            );


            chatInput.value = "";

            updateSendButton();


            aiStatus.textContent =
                "● Ready";


            chatInput.focus();

        }
    );

}


// ==========================================
// INITIAL STATE
// ==========================================

updateSendButton();