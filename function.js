export function getMsg() {
  firebase
    .firestore()
    .collection("jh-Chat")
    .onSnapshot((changes) => {
      changes.docChanges().forEach((changes) => {
        if (changes.type == "added") {

          let pTag = document.createElement("p");
          let mediaElem = null;
          let editButton = document.createElement("button");
          let deleteButton = document.createElement("button");

          // Show text message if present
          if (changes.doc.data().message) {
            pTag.innerText = `message : ${changes.doc.data().message}`;
          } else {
            pTag.innerText = '';
          }

          // Show media if present
          if (changes.doc.data().mediaUrl) {
            const type = changes.doc.data().mediaType;
            if (type === 'image') {
              mediaElem = document.createElement('img');
              mediaElem.src = changes.doc.data().mediaUrl;
              mediaElem.style.maxWidth = '200px';
              mediaElem.style.display = 'block';
            } else if (type === 'video') {
              mediaElem = document.createElement('video');
              mediaElem.src = changes.doc.data().mediaUrl;
              mediaElem.controls = true;
              mediaElem.style.maxWidth = '200px';
              mediaElem.style.display = 'block';
            } else {
              mediaElem = document.createElement('a');
              mediaElem.href = changes.doc.data().mediaUrl;
              mediaElem.innerText = 'Download File';
              mediaElem.target = '_blank';
            }
          }

          editButton.innerText = "Edit";
          deleteButton.innerText = "Delete";

          // Add event listener for delete
          deleteButton.addEventListener("click", async () => {
            const docId = changes.doc.id;
            try {
              await firebase
                .firestore()
                .collection("jh-Chat")
                .doc(docId)
                .delete();
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
                await firebase
                  .firestore()
                  .collection("jh-Chat")
                  .doc(docId)
                  .update({ message: newMsg });
                pTag.innerText = `message : ${newMsg}`;
              } catch (e) {
                alert("Error updating message: " + e);
              }
            }
          });

          let chatContainer = document.getElementById("chat");
          if (pTag.innerText) chatContainer.appendChild(pTag);
          if (mediaElem) chatContainer.appendChild(mediaElem);
          chatContainer.appendChild(editButton);
          chatContainer.appendChild(deleteButton);
        }
      });
    });
}
