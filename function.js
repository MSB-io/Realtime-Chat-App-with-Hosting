export function getMsg() {
  firebase
    .firestore()
    .collection("jh-Chat")
    .onSnapshot((changes) => {
      changes.docChanges().forEach((changes) => {
        if (changes.type == "added") {
          let pTag = document.createElement("p");
          pTag.innerText = `message : ${changes.doc.data().message}`;

          let chatContainer = document.getElementById("chat");
          chatContainer.appendChild(pTag);
        }
      });
    });
}
