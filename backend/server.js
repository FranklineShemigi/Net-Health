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
//
// NOTE: server.js was written for Google's
// Gemini SDK, but the only key ever put in
// .env is OPENROUTER_API_KEY. That mismatch
// (Gemini client with no key) is why every
// chat request was failing. Using OpenRouter
// directly instead, since that's the key we
// actually have, and it has free models.
//
// Free model lineups on OpenRouter rotate.
// If OPENROUTER_MODEL below ever starts
// erroring, check openrouter.ai/models
// (filter: Free) for a current replacement.
// ==========================================

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
                            content: "You are Aceso, the Net-Health clinical learning assistant. Help healthcare students and professionals with medicines, anatomy, physiology, pharmacology, and clinical concepts. You provide educational information, not diagnoses or treatment decisions for real patients."
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
