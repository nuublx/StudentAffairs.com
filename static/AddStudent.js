function check() {
  let x = document.getElementById("lvl").value;
  if (x == "First Level" || x == "Second Level") {
    document.getElementById("dep").setAttribute("disabled", "disabled");
  }
  else {
    document.getElementById("dep").removeAttribute("disabled");
  }
}
function validate() {
  let s = document.getElementById("ID").value;
  if (s < 0) {
    document.getElementById('error').innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>ID is invalid</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    document.getElementById("ID").value = "";
    return false;
  }
  else return true;
}
function inputValidation() {
  var flag = true;
  var allowedChars = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var n = document.getElementById("Name").value;
  for (var i = 0; i < n.length; i++) {
    if (allowedChars.indexOf(n.charAt(i)) == -1) {
      alert("Student name must contain characters only");
      document.getElementById("Name").value = "";
      flag = false;
      return;
    }
  }
}