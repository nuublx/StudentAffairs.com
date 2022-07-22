$(document).ready(
  x,
  setInterval(
    x , 20000)
);


function x() {
  $.ajax({
    type: "GET",
    url: "AllStudents/getdata",
    success: function (response) {
      $("#container").empty();
      console.log(response.stuData);
      table = document.getElementById("container");
      let tr = document.createElement("tr");
      let td0 = document.createElement("th");
      let td1 = document.createElement("th");
      let td2 = document.createElement("th");
      let td3 = document.createElement("th");
      let td4 = document.createElement("th");
      let td5 = document.createElement("th");
      let td6 = document.createElement("th");
      let td7 = document.createElement("th");
      let td8 = document.createElement("th");
      let td9 = document.createElement("th");
      td0.innerHTML = "Student name";
      td1.innerHTML = "Student ID";
      td2.innerHTML = "Status";
      td3.innerHTML = "Level";
      td4.innerHTML = "Department";
      td5.innerHTML = "GPA";
      td6.innerHTML = "Birth Date";
      td7.innerHTML = "Phone Number";
      td8.innerHTML = "Email";
      td9.innerHTML = "Gender";
      tr.appendChild(td0);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tr.appendChild(td7);
      tr.appendChild(td8);
      tr.appendChild(td9);
      table.appendChild(tr);
      for (var key in response.stuData) {
        let tr = document.createElement("tr");
        let td0 = document.createElement("td");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        let td7 = document.createElement("td");
        let td8 = document.createElement("td");
        let td9 = document.createElement("td");
        td0.innerHTML = response.stuData[key].name;
        td1.innerHTML = response.stuData[key].ID;
        td2.innerHTML = response.stuData[key].status;
        td3.innerHTML = response.stuData[key].level;
        td4.innerHTML = response.stuData[key].department_id;
        td5.innerHTML = response.stuData[key].gpa;
        td6.innerHTML = response.stuData[key].birthdate;
        td7.innerHTML = response.stuData[key].phone_number;
        td8.innerHTML = response.stuData[key].email;
        td9.innerHTML = response.stuData[key].gender;
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        tr.appendChild(td9);
        table.appendChild(tr);
      }
    },
    error: function (response) {
      document.getElementById('error').innerHTML="";
      document.getElementById('error').innerHTML='<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Something Wrong Happened!..</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    },
  });
}

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

function update() {
  let ID = document.getElementById("SearchID").value;
  let st1=document.getElementById("active").checked;
  let st2=document.getElementById("inactive").checked;
  console.log(ID);
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.responseText=="done"){
      document.getElementById('error').innerHTML='<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Student Updated Successfully</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
      setTimeout(() => {
        document.getElementById('SearchID').value="";
        document.getElementById('error').innerHTML="";
        document.getElementById("active").checked=false;
        document.getElementById("inactive").checked=false;
        x();
    }, 2000);
    }
    else {
      document.getElementById('error').innerHTML='<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Inavlid ID!</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
      setTimeout(() => {
        document.getElementById('SearchID').value="";
        document.getElementById('error').innerHTML="";
        document.getElementById("active").checked=false;
        document.getElementById("inactive").checked=false;
    }, 2500);
    }
  };
  xhttp.open("POST", "AllStudents/update");
    const csrftoken = getCookie('csrftoken');
    xhttp.setRequestHeader("X-CSRFToken", csrftoken);
  xhttp.send(
    JSON.stringify({
      Ident:ID,
      status0:st1,
      status1:st2,
    })
  );
}
function validate()
{
  let v1=document.getElementById("active").checked;
  let v2=document.getElementById("inactive").checked;
  if(v1 || v2){
  let s = document.getElementById("SearchID").value; 
  if (s < 0) { alert ("Search ID is invalid"); return false;}
  else update();
  }
  else{
    alert("Please choose a status")
  }
}