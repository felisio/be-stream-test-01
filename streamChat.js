function streamChat(req, res) {
  const { prompt } = req.body;

  const h1 = prompt ? `<h1>Hello! ${prompt}</h1>` : "<h1>Hello!</h1>";

  // Set headers for SSE
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const mockResponses = [
    { id: 1, role: "assistant", message: h1 },
    { id: 2, role: "assistant", message: "<p>How can I assist " },
    { id: 3, role: "assistant", message: "you today? " },
    {
      id: 4,
      role: "assistant",
      message: "<strong> I am a chatbot 😎</strong>",
    },
    { id: 5, role: "assistant", message: "simulating responses. " },
    {
      id: 6,
      role: "assistant",
      message:
        "<a data-type-id='citation' href='https://app.klue.com/card/147640'>1</a> </p>",
      sources: [
        {
          title: "[1] Card Klue",
          url: "https://app.klue.com/card/147640",
        },
      ],
    },
  ];

  let index = 0;
  const interval = setInterval(() => {
    if (index < mockResponses.length) {
      res.write(`${JSON.stringify(mockResponses[index])}\n\n`);
      index++;
    } else {
      res.write(
        `${JSON.stringify({
          id: "done",
          role: "system",
          message: "[DONE]",
          sources: [
            {
              title: "[1] Card Klue",
              url: "https://app.klue.com/card/147640",
            },
          ],
        })}\n\n`
      );
      clearInterval(interval);
      res.end();
    }
  }, 500);

  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
}

module.exports = streamChat;
