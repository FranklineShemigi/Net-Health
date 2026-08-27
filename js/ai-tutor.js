// ==========================================
// NET-HEALTH AI TUTOR
// ==========================================


// ===== DOM ELEMENTS =====

const chatArea = document.getElementById("chat-area");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-btn");

const suggestionButtons =
    document.querySelectorAll(".suggestion-btn");


// ==========================================
// ADD MESSAGE TO CHAT
// ==========================================

function addMessage(message, sender) {

    const messageElement =
        document.createElement("div");

    messageElement.classList.add(
        "chat-message"
    );


    if (sender === "user") {

        messageElement.classList.add(
            "user-message"
        );

        messageElement.innerHTML = `

            <div class="message-content">

                <strong>
                    You
                </strong>

                <p>
                    ${message}
                </p>

            </div>

        `;

    } else {

        messageElement.classList.add(
            "tutor-message"
        );

        messageElement.innerHTML = `

            <div class="message-avatar">
                🤖
            </div>

            <div class="message-content">

                <strong>
                    AI Tutor
                </strong>

                <p>
                    ${message}
                </p>

            </div>

        `;

    }


    chatArea.appendChild(messageElement);


    // Scroll to newest message

    chatArea.scrollTop =
        chatArea.scrollHeight;
}



// ==========================================
// SHOW TYPING INDICATOR
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
                AI Tutor
            </strong>

            <p>
                Thinking...
            </p>

        </div>

    `;


    chatArea.appendChild(typingElement);


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
// TEMPORARY TUTOR RESPONSE
// ==========================================

function getTutorResponse(question) {

    const text =
        question.toLowerCase();


    if (text.includes("pharmacokinetic")) {

        return `
            Pharmacokinetics describes what the body
            does to a medicine. It is commonly explained
            using ADME: absorption, distribution,
            metabolism and excretion.
        `;

    }


    if (text.includes("hypertension")) {

        return `
            Hypertension is persistently elevated blood
            pressure. Understanding it involves looking
            at blood pressure measurements, risk factors,
            complications and appropriate clinical
            management.
        `;

    }


    if (
        text.includes("dehydration")
    ) {

        return `
            Common features of dehydration can include
            thirst, dry mouth, reduced urine output,
            dizziness and weakness. Severity and the
            underlying cause need to be assessed clinically.
        `;

    }


    if (
        text.includes("antibiotic")
    ) {

        return `
            Antibiotics are medicines used to treat
            susceptible bacterial infections. They do not
            treat viral infections such as most common
            colds and influenza.
        `;

    }


    return `
        That's a good healthcare learning question.

        I'm currently running in demonstration mode.
        The full AI Tutor will later connect to an AI
        model that can provide a more detailed educational
        explanation.

        Try asking about pharmacology, anatomy,
        physiology, medicines or clinical concepts.
    `;

}



// ==========================================
// HANDLE QUESTION
// ==========================================

function handleQuestion(question) {

    const cleanedQuestion =
        question.trim();


    if (!cleanedQuestion) {

        return;

    }


    // Add user's message

    addMessage(
        cleanedQuestion,
        "user"
    );


    // Clear input

    chatInput.value = "";


    // Disable send button

    sendButton.disabled = true;


    // Show thinking state

    showTypingIndicator();


    // Simulate tutor thinking

    setTimeout(() => {

        removeTypingIndicator();


        const response =
            getTutorResponse(
                cleanedQuestion
            );


        addMessage(
            response,
            "tutor"
        );


        sendButton.disabled = false;

        chatInput.focus();

    }, 900);

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
// SUGGESTION BUTTONS
// ==========================================

suggestionButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const question =
                button.textContent.trim();


            chatInput.value =
                question;


            handleQuestion(question);

        }
    );

});



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