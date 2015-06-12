//Reload button
var works = document.getElementById("button");
works.addEventListener("click", function() {
     sendAsyncMessage("reloadx");
     
}, false);

addMessageListener("pageready", function() {
    location.reload();
});

