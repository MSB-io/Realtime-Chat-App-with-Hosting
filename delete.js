function deleteMessage(messageId) {
  if (!window.messages) {
    window.messages = [];
  }
  window.messages = window.messages.filter((msg) => msg.id !== messageId);
}
