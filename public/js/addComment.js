$(document).ready(function () {

    console.log("testing----");

    $("#commentForm").on("submit", addComment);

    function addComment(event) {
        var goalId = $(location).attr("href").match(/([^\/]*)\/*$/)[1];

        event.preventDefault();
        var newComment = {
            GoalId: goalId,
            text: $("#comment").val().trim(),
            username: $("#author").val().trim(),
        }

        console.log(newComment);

        submitComment(newComment);

        $("#comment").val("");
        $("#author").val("");
    }

    function submitComment(comment) {
        $.post("/api/comment", comment, (data) => {
            console.log(`${data} Posted to server`);
            window.location = data.redirect
        });
    }
});