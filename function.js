export function getMsg() {
  firebase
    .firestore()
    .collection("jh-Chat")
    .onSnapshot((changes) => {
      changes.docChanges().forEach((changes) => {
        if (changes.type == "added") {
          let pTag = document.createElement("p");
          let editButton = document.createElement("button");
          let deleteButton = document.createElement("button");

          pTag.innerText = `message : ${changes.doc.data().message}`;
          editButton.innerText = "Edit";
          deleteButton.innerText = "Delete";

          // Add event listener for delete
          deleteButton.addEventListener("click", async () => {
            const docId = changes.doc.id;
            try {
              await firebase.firestore().collection("jh-Chat").doc(docId).delete();
              pTag.remove();
              editButton.remove();
              deleteButton.remove();
            } catch (e) {
              alert("Error deleting message: " + e);
            }
          });

          // Add event listener for edit
          editButton.addEventListener("click", async () => {
            const docId = changes.doc.id;
            const currentMsg = changes.doc.data().message;
            const newMsg = prompt("Edit your message:", currentMsg);
            if (newMsg !== null && newMsg.trim() !== "") {
              try {
                await firebase.firestore().collection("jh-Chat").doc(docId).update({ message: newMsg });
                pTag.innerText = `message : ${newMsg}`;
              } catch (e) {
                alert("Error updating message: " + e);
              }
            }
          });

          let chatContainer = document.getElementById("chat");
          chatContainer.appendChild(pTag);
          chatContainer.appendChild(editButton);
          chatContainer.appendChild(deleteButton);

        }
      });
    });
}
