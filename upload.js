async function uploadMedia(file) {
  if (!file) throw new Error("No file provided");
  // Initialize Firebase Storage
  const storageRef = firebase.storage().ref();
  // Create a unique file path
  const filePath = `chat_media/${Date.now()}_${file.name}`;
  const fileRef = storageRef.child(filePath);
  // Upload the file
  await fileRef.put(file);
  // Get the download URL
  const downloadURL = await fileRef.getDownloadURL();
  return downloadURL;
}
