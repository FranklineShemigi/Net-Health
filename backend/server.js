// ==========================================
// NET-HEALTH AI BACKEND
// ACESO + OPENROUTER
// ==========================================

const express = require("express");
const cors = require("cors");
require("dotenv").config();




// ==========================================
// CREATE SERVER
// ==========================================

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());


// ==========================================
// OPENROUTER CONFIG


const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.json({

        message:
            "Net-Health AI backend is running",

        assistant:
            "Aceso"

    });

});


// ==========================================
// AI CHAT ROUTE
// ==========================================

app.post("/api/ai/chat", async (req, res) => {

    const { message } = req.body;


    // ======================================
    // VALIDATE MESSAGE
    // ======================================

    if (!message || !message.trim()) {

        return res.status(400).json({

            error:
                "Message is required"

        });

    }


    if (!OPENROUTER_API_KEY) {

        console.error(
            "Missing OPENROUTER_API_KEY in backend/.env"
        );

        return res.status(500).json({

            error:
                "Aceso is not configured with an API key yet."

        });

    }


    try {

        // ==================================
        // SEND QUESTION TO OPENROUTER
        // ==================================

        const openRouterResponse =
            await fetch("https://openrouter.ai/api/v1/chat/completions", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`
                },

                body: JSON.stringify({

                    model:
    "nvidia/nemotron-3-ultra-550b-a55b:free",

                    messages: [
    {
        role: "system",
        content: `
You are Aceso, the clinical learning assistant for Net-Health.

Your primary users are healthcare students, including medical,
nursing, pharmacy, and clinical officer students, as well as
healthcare professionals using the platform for learning.

Your job is to explain healthcare topics clearly, accurately,
and at an appropriate educational level.

RESPONSE STYLE:

1. Start with a clear, direct answer to the question.
2. Use short paragraphs.
3. Use Markdown headings when they improve organisation.
4. Use bullet points or numbered lists where appropriate.
5. Bold important medical terms.
6. Use tables only when they genuinely make information easier
   to compare. Do not create a table unnecessarily.
7. Give a simple example when it helps understanding.
8. For complex topics, explain from basic concepts toward
   more advanced concepts.
9. Do not repeat the question unnecessarily.
10. Avoid unnecessarily long answers.

LENGTH:

For a simple factual question, aim for approximately
150-300 words.

For a moderately complex question, aim for approximately
300-500 words.

Only give a substantially longer explanation when the user
specifically asks for a detailed or comprehensive explanation.

CLINICAL SAFETY:

You are an educational assistant, not a replacement for a
qualified healthcare professional.

Do not diagnose a real patient or make patient-specific
treatment decisions.

When discussing medicines, explain their uses, mechanisms,
common adverse effects, contraindications, interactions, and
important precautions when relevant.

For patient-specific dosing or treatment questions, explain
the relevant clinical principles and advise consultation of
current authoritative clinical references and a qualified
healthcare professional.

TEACHING APPROACH:

When appropriate, structure explanations as:

Definition
How it works
Key points
Clinical relevance
Example
Key takeaway

Do not force this structure when it does not suit the question.

Always prioritise clarity, accuracy, and usefulness over
length.
        `
    },
    {
        role: "user",
        content: message
    }
]

                })

            });


        const data = await openRouterResponse.json();


        if (!openRouterResponse.ok) {

            console.error(
                "OpenRouter API error:",
                data
            );

            return res.status(500).json({

                error:
                    "Aceso could not generate a response."

            });

        }


        // ==================================
        // RETURN AI RESPONSE
        // ==================================

        res.json({

            reply:
                data.choices?.[0]?.message?.content || "Sorry, I didn't get a response. Try asking again."

        });

    }


    catch (error) {

        console.error(
            "OpenRouter request failed:",
            error
        );


        res.status(500).json({

            error:
                "Aceso could not generate a response."

        });

    }

});


// ==========================================
// START SERVER
// ==========================================

const PORT =
    process.env.PORT || 3000;


app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Net-Health AI backend running on port ${PORT}`
        );

    }
);
