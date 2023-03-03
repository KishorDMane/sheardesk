// Get the login form element
const loginForm = document.getElementById('login-form');

function validateForm() {
  // Get the email and password from the form input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Check if the email and password fields are empty
  if (email === '' || password === '') {
    alert('Please enter your email and password.');
    return false; // Prevent the form from submitting
  }

  // Return true to allow the form to submit
  return true;
}



// Add event listener for form submission
loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting

  // Get the email and password from the form input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Make a POST request to the login API endpoint
  fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    // If the login was successful, save the JWT token in local storage
    if (data.token) {
      localStorage.setItem('token', data.token);
      // Redirect to the dashboard page or perform other actions on successful login
      parent.window.location.href = './index.html';
      console.log("login succesfull")
    } else {
      alert('Invalid email or password.'); // Show an error message if login failed
    }
  })
  .catch(error => console.error(error)); // Log any errors to the console
});
 