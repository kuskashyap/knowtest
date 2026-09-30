const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "KnowTest backend is running!"
    });
});

app.post("/api/summarize", async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                error: "Please provide some text."
            });
        }

        const response = awaitfetch("https://knowtest-backend.onrender.com/api/summarize", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-20b",
                    messages: [
                        {
                            role: "user",
                            content: `Summarize the following text clearly and concisely:

${text}`
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Groq error:", data);

            return res.status(response.status).json({
                error: data.error?.message || "AI service error."
            });
        }

        const summary = data.choices?.[0]?.message?.content;

        res.json({
            summary: summary
        });

    } catch (error) {
        console.error("Server error:", error);

        res.status(500).json({
            error: "Failed to generate summary."
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`KnowTest backend running on port ${PORT}`);
});