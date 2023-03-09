document.getElementById("sheared-screen").addEventListener("click",()=>{
    window.location.href="https://screen-shear-app.onrender.com/shearedscreen"
})



document.getElementById("winBtn").addEventListener("click",()=>{
    window.location.href="https://drive.google.com/u/0/uc?id=1CBvvs-eFa_Jgxm3oFllDMe_EhDCWYJ-v&export=download"
})


    // code to be executed when the page finishes loading
    console.log("Page has finished loading");
    let token = localStorage.getItem("token");
    if (token == undefined) {
        alert("Please Login")
        window.location.href = "./login.html"
    }

let ul = document.getElementById("login-signup");

async function logout() {
  let token = localStorage.getItem("token");
  localStorage.removeItem('token');
  try {
    let req = await fetch('https://screen-shear-app.onrender.com/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (req.ok) {
      let data = await req.json();
      location.reload();
    } else {
      throw new Error('Logout request failed');
    }
  } catch (error) {
    console.error(error);
  }
  location.reload();
}

async function user() {
  let token = localStorage.getItem("token");
  try {
    let req = await fetch(`https://screen-shear-app.onrender.com/getuserinfo`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (req.ok) {
      let data = await req.json();
      console.log(data);

      ul.innerHTML = null;
      let userinfo = document.getElementById("userinfo");

      ul.innerHTML = `<li><a class="active">${data.name}</a></li>
      <li onclick="logout()" style="cursor:pointer;">Logout</li>
      `;
    } else {
      throw new Error('Get user info request failed');
    }
  } catch (error) {
    console.error(error);
  }
}

window.onload = function() {
  user();
};
