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
