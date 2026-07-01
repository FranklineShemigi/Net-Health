let greeting = document.getElementById("greeting");

let hour = new Date().getHours();

if (hour < 12) {

    greeting.textContent = "🌅 Good Morning";

} else if (hour < 18) {

    greeting.textContent = "☀️ Good Afternoon";

} else {

    greeting.textContent = "🌙 Good Evening";

}

let drugLibrary = document.getElementById("drugLibrary");

drugLibrary.onclick = function(){

    window.location.href = "drug-library.html";

};