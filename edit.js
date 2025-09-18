function updateMessage(messageId, newContent) {
  if (!window.messages) {
    window.messages = [];
  }
  window.messages = window.messages.map((msg) =>
    msg.id === messageId ? { ...msg, content: newContent } : msg
  );
}
