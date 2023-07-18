const form = document.getElementById("my-form");
// console.log(localStorage.length);
// console.log(JSON.parse(localStorage.getItem("userDetails")));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) == "userDetails") {
        var userDetails = JSON.parse(localStorage.getItem("userDetails"));
        //console.log(userDetails);
        break;
      } else var userDetails = [];
    }
  } else var userDetails = [];

  const msg = document.querySelector(".msg");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

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
    };

    userDetails.push(userObj);

    let userDetailsJSON = JSON.stringify(userDetails);

    // console.log(userDetails);

    localStorage.setItem("userDetails", userDetailsJSON);
    // localStorage.setItem("email", userDetails);

    nameInput.value = "";
    emailInput.value = "";
  }
});

document.getElementById("printBtn").addEventListener("click", () => {
  if (localStorage.length == 0) console.log("Add your first user now!");
  else {
    let noUserDetails = true;
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i) == "userDetails") {
        noUserDetails = false;
        let showDetails = JSON.parse(localStorage.getItem("userDetails"));
        console.log(showDetails);
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
});
