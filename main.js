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

    // Checking for the duplicate email Address
    axios
      .get(
        "https://crudcrud.com/api/4deddbadc51d4c628a50649a9b5715d8/appointmentDatas"
      )
      .then((response) => {
        if (!isEmailAlreadyExists(response, userObj)) {
          axios
            .post(
              "https://crudcrud.com/api/4deddbadc51d4c628a50649a9b5715d8/appointmentDatas",
              userObj
            )
            .then((response) => {
              showUserOnScreen(response.data);
              console.log(response.data);

              nameInput.value = "";
              emailInput.value = "";
              phoneInput.value = "";
            })
            .catch((err) => console.log(err.message));
          // localStorage.setItem(userObj.email, userObjJSON);
        }
      })
      .catch((err) => console.log(err));
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
    "<br> <span>Id: </span>" +
    userObj._id +
    "<br>";

  //creare edit btn
  let editBtn = document.createElement("button");
  editBtn.className = "editBtn";
  editBtn.appendChild(document.createTextNode("EDIT"));

  user.appendChild(editBtn);

  //creare detete btn
  let delBtn = document.createElement("button");
  delBtn.className = "delBtn";
  delBtn.appendChild(document.createTextNode("DELETE"));

  user.appendChild(delBtn);
  users.appendChild(user);

  //edit / update user details function.
  editBtn.addEventListener("click", () => {
    console.log(userObj);
    // changing the original display styles of both btns
    document.getElementById("submitbtn").style.display = "none";
    document.getElementById("updatebtn").style.display = "block";

    let updateName = document.getElementById("name");
    let updateEmail = document.getElementById("email");
    let updatePhone = document.getElementById("phone");
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
          `https://crudcrud.com/api/4deddbadc51d4c628a50649a9b5715d8/appointmentDatas/${userObj._id}`,
          newUserObj
        )
        .then((response) => {
          users.removeChild(user);
          axios
            .get(
              "https://crudcrud.com/api/4deddbadc51d4c628a50649a9b5715d8/appointmentDatas"
            )
            .then((response) => {
              for (let i = 0; i < response.data.length; i++) {
                // console.log(response.data[i]);
                if (response.data[i]._id === userObj._id) {
                  showUserOnScreen(response.data[i]);
                  break;
                }
              }
            })
            .catch((err) => console.log(err.message));
          // showUserOnScreen(newUserObj);
          updateName.value = "";
          updateEmail.value = "";
          updatePhone.value = "";

          // changing back to the original display styles of both btns
          document.getElementById("submitbtn").style.display = "block";
          document.getElementById("updatebtn").style.display = "none";
          console.log(newUserObj);
          console.log(response);
        })
        .catch((err) => console.log(err.message));
    });
  });

  //remove user details from browser list and localStorage.
  delBtn.addEventListener("click", () => {
    // localStorage.removeItem(userObj.email);
    axios
      .delete(
        `https://crudcrud.com/api/4deddbadc51d4c628a50649a9b5715d8/appointmentDatas/${userObj._id}`
      )
      .then((response) => {
        console.log(response);
        users.removeChild(user);
      })
      .catch((err) => console.log(err.message));
  });
}

// Show the user details previously saved
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/4deddbadc51d4c628a50649a9b5715d8/appointmentDatas"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        // console.log(response.data[i]);
        showUserOnScreen(response.data[i]);
      }
    })
    .catch((err) => console.log(err.message));
});

// Check email fumction while adding new user data
function isEmailAlreadyExists(response, userObj) {
  let isEmailExists = false;
  const msg = document.querySelector(".msg");

  for (let i = 0; i < response.data.length; i++) {
    if (response.data[i].email === userObj.email) {
      isEmailExists = true;
      msg.classList.add("error");
      msg.innerHTML = "Email already exists";
      document.getElementById("email").focus();

      // Remove error after 3 seconds
      setTimeout(() => {
        msg.classList.remove("error");
        msg.innerHTML = "";
      }, 3000);

      break;
    }
  }
  // console.log(isEmailExists);
  return isEmailExists;
}
