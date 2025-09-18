export function getMsg() {
  const chatContainer = document.getElementById("chat");

  firebase
    .firestore()
    .collection("jh-Chat")
    .orderBy("timestamp", "asc") // It's good practice to order messages
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const doc = change.doc;
        const messageData = doc.data();

        if (change.type === "added") {
          const messageContainer = document.createElement("div");
          messageContainer.id = `message-${doc.id}`;
          messageContainer.classList.add("message-container");

          let content = "";
          if (messageData.message) {
            content += `<p class="message-text">message : ${messageData.message}</p>`;
          }

          if (messageData.mediaUrl) {
            const type = messageData.mediaType;
            if (type === "image") {
              content += `<img src="${messageData.mediaUrl}" style="max-width: 200px; display: block;">`;
            } else if (type === "video") {
              content += `<video src="${messageData.mediaUrl}" controls style="max-width: 200px; display: block;"></video>`;
            } else {
              content += `<a href="${messageData.mediaUrl}" target="_blank">Download File</a>`;
            }
          }

          messageContainer.innerHTML = content;

          const editButton = document.createElement("button");
          editButton.innerText = "Edit";
          editButton.addEventListener("click", async () => {
            const currentMsg = doc.data().message || "";
            const newMsg = prompt("Edit your message:", currentMsg);
            if (newMsg !== null && newMsg.trim() !== "") {
              try {
                await firebase
                  .firestore()
                  .collection("jh-Chat")
                  .doc(doc.id)
                  .update({ message: newMsg });
              } catch (e) {
                alert("Error updating message: " + e);
              }
            }
          });

          const deleteButton = document.createElement("button");
          deleteButton.innerText = "Delete";
          deleteButton.addEventListener("click", async () => {
            try {
              await firebase
                .firestore()
                .collection("jh-Chat")
                .doc(doc.id)
                .delete();
            } catch (e) {
              alert("Error deleting message: " + e);
            }
          });

          messageContainer.appendChild(editButton);
          messageContainer.appendChild(deleteButton);
          chatContainer.appendChild(messageContainer);
        } else if (change.type === "modified") {
          const messageContainer = document.getElementById(`message-${doc.id}`);
          if (messageContainer) {
            const pTag = messageContainer.querySelector(".message-text");
            if (pTag && messageData.message) {
              pTag.innerText = `message : ${messageData.message}`;
            }
          }
        } else if (change.type === "removed") {
          const messageContainer = document.getElementById(`message-${doc.id}`);
          if (messageContainer) {
            messageContainer.remove();
          }
        }
      });
    });
}
