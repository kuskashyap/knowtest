function summarizeText() {
    const text = document.getElementById("textInput").value;
    const summary = document.getElementById("summary");

    if (text.trim() === "") {
        summary.textContent = "Please enter some text first.";
        return;
    }

    const sentences = text
        .split(/[.!?]+/)
        .filter(sentence => sentence.trim() !== "");

    const shortSummary = sentences
        .slice(0, 2)
        .join(". ");

    summary.textContent =
        shortSummary + (shortSummary ? "." : "");
}