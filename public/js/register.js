const myForm = document.getElementById("my-form");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const passEl = document.getElementById("password");
const errorEl = document.getElementById("error");

const token = Cookies.get("token");

if (token) {
  window.location.href = "/";
}

const registerUser = async (name, email, password) => {
  const res = await fetch("/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return await res.json();
};

myForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameEl.value;
  const email = emailEl.value;
  const password = passEl.value;
  if (name === "" && email === "" && password === "") {
    errorEl.textContent = "Please enter email & password.";
    return;
  }
  if (name === "") {
    errorEl.textContent = "Please enter your name.";
    return;
  }
  if (email === "") {
    errorEl.textContent = "Please enter a email address.";
    return;
  }
  if (password === "") {
    errorEl.textContent = "Please enter a password.";
    return;
  }
  errorEl.textContent = "";

  const res = await registerUser(name, email, password);
  if (!res.status) {
    errorEl.textContent = res.msg;
    return;
  }
  Cookies.set("token", JSON.stringify(res.token));
  window.location.href = "/";
});
