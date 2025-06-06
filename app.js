
const auth = firebase.auth();
const db = firebase.database();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("login-container").style.display = "none";
      document.getElementById("chat-container").style.display = "block";
    })
    .catch(error => {
      alert("Erè: " + error.message);
    });
}

const channelSelect = document.getElementById("channel-select");
const messagesDiv = document.getElementById("messages");

channelSelect.addEventListener("change", loadMessages);

function loadMessages() {
  messagesDiv.innerHTML = "";
  const channel = channelSelect.value;
  db.ref("channels/" + channel).on("child_added", snapshot => {
    const msg = snapshot.val();
    const div = document.createElement("div");
    div.textContent = msg.user + ": " + msg.text;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

function sendMessage() {
  const msgInput = document.getElementById("messageInput");
  const channel = channelSelect.value;
  const msg = {
    user: auth.currentUser.email,
    text: msgInput.value
  };
  db.ref("channels/" + channel).push(msg);
  msgInput.value = "";
}
