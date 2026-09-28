async function summarizeText() {
    const text = document.getElementById("textInput").value;
    const summary = document.getElementById("summary");

    if (text.trim() === "") {
        summary.textContent = "Please enter some text first.";
        return;
    }

    summary.textContent = "Generating AI summary...";

    try {
        const response = await fetch("http://localhost:3000/api/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to generate summary.");
        }

        summary.textContent = data.summary;

    } catch (error) {
        console.error("Error:", error);

        summary.textContent =
            "Unable to connect to the AI backend. Make sure the backend is running.";
    }
}
