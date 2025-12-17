const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");
const status = document.getElementById("status");

// Initial state
input.disabled = true;
sendBtn.disabled = true;
status.textContent = "Preparing local AI…";
status.classList.remove("hidden");

// Enable UI when backend is ready
window.api.onReady(() => {
  status.classList.add("hidden");
  input.disabled = false;
  sendBtn.disabled = false;
  input.focus();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // Show user message
  chat.textContent += "\n\n> " + text + "\n";
  chat.scrollTop = chat.scrollHeight;

  input.value = "";
  input.focus();

  window.api.sendMessage(text);
}

// ENTER to send, Shift+Enter = newline
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Button click
sendBtn.addEventListener("click", sendMessage);

// Stream tokens
window.api.onToken((token) => {
  chat.textContent += token;
  chat.scrollTop = chat.scrollHeight;
});
