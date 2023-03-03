

let ul=document.getElementById("login-signup")

async function logout(){
  localStorage.removeItem('token')
  location.reload()
}

async function  user(){
let token = localStorage.getItem("token");
let req = await fetch(`http://localhost:8000/getuserinfo`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

if (req.ok) {
  let data = await req.json();
  console.log(data);

  ul.innerHTML=null
  let userinfo=document.getElementById("userinfo")
  
  ul.innerHTML=`<li><a class="active" >${data.name}</a></li>
  <li onclick="logout()">Logout</li>
  `

} else {
  console.error('Server returned an error:', req.status);
}

}

window.onload = function() {
  user()
}
