// NOTIFICATION 
function showNotification(msg){

let box = document.getElementById("notification");

if(!box){
box = document.createElement("div");
box.id = "notification";
document.body.appendChild(box);
}

box.innerText = msg;
box.style.display = "block";

setTimeout(function(){
box.style.display = "none";
},2500);
}

// AUTH CHECK 
function checkAuth(){

let user = JSON.parse(localStorage.getItem("loggedInUser"));

let protectedPages = ["post.html","resources.html","dashboard.html"];

let currentPage = window.location.pathname.split("/").pop();

if(protectedPages.indexOf(currentPage) !== -1 && !user){

showNotification("Please login first");

setTimeout(function(){
window.location = "login.html";
},1500);

}

}
checkAuth();

// SIGNUP 
const signup = document.getElementById("signupForm");

if(signup){

signup.addEventListener("submit", function(e){

e.preventDefault();

let name = document.getElementById("userName").value;
let email = document.getElementById("userEmail").value;
let pass = document.getElementById("userPass").value;

if(name==="" || email==="" || pass===""){
showNotification("All fields required");
return;
}

let user = {name:name, email:email, pass:pass};

localStorage.setItem("user", JSON.stringify(user));

showNotification("Signup successful! Login now");

setTimeout(function(){
window.location = "login.html";
},1500);

});

}

// LOGIN 
const login = document.getElementById("loginForm");

if(login){

login.addEventListener("submit", function(e){

e.preventDefault();

let email = document.getElementById("loginEmail").value;
let pass = document.getElementById("loginPass").value;

let user = JSON.parse(localStorage.getItem("user"));

if(!user){
showNotification("Not signed up. Please signup");
return;
}

if(user.email !== email || user.pass !== pass){
showNotification("Invalid email or password");
return;
}

localStorage.setItem("loggedInUser", JSON.stringify(user));

showNotification("Login successful");

setTimeout(function(){
window.location = "dashboard.html";
},1500);

});

}

// LOGOUT 
const logout = document.getElementById("logoutBtn");

if(logout){

logout.onclick = function(){

localStorage.removeItem("loggedInUser");

showNotification("Logged out");

setTimeout(function(){
window.location = "login.html";
},1000);

};

}


// CLEAR RESOURCES
function clears(){
    if(confirm("Are you sure you want to clear all resources?")){
        resources = [];
        saveResources(resources);
        displayResources();
        showNotification("All resources cleared");
    }
}

// RESOURCE STORAGE 
function getResources(){
return JSON.parse(localStorage.getItem("resources")) || [];
}

function saveResources(data){
localStorage.setItem("resources", JSON.stringify(data));
}

let resources = getResources();


// ADD RESOURCE 
const form = document.getElementById("resourceForm");

if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

let user = JSON.parse(localStorage.getItem("loggedInUser"));

if(!user){
showNotification("Login required");
return;
}

let name = document.getElementById("name").value;
let category = document.getElementById("category").value;
let rating = document.getElementById("rating").value;

let resource = {
name:name,
category:category,
owner:user.name,
contact:user.email,
rating:rating
};

resources.push(resource);

saveResources(resources);

showNotification("Resource added");

form.reset();

});

}

// DISPLAY TABLE 
const table = document.getElementById("resourceTable");

if(table){

for(let i=0; i<resources.length; i++){

let r = resources[i];

let row = document.createElement("tr");

row.innerHTML =
"<td>"+r.name+"</td>"+
"<td>"+r.category+"</td>"+
"<td>"+r.owner+"</td>"+
"<td>"+r.contact+"</td>"+
"<td>"+r.rating+"</td>";

table.appendChild(row);

}

}

// CLEAR RESOURCES
function clears(){
    if(confirm("Are you sure you want to clear all resources?")){
        resources = [];
        saveResources(resources);
        displayResources();
        showNotification("All resources cleared");
    }
}


//  SEARCH 
const search = document.getElementById("search");

if(search){

search.addEventListener("input", function(){

let value = search.value.toLowerCase();

let filtered = [];

for(let i=0; i<resources.length; i++){

let r = resources[i];

if(r.name.toLowerCase().indexOf(value) !== -1 ||
   r.category.toLowerCase().indexOf(value) !== -1){

filtered.push(r);

}

}

table.innerHTML = "";

for(let j=0; j<filtered.length; j++){

let r2 = filtered[j];

let row2 = document.createElement("tr");

row2.innerHTML =
"<td>"+r2.name+"</td>"+
"<td>"+r2.category+"</td>"+
"<td>"+r2.owner+"</td>"+
"<td>"+r2.contact+"</td>"+
"<td>"+r2.rating+"</td>";

table.appendChild(row2);

}

});

}

// DASHBOARD 
const total = document.getElementById("totalResources");

if(total){
total.innerText = resources.length;
}

// WEATHER API 
function loadWeather(){

fetch("https://api.open-meteo.com/v1/forecast?latitude=17.385&longitude=78.4867&current_weather=true")
.then(function(res){
return res.json();
})
.then(function(data){

let temp = data.current_weather.temperature;

document.getElementById("weatherBox").innerText = temp + " °C";

})
.catch(function(){
showNotification("Weather load failed");
});

}

if(document.getElementById("weatherBox")){
loadWeather();
}

// THEME TOGGLE 
const toggle = document.getElementById("themeToggle");

if(toggle){

toggle.onclick = function(){
document.body.classList.toggle("dark");
};

}
