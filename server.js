const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Stream Fuck!");
});

app.get("/stream", async (req, res) => {
  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send a message every 2 seconds

  /* const intervalId = setInterval(() => {
    const data = JSON.stringify({ message: `Server time: ${new Date().toLocaleTimeString()}` });
    res.write(`data: ${data}\n\n`); // SSE format: "data: <content>\n\n"
  }, 2000);
 */

  const mockResponse = [
    "Hello! ",
    "How can I assist ",
    "you today? ",
    "I am a chatbot ",
    "simulating responses.",
  ];
  let index = 0;
  const interval = setInterval(() => {
    if (index < mockResponse.length) {
      res.write(`data: ${mockResponse[index]}\n\n`);
      index++;
    } else {
      res.write("data: [DONE]\n\n");
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
