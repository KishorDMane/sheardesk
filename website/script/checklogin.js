window.onload = function() {
    // code to be executed when the page finishes loading
    console.log("Page has finished loading");
let token=localStorage.getItem("token");
console.log(token)
if(token==undefined){
alert("Please Login")
window.location.href="./login.html"
}
}