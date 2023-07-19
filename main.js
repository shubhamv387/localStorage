showOnReload();
const form = document.getElementById("my-form");
// console.log(localStorage);
// console.log(JSON.parse(localStorage.getItem("userDetails")));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = document.querySelector(".msg");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  if (nameInput.value === "" || emailInput.value === "") {
    // alert("Please enter all fields");
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields";

    // Remove error after 3 seconds
    setTimeout(() => {
      msg.classList.remove("error");
      msg.innerHTML = "";
    }, 3000);
  } else {
    // console.log(`Name: ${nameInput.value}`);
    // console.log(`Email: ${emailInput.value}`);
    let userObj = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };

    let userObjJSON = JSON.stringify(userObj);
    localStorage.setItem(userObj.email, userObjJSON);
    showUserOnScreen(userObj);

    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
  }
});

function showUserOnScreen(userObj) {
  let users = document.querySelector("#users");
  //create new li item
  let user = document.createElement("li");
  user.className = "user";

  user.innerHTML =
    "<span>Name: </span>" +
    userObj.name +
    "<br> <span>Email: </span>" +
    userObj.email +
    "<br> <span>Phone: </span>" +
    userObj.phone +
    "<br>";

  //creare edit btn
  let editBtn = document.createElement("button");
  editBtn.className = "editBtn";
  editBtn.appendChild(document.createTextNode("EDIT"));

  user.appendChild(editBtn);
  users.appendChild(user);

  //edit user details function.
  editBtn.addEventListener("click", () => {
    document.getElementById("name").value = userObj.name;
    document.getElementById("email").value = userObj.email;
    document.getElementById("phone").value = userObj.phone;
    document.getElementById("name").focus();
    localStorage.removeItem(userObj.email);
    users.removeChild(user);
  });

  //creare detete btn
  let delBtn = document.createElement("button");
  delBtn.className = "delBtn";
  delBtn.appendChild(document.createTextNode("DELETE"));

  user.appendChild(delBtn);
  users.appendChild(user);

  //remove user details from browser list and localStorage.
  delBtn.addEventListener("click", () => {
    localStorage.removeItem(userObj.email);
    users.removeChild(user);
  });
}

// Show the user details previously saved

function showOnReload() {
  for (let i = 0; i < localStorage.length; i++) {
    var showDetails = JSON.parse(localStorage.getItem(localStorage.key(i)));
    showUserOnScreen(showDetails);
  }
}
