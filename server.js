const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Stream Cors!");
});

app.get("/stream", async (req, res) => {
  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const mockResponses = [
    { id: 1, role: "assistant", message: "<h1>Hello! </h1>" },
    { id: 2, role: "assistant", message: "<p>How can I assist " },
    { id: 3, role: "assistant", message: "you today? " },
    { id: 4, role: "assistant", message: "<strong>I am a chatbot 😎</strong>" },
    { id: 5, role: "assistant", message: "simulating responses.</p>" },
    {
      id: 6,
      role: "assistant",
      message: "<a href='google.com'>More details</a>",
    },
  ];

  let index = 0;
  const interval = setInterval(() => {
    if (index < mockResponses.length) {
      res.write(`data: ${JSON.stringify(mockResponses[index])}\n\n`);
      index++;
    } else {
      res.write(
        `data: ${JSON.stringify({
          id: "done",
          role: "system",
          message: "[DONE]",
        })}\n\n`
      );
      clearInterval(interval);
      res.end();
    }
  }, 500); // Simulate a delay for a real-time effect

  // Clean up on client disconnect
  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Sandbox listening on port ${port}`);
});
