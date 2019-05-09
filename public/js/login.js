$(document).ready(function () {
    // // log in 
    var inputEmail = $("#inputEmail");
    var inputPassword = $("#inputPassword");
    var loginForm = $("#loginForm");

    $(loginForm).on("submit", userLogin);

    function userLogin(event) {
        event.defaultDefault();
        var user = {
            email: inputEmail.val().trim(),
            password: inputPassword.val().trim(),
        }
        confirmUser(user);
    }
    function confirmUser(user) {
        $.get("/api/user/" + user.email, function () {
            if (user.email == User.email && user.password == User.password) {
                alert("You are logged in");
                window.location.href = "/dashboard";
            } else {
                alert("Wrong password or email");
            }
        })
    }
});