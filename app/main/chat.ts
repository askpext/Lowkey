export async function sendPrompt(
  prompt: string,
  onToken: (t: string) => void
) {
  const res = await fetch("http://127.0.0.1:11435/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "qwen2.5-0.5b-instruct",
      messages: [{ role: "user", content: prompt }],
      stream: true
    })
  });

  if (!res.body) throw new Error("No response body");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      if (line === "data: [DONE]") return;

      try {
        const json = JSON.parse(line.slice(6));

        // ✅ QWEN + LLAMA SERVER SAFE
        const token =
          json.choices?.[0]?.delta?.content ??
          json.choices?.[0]?.message?.content;

        if (token) onToken(token);
      } catch {
        // ignore partial chunks
      }
    }
  }
}
