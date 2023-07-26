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

    // let userObjJSON = JSON.stringify(userObj);

    axios
      .post(
        "https://crudcrud.com/api/c88fd311182a4a8b9d281bae0354dd5c/appointmentDatas",
        userObj
      )
      .then((response) => {
        showUserOnScreen(response.data);
        // console.log(response);
      })
      .catch((err) => console.log(err.message));
    // localStorage.setItem(userObj.email, userObjJSON);

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
  // users.appendChild(user);

  //edit / update user details function.
  editBtn.addEventListener("click", () => {
    // changing the original display styles of both btns
    document.getElementById("submitbtn").style.display = "none";
    document.getElementById("updatebtn").style.display = "block";

    const updateName = document.getElementById("name");
    const updateEmail = document.getElementById("email");
    const updatePhone = document.getElementById("phone");
    updateName.value = userObj.name;
    updateEmail.value = userObj.email;
    updatePhone.value = userObj.phone;
    updateName.focus();

    // localStorage.removeItem(userObj.email);
    document.getElementById("updatebtn").addEventListener("click", () => {
      let newUserObj = {
        name: updateName.value,
        email: updateEmail.value,
        phone: updatePhone.value,
      };
      axios
        .put(
          `https://crudcrud.com/api/c88fd311182a4a8b9d281bae0354dd5c/appointmentDatas/${userObj._id}`,
          newUserObj
        )
        .then((response) => {
          users.removeChild(user);
          showUserOnScreen(newUserObj);
          updateName.value = "";
          updateEmail.value = "";
          updatePhone.value = "";

          // changing back to the original display styles of both btns
          document.getElementById("submitbtn").style.display = "block";
          document.getElementById("updatebtn").style.display = "none";
          console.log(response);
        })
        .catch((err) => console.log(err.message));
    });
  });

  //creare detete btn
  let delBtn = document.createElement("button");
  delBtn.className = "delBtn";
  delBtn.appendChild(document.createTextNode("DELETE"));

  user.appendChild(delBtn);
  users.appendChild(user);

  //remove user details from browser list and localStorage.
  delBtn.addEventListener("click", () => {
    // localStorage.removeItem(userObj.email);
    axios
      .delete(
        `https://crudcrud.com/api/c88fd311182a4a8b9d281bae0354dd5c/appointmentDatas/${userObj._id}`
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message));

    users.removeChild(user);
  });
}

// Show the user details previously saved
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/c88fd311182a4a8b9d281bae0354dd5c/appointmentDatas"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        // console.log(response.data[i]);
        showUserOnScreen(response.data[i]);
      }
    })
    .catch((err) => console.log(err.message));
});
