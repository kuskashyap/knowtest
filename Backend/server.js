const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "KnowTest backend is running!"
    });
});

// AI Summarizer using Ollama
app.post("/api/summarize", async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                error: "Please provide some text."
            });
        }

        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3.2:3b",
                prompt: `Summarize the following text clearly and concisely:

${text}`,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`Ollama returned status ${response.status}`);
        }

        const data = await response.json();

        res.json({
            summary: data.response
        });

    } catch (error) {
        console.error("Ollama API error:", error);

        res.status(500).json({
            error: "Failed to generate summary."
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`KnowTest backend running at http://localhost:${PORT}`);
});