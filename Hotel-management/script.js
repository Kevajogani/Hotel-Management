// Open modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

// Close modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Switch between login and signup modals
function switchModal(currentModalId, targetModalId) {
  closeModal(currentModalId);
  openModal(targetModalId);
}

// Show login modal on page load
window.onload = function () {
  openModal('loginModal');
  displayUsers(); // Display users on page load
};

// Signup function
function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
  }

  // Retrieve existing users from local storage or initialize empty array
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  // Check if the email already exists
  const emailExists = users.some(user => user.email === email);
  if (emailExists) {
      alert("Email already exists. Please use a different email.");
      return;
  }

  // Store user data in a structured format
  users.push({ email: email, password: password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! Please log in.");
  switchModal("signupModal", "loginModal");

  // Add the new user to the table
  displayUsers();
}

// Login function
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Retrieve users from local storage
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  // Check for user with matching email and password
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
      alert("Login successful! Redirecting...");
      window.location.href = "index.html"; // Change this to your desired landing page
  } else {
      alert("Invalid email or password. Please try again.");
  }
}

// Function to display users in the table
function displayUsers() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const tableBody = document.getElementById("usersTable").querySelector("tbody");
  tableBody.innerHTML = ""; // Clear the table body

  users.forEach((user, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td><button onclick="deleteUser(${index})">Delete</button></td>
      `;
      tableBody.appendChild(row);
  });
}

// Function to delete a user
function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  users.splice(index, 1); // Remove the user from the array
  localStorage.setItem("users", JSON.stringify(users)); // Update local storage
  displayUsers(); // Refresh the table
}
