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

function loadDoc() {
  let nme = document.getElementById("name").value;
  console.log(nme);
  let department = document.getElementById("Departments").value;
  console.log(department);
  var l = document.querySelectorAll(".lvll");
  if (l[7].checked == true) {
    l[0].checked = true;
    l[1].checked = true;
    l[2].checked = true;
    l[3].checked = true;
    l[4].checked = true;
    l[5].checked = true;
    l[6].checked = true;
  }
  let s = document.querySelectorAll('[name="studentStatus"]');
  const xhttp = new XMLHttpRequest();

  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    console.log(data);
    if (this.response != "[]") {
      show = document.getElementById("out");
      show.style.display = "block";
      table = document.getElementById("container");
      for (var i = 0; i < data.length; i++) {
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
        td0.innerHTML = data[i].name;
        td1.innerHTML = data[i].ID;
        td2.innerHTML = data[i].status;
        td3.innerHTML = data[i].level;
        td4.innerHTML = data[i].department_id;
        td5.innerHTML = data[i].gpa;
        td6.innerHTML = data[i].birthdate;
        td7.innerHTML = data[i].phone_number;
        td8.innerHTML = data[i].email;
        td9.innerHTML = data[i].gender;
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
    }

    else {
      document.getElementById('error').innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Can not find student</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
      setTimeout(() => {
        document.getElementById('name').value = "";
        document.getElementById('error').innerHTML = "";
      }, 2500);

    }
  };


  xhttp.open("POST", "active/srchact");
  const csrftoken = getCookie('csrftoken');
  xhttp.setRequestHeader("X-CSRFToken", csrftoken);
  xhttp.send(
    JSON.stringify(
      {
        name: nme,
        level1: l[0].checked,
        level2: l[1].checked,
        level3: l[2].checked,
        level4: l[3].checked,
        level5: l[4].checked,
        level6: l[5].checked,
        level7: l[6].checked,
        status1: s[0].checked,
        status2: s[1].checked,
        department: department,
      }

    )

  );
}
