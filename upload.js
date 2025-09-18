// upload.js
// This file handles media upload functionality for the chat application.

// Function to upload media (image/video) to Firebase Storage and return the download URL
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

// Example usage:
// const fileInput = document.getElementById('mediaInput');
// fileInput.addEventListener('change', async (e) => {
//   const file = e.target.files[0];
//   const url = await uploadMedia(file);
//   // Save the URL to Firestore or display in chat
// });

// Export for use in other scripts if using modules
// module.exports = { uploadMedia };
