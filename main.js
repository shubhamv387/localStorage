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
    setTimeout(() => msg.remove(), 3000);
  } else {
    // console.log(`Name: ${nameInput.value}`);
    // console.log(`Email: ${emailInput.value}`);
    var userObj = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };

    let users = document.querySelector("#users");
    //create new li item
    let user = document.createElement("li");
    user.className = "user";

    user.appendChild(
      document.createTextNode(
        `Name: ${userObj.name}, Phone: ${userObj.phone}, Email: `
      )
    );

    //create span tag for email
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(userObj.email));
    // console.log(span);

    user.appendChild(span);

    //creare detete btn
    delBtn = document.createElement("button");
    delBtn.className = "delBtn";
    delBtn.appendChild(document.createTextNode("DELETE"));

    user.appendChild(delBtn);

    // console.log(user);

    users.appendChild(user);

    let userDetailsJSON = JSON.stringify(userObj);
    localStorage.setItem(userObj.email, userDetailsJSON);

    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
  }
});

//remove user details from browser list and localStorage.
users.addEventListener("click", (e) => {
  if (e.target.classList.contains("delBtn")) {
    localStorage.removeItem(e.target.previousSibling.textContent);
    users.removeChild(e.target.parentElement);
  }
});

/* document.getElementById("printBtn").addEventListener("click", () => {
  if (localStorage.length == 0) console.log("Add your first user now!");
  else {
    let noUserDetails = true;
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) == "userDetails") {
        noUserDetails = false;
        let showDetails = JSON.parse(localStorage.getItem("userDetails"));
        //console.log(showDetails);
        for (let i = 0; i < showDetails.length; i++) {
          console.log(
            "NAME:",
            showDetails[i].name + ", " + "E-MAIL:",
            showDetails[i].email
          );
        }
        console.log("\n");
        break;
      }
    }
    if (noUserDetails) console.log("Add your first user now!");
  }
}); */
