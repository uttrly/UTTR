$(document).ready(function () {
  $("#goalForm").on("submit", uploadPhoto);

  function newGoal(stake) {
    event.preventDefault();
    
    var goal = {
      goalName: $("#title").val().trim(),
      description: $("#description").val().trim(),
      oneTime: $("input[name=goalType]:checked").val(),
      startDate: $("#startDate").val().trim(),
      refereeEmail: $("#refEmail").val().trim(),
      duration: $("#duration").val().trim(),
      stake: stake
    }

    var valid = isValid(goal)

    if (!valid) {
      return console.log("not valid input")
    }
    
    $.post("/api/challenge", goal, () => {
      console.log(`${goal} posted to server`)
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

  function uploadPhoto(event) {
    event.preventDefault()
    var photo = document.getElementById('stake').files[0]
    var fileName = uuidv4()

    var stakeStorage = defaultStorage.ref(fileName)
    stakeStorage.put(photo).then(function(){
      newGoal(fileName)
    })

  }

  //random keygen for file name
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
});
