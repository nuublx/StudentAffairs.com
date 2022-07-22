function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

function validateSearch ()
{
  if(document.getElementById("srch")){
    if(document.getElementById("srch").value>0){
      loadDoc();
      return ;
    }
  }
 document.getElementById('error').innerHTML='<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Search ID is invalid</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
}

function loadDoc() {
  let ID = document.getElementById("srch").value;
  console.log(ID);
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    console.log(data)
    if (!(data[0]==null)){
      document.getElementById('n').innerHTML=data[0].name;
      document.getElementById('id').innerHTML=data[0].ID;
      document.getElementById('lvl').innerHTML=data[0].level;
    }
    else {
      document.getElementById('error').innerHTML='<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Student is not eligible to be assigned to a department.<br>Or ID does not exist</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
      setTimeout(() => {
        document.getElementById('error').innerHTML="";
        document.getElementById('srch').value="";
      },2500);
    }
  };
  xhttp.open("POST", "Departments/srchdep");
    const csrftoken = getCookie('csrftoken');
    xhttp.setRequestHeader("X-CSRFToken", csrftoken);
  xhttp.send(
    JSON.stringify({
      id:ID,
    })
  );
}
function assign() {
  let dep = document.getElementById("dep").value;
  let ID = document.getElementById("id").innerHTML;
  if(ID==""){
    document.getElementById('error').innerHTML='<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please Enter ID!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  return;
  }
    console.log(dep);
  console.log(ID);
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    var data =this.responseText;
    if (data!="done"){
      document.getElementById('error').innerHTML='<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Error while assgining department to the student</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
      setTimeout(() => {
        document.getElementById('srch').value="";
        document.getElementById('error').innerHTML="";
      }, 2500);
    }
    else {
      document.getElementById('error').innerHTML='<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Department Assigned Successfully</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
      setTimeout(() => {
        document.getElementById('srch').value="";
        document.getElementById('n').innerHTML="";
        document.getElementById('id').innerHTML="";
        document.getElementById('lvl').innerHTML="";
        document.getElementById('error').innerHTML="";
    }, 2500);
    }
  };
  xhttp.open("POST", "Departments/assigndep");
    const csrftoken = getCookie('csrftoken');
    xhttp.setRequestHeader("X-CSRFToken", csrftoken);
  xhttp.send(
    JSON.stringify({
      depart:dep,
      Ident:ID,
    })
  );
}





/*const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})    
    
alert("Try IDs: 20200200, 20200569, 20200145, 20200147, 20200371, 20200467");

function sv(){ 
  alert("Changes Saved Successfully"); }

function validateSearch ()
{
  let s = document.getElementById("srch").value; 
  if (s < 0) { return false; }
  else return true; 
}

function chnge() {
      let srch = parseInt(document.getElementById("srch").value);
      console.log(srch);
      let x = document.getElementById("n");
      let y = document.getElementById("id");
      let z = document.getElementById("lvl");

      switch (srch) {
        case 20200200:
          x.innerHTML = "Zeyad Diaa Eldin Refeat";
          y.innerHTML = "20200200";
          z.innerHTML = "3rd Level";
          break;
        case 20200569:
          x.innerHTML = "Mai Mostafa Amin";
          y.innerHTML = "20200569";
          z.innerHTML = "3rd Level";
          break;
        case 20200145:
          x.innerHTML = "Habiba Mohamed Mohamed Hassan";
          y.innerHTML = "20200145";
          z.innerHTML = "3rd Level";
          break;
        case 20200147:
          x.innerHTML = "Habiba Yasser Saied";
          y.innerHTML = "20200147";
          z.innerHTML = "3rd Level";
          break;
        case 20200371:
          x.innerHTML = "Fadia khaled Abd El Hady";
          y.innerHTML = "20200371";
          z.innerHTML = "3rd Level";
          break;
        case 20200467:
          x.innerHTML = "Mohamed Amr Abd El Fattah";
          y.innerHTML = "20200467";
          z.innerHTML = "3rd Level";
          break;
        default:
          if (validateSearch() == false)
          { alert ("Search ID is invalid");}
          else {alert("Student id doesn't exist or he didnt pass 2nd level yet!");}
      }
}*/