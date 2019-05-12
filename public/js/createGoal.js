

$(document).ready(function () {

  $("#goalForm").on("submit", newGoal);

  function newGoal(event) {
    event.preventDefault();

    var newGoal = {
      goalName: $("#title").val().trim(),
      description: $("#description").val().trim(),
      oneTime: $("input[name=goalType]:checked").val(),
      startDate: $("#startDate").val().trim(),
      refereeEmail: $("#refEmail").val().trim(),
      duration: $("#duration").val().trim(),
    }

    var valid = isValid(newGoal)

    if (!valid) {
      return console.log("not valid input")
    }
    
    $.post("/api/challenge", newGoal, () => {
      console.log(`${newGoal} posted to server`)
    })
  }

  function isValid(data) {
    var valid = true
    for (var i = 0; i < data.length; i++) {
      if (data[i] === null || "undefined" || ""){
        valid = false
      }
    }

    return valid
  }

  function uploadPhoto() {
    let storageRef = firebase.storage().ref('photos/myPictureName')
    let fileUpload = document.getElementById("cameraInput")
  
    fileUpload.addEventListener('change', function(evt) {
        let firstFile = evt.target.files[0] // upload the first file only
        let uploadTask = storageRef.put(firstFile)
    })  
  }
});
