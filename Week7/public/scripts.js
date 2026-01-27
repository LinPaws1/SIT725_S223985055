const socket = io();

socket.on("users", (count) => {
  document.getElementById("users").innerText = count;
});

socket.on("time", (t) => {
  console.log("Server time:", t);
  document.getElementById("time").innerText = t;
});
