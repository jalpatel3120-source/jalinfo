const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");


// =====================================
// SUPABASE CONNECTION
// =====================================

const SUPABASE_URL =
  "https://wwkbtvyagxannxxgwzob.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_0OdDJEHwjZfY3MLQuR8QZA_7gLUsONd";


const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// =====================================
// SWITCH LOGIN / SIGN UP
// =====================================

showSignup.addEventListener("click", () => {

  loginForm.classList.remove("active");
  signupForm.classList.add("active");

});


showLogin.addEventListener("click", () => {

  signupForm.classList.remove("active");
  loginForm.classList.add("active");

});


// =====================================
// SIGN UP
// =====================================

signupForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const name =
    document.getElementById("signupName").value.trim();

  const email =
    document.getElementById("signupEmail").value.trim();

  const password =
    document.getElementById("signupPassword").value;


  // Check fields
  if (!name || !email || !password) {

    alert("Please fill all fields.");

    return;
  }


  // Create account
  const { data, error } =
    await supabaseClient.auth.signUp({

      email: email,

      password: password,

      options: {

        data: {
          full_name: name
        }

      }

    });


  // Error
  if (error) {

    alert("Sign Up Error: " + error.message);

    return;
  }


  // Success
  alert("Account created successfully! 🎉");

  window.location.href = "welcome.html";

});


// =====================================
// LOGIN
// =====================================

loginForm.addEventListener("submit", async (event) => {

  event.preventDefault();


  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value;


  // Check fields
  if (!email || !password) {

    alert("Please enter email and password.");

    return;
  }


  // Login
  const { data, error } =
    await supabaseClient.auth.signInWithPassword({

      email: email,

      password: password

    });


  // Error
  if (error) {

    alert("Login Error: " + error.message);

    return;
  }


  // Success
  alert("Login successful! 🎉");

  window.location.href = "welcome.html";

});