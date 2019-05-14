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
    
    $.post("/api/challenge", goal, (data) => {
      console.log(`${data} posted to server`)
      window.location = data.redirect
    })
  }

  function isValid(data) {
    var valid = true
    var dataValues = Object.values(data)
    for(var i = 0; i < dataValues.length; i++){
      if (dataValues[i] === ""){
        valid = false
      }
    }
    return valid
  };
  
  function uploadPhoto(event) {
    event.preventDefault()
    var photo = document.getElementById('stake').files[0]
    var fileName = uuidv4()
    var stakeStorage = defaultStorage.ref(fileName)
    stakeStorage.put(photo).then(function(){
      defaultStorage.ref().child(fileName).getDownloadURL().then(function (url){
        newGoal(url)
      })
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
