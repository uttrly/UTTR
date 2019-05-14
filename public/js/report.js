$(document).ready(function () {
    // Capture the form inputs
    $("#submitSuccess").on("click", function (event) {
        event.preventDefault();
        console.log("hello")
        var success = $("input[name=success]:checked").val()
        //console.log(oneTime)

        var goalId = $(location).attr("href").match(/([^\/]*)\/*$/)[1];

        //console.log(pageURL)

        report = {
            success: parseInt(success),
            goalId: goalId
        }

        $.post("/api/report", report, (data) => {
            console.log(`${data} posted to server`)
            window.location = data.redirect
          })

          //$('.modal').modal('toggle');
    });
});