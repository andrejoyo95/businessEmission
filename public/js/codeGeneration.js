function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
let toGenerateCode = document.getElementById('toGenerateCode');
toGenerateCode.addEventListener('click', generateCode);
function comproveEnterPress(e) {
  if (e.keyCode === 13) { //console.log(e.which);
    console.log("enter presionado");
    generateCode();
  }
}
function generateCode() {
  let email = document.getElementById('email');
  //let url = 'http://localhost:9000/saveVisualizationCode'
  let url = 'https://visualization-codes-services.herokuapp.com/saveVisualizationCode'
  axios.get(url, {
    params: {
        email: email.value,
        event: eventStream,
        businessKey: key.innerHTML,
        idEmission: getCookie('idEmission')
    }
  })
  .then(res => {//console.log(res.data);
      if (!res.data) {
          console.log(' - ')
      } else{
          console.log(res.data);
          let codeTable = document.getElementById('codeTable');
          let tr = document.createElement('tr');
          let tdTime = document.createElement('td');
          let tdEmail = document.createElement('td');
          let tdCode = document.createElement('td');

          let date = new Date(res.data.time);
          let seconds = date.getSeconds();
          let minutes = date.getMinutes();
          let hour = date.getHours();
          let time = document.createTextNode(hour+':'+minutes+':'+seconds);

          tdTime.append(time);
          tr.append(tdTime);
          tdEmail.innerHTML = email.value;
          tr.append(tdEmail);
          tdCode.innerHTML = res.data.code;
          tr.append(tdCode);
          codeTable.append(tr);
          email.value=''
      }
  })
}