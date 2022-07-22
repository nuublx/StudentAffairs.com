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
  if(document.getElementById("SearchID").value==null ||document.getElementById("SearchID").value<0){
    document.getElementById('error').innerHTML='<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Search ID is invalid</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    return false;
  }
  else
   search();
}
function inputValidation() {
  var flag = true; 
  var allowedChars="abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var n=document.getElementById("Name").value;
  for(var i=0;i<n.length;i++){
      if(allowedChars.indexOf(n.charAt(i))==-1)
      {
        document.getElementById('error').innerHTML='<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Student name must contain characters only</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        
        return false;
      }
  }
  return true;
}
function gpavalidation(){
  if(document.getElementById("newGpa").value==null ||document.getElementById("newGpa").value<0 ||document.getElementById("newGpa").value>4.0){
    return false;
  }
  return true;
}

function search() {
  let ID = document.getElementById("SearchID").value;
  console.log(ID);

  const xhttp = new XMLHttpRequest();

  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    console.log(data);
    if (!(data[0]==null)){
      document.getElementById('n').innerHTML=data[0].name;
      document.getElementById('id').innerHTML=data[0].ID;
      document.getElementById("stud_gpa").innerHTML=data[0].gpa;
      document.getElementById('lvl').innerHTML=data[0].level;
      document.getElementById('stat').innerHTML=data[0].status;
      document.getElementById('dep').innerHTML=data[0].department_id;
      document.getElementById('BD').innerHTML=data[0].birthdate;
      document.getElementById('num').innerHTML=data[0].phone_number;
      document.getElementById('email').innerHTML=data[0].email;
      document.getElementById('gndr').innerHTML=data[0].gender;

      document.getElementById('Name').value=data[0].name;
      document.getElementById('editlvl').value=data[0].level;
      document.getElementById("newGpa").value=data[0].gpa;
      document.getElementById('BrD').value=data[0].birthdate;
      document.getElementById('PhoneNum').value=data[0].phone_number;
      document.getElementById('email_').value=data[0].email;

      setTimeout(() => {
        document.getElementById('SearchID').value="";
      },5000);
    }
    else {
      document.getElementById('error').innerHTML='<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>There is no student with this id try again!..<br>Or ID is invalid</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
      setTimeout(() => {
        document.getElementById('error').innerHTML="";
        document.getElementById('SearchID').value="";
      },2500);
    }
  };

  xhttp.open("POST", "EditStudent/srchedit");
    const csrftoken = getCookie('csrftoken');
    xhttp.setRequestHeader("X-CSRFToken", csrftoken);
  xhttp.send(
    JSON.stringify({
      id:ID,
    })
  );
}

function dltstd(){
  const std=document.getElementById('id').innerHTML;
  const xhttp = new XMLHttpRequest();
  
  xhttp.onload = function () {
    var data =this.responseText;
    console.log(data);
    if (data=="done"){
      document.getElementById('n').innerHTML="";
      document.getElementById('id').innerHTML="";
      document.getElementById("stud_gpa").innerHTML="";
      document.getElementById('lvl').innerHTML="";
      document.getElementById('stat').innerHTML="";
      document.getElementById('dep').innerHTML="";
      document.getElementById('BD').innerHTML="";
      document.getElementById('num').innerHTML="";
      document.getElementById('email').innerHTML="";
      document.getElementById('gndr').innerHTML="";

      document.getElementById('Name').value="";
      document.getElementById('editlvl').value="";
      document.getElementById("newGpa").value="";
      document.getElementById('BrD').value="";
      document.getElementById('PhoneNum').value="";
      document.getElementById('email_').value="";
      document.getElementById('error').innerHTML='<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Student has been deleted successfully</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    }
    else{
      document.getElementById('error').innerHTML='<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Error deleting Student</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    }
  };

  xhttp.open("POST", "EditStudent/delete");
  const csrftoken = getCookie('csrftoken');
  xhttp.setRequestHeader("X-CSRFToken", csrftoken);
xhttp.send(
  JSON.stringify({
    id:std,
  })
);
}

function dlt(){
 const std=document.getElementById('id').innerHTML;
 var result=confirm("Are you sure you want to delete student: "+std+"?")
 if(result)
  dltstd();
}
function sub(){
  const std=document.getElementById('id').innerHTML;
  var result=confirm("Are you sure you want to edit student: "+std+"?")
  if(result)
   SaveEdits();
 }

function SaveEdits(){
  if(inputValidation()&&gpavalidation()){
 var n  =document.getElementById('Name').value;
 var std=document.getElementById('id').innerHTML;
 var lvl=document.getElementById('editlvl').value;
 var gpa_=document.getElementById("newGpa").value;
 var brd=document.getElementById('BrD').value;
 var pn=document.getElementById('PhoneNum').value;
 var em=document.getElementById('email_').value;
 var s1=document.getElementById('Active').checked;
 var s2=document.getElementById('Inactive').checked;
 var s="";
 if (s1)
  s="Active";
 else if(s2)
  s="Inactive";

 const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    var data =this.responseText;
    console.log(data);
    if (data=="done"){
      document.getElementById('n').innerHTML="";
      document.getElementById('id').innerHTML="";
      document.getElementById("stud_gpa").innerHTML="";
      document.getElementById('lvl').innerHTML="";
      document.getElementById('stat').innerHTML="";
      document.getElementById('dep').innerHTML="";
      document.getElementById('BD').innerHTML="";
      document.getElementById('num').innerHTML="";
      document.getElementById('email').innerHTML="";
      document.getElementById('gndr').innerHTML="";

      document.getElementById('Name').value="";
      document.getElementById('editlvl').value="";
      document.getElementById("newGpa").value="";
      document.getElementById('BrD').value="";
      document.getElementById('PhoneNum').value="";
      document.getElementById('email_').value="";
      document.getElementById('error').innerHTML='<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Student has been edited successfully</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }
    else{
      document.getElementById('error').innerHTML='<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Error editing student!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    }
  };

  xhttp.open("POST", "EditStudent/edtstd");
  const csrftoken = getCookie('csrftoken');
  xhttp.setRequestHeader("X-CSRFToken", csrftoken);
xhttp.send(
  JSON.stringify({
    id:std,
    name:n,
    level:lvl,
    gpa:gpa_,
    BrD:brd,
    phone:pn,
    email:em,
    stat:s,
  })
);
}
else{
    document.getElementById('error').innerHTML='<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Info edited is invalid correct it and try again!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  }
}
/*const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})


alert(
  "Try IDs: 20200200, 20200569, 20200145, 20200147, 20200371, 20200467"
); 


function inputValidation() {
  var flag = true; 
  var allowedChars="abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var n=document.getElementById("Name").value;
  for(var i=0;i<n.length;i++){
      if(allowedChars.indexOf(n.charAt(i))==-1)
      {
        alert("Student name must contain characters only");
        flag = false; 
        break; 
   }
  }

  let gpa = document.getElementById("newGpa").value;
  if (gpa < 0 || gpa > 4) { alert ( "Edited GPA is invalid"); flag = false;}

  let phone = document.getElementById("PhoneNum").value; 
  if (phone < 0){alert("Invalid Phone number" ); flag = false;}

  return flag; 
}

function validateSearch ()
{
  let s = document.getElementById("SearchID").value; 
  if (s < 0) { alert ("Search ID is invalid"); return false;}
  else return true; 
}

var studentInfo = new Array(6);
for (var i = 0; i < studentInfo.length; i++)
{
  studentInfo[i] = new Array(9);
}
var arr2=localStorage.getItem('myvalue');
var arr3=JSON.parse(arr2);

var x=0;
for(var i=0;i<6;i++)
{
  for(var j=0;j<9;j++)
  {
    studentInfo[i][j]=arr3[x];
    x++;
  }
}

function search()
{
  let id = (document.getElementById('SearchID').value);
  console.log(id);

  let name = document.getElementById('n').value;
  let studID = document.getElementById('id').value;
  let Gpa = document.getElementById('stud_gpa').value;
  let lvl = document.getElementById('lvl').value;
  let dept = document.getElementById('dep').value;
  let st = document.getElementById('stat').value;
  let bd = document.getElementById('BD').value;
  let num = document.getElementById('num').value;
  let email = document.getElementById('email').value;
  
  var found = false; 
  for (var i = 0; i < 6; i++)
  {
    if (id == studentInfo[i][1])
    {
      found = true; 
      bd.innerHTML = studentInfo[i][6];
      Gpa.innerHTML = studentInfo[i][5];
      name.innerHTML=studentInfo[i][0];
      studID.innerHTML=studentInfo[i][1];
      st.innerHTML=studentInfo[i][2]; 
      lvl.innerHTML = studentInfo[i][3]; 
      dept.innerHTML=studentInfo[i][4];
      num.innerHTML=studentInfo[i][7];
      email.innerHTML=studentInfo[i][8];
    }
  }
  if (found == false  && validateSearch())
  {
    alert("Student ID doesn't exist");
  }
}

function SaveEdits ()
{
  if (inputValidation() && validateSearch())
  {  window.alert("Edits are saved successfully! ");
}
}


function confirmDelete()
{
confirm("Are you sure you wants to delete this student? ");
}
*/