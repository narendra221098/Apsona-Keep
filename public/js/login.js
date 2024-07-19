const myForm = document.getElementById("my-form");
const emailEl = document.getElementById("email");
const passEl = document.getElementById("password");
const errorEl = document.getElementById("error");

const token = Cookies.get("token");

if (token) {
  window.location.href = "/";
}

const getUserDetails = async (email, password) => {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
};

myForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailEl.value;
  const password = passEl.value;
  if (email === "" && password === "") {
    errorEl.textContent = "Please enter email & password.";
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

  const res = await getUserDetails(email, password);
  if (!res.status) {
    errorEl.textContent = res.msg;
    return;
  }
  Cookies.set("token", JSON.stringify(res.token));
  window.location.href = "/";
});
