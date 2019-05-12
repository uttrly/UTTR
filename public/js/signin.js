$(document).ready(function () {

  // sign up 
  var inputUsername = $("#inputUsername");
  var inputEmail = $("#inputEmail");
  var inputPassword = $("#inputPassword");
  // var inputPhoneNumber = $("#inputPhoneNumber");
  var inputConfirmPassword = $("#inputConfirmPassword");
  var signupForm = $("#signupForm");

  $(signupForm).on("submit", newUserSubmit);

  function newUserSubmit(event) {
    event.preventDefault();
    var newUser = {
      username: inputUsername.val().trim(),
      email: inputEmail.val().trim(),
      password: inputPassword.val().trim(),
      // phoneNumber: inputPhoneNumber.val().trim(),
    }

    if (newUser.password != inputConfirmPassword.val().trim()) {
      alert("Password doesn't match");
    } else {
      submitUser(newUser);
    }
  }
  function submitUser(user) {
    $.post("/api/user", user, function () {
      alert(user.username + ", your account has been created")
      window.location.href = "/login";
    });
  }
});
