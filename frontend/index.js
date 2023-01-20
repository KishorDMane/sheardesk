const { ipcRenderer } = require("electron");

window.onload = function () {
  ipcRenderer.on("uuid", (event, data) => {
    document.getElementById("code").innerHTML = data;
  });
};

document.getElementById("start-capture").addEventListener("click", () => {
  ipcRenderer.send("start-capture");
  document.getElementById("start-capture").style.display = "none";
  document.getElementById("stop-capture").style.display = "block";
});
document.getElementById("stop-capture").addEventListener("click", () => {
  ipcRenderer.send("stop-capture");
  document.getElementById("stop-capture").style.display = "none";
  document.getElementById("start-capture").style.display = "block";
});
