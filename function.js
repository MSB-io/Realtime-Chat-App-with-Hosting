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
          
          let chatContainer = document.getElementById("chat");
          chatContainer.appendChild(pTag);
          chatContainer.appendChild(editButton);
          chatContainer.appendChild(deleteButton);

        }
      });
    });
}
