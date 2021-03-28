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
  
  let canvas = document.getElementById('preview');
  let context = canvas.getContext('2d');
  
  
  let video = document.getElementById('video');
  
  canvas.width = 600;
  canvas.height = 450;
  
  context.width = canvas.width;
  context.height = canvas.height;
  
  //let eventStream = document.getElementById('eventStream').innerHTML;
  
  let key = document.getElementById('key');
  
  let emissionKey = document.getElementById('emissionKey');
  
  let eventStream = getCookie('eventStream');
  
  let viewers = document.getElementById('viewers');

  let socket = io({
      query : {
          key: key.innerHTML,
          emissionKey : emissionKey.innerHTML,
          eventStream : eventStream
      }
  })

  let socketViewers = io({
      query : {
          key: key.innerHTML,
          emissionKey : emissionKey.innerHTML
      }
  })

  socketViewers.on('viewers', function (amountOfViewers) {
    viewers.innerText = amountOfViewers
  })
  
  let emissionEvent = document.getElementById('emissionEvent');
  emissionEvent.value = eventStream;
  
  let camerasAccess = document.getElementById('camerasAccess');
  camerasAccess.addEventListener('click', getCameras);
  
  async function getCameras() {
      try {
          video.srcObject = await navigator.mediaDevices.getDisplayMedia();
      } catch(err) {
          console.error("Error: " + err);
      }
  }
  
  function logger(msg) {
      console.log(msg)
      //$('#logger').text(msg);
  }
  function loadCam(stream) {
      video.srcObject = stream;
      logger('Webcam cargada correctamente')
  }
  function loadFail() {
      logger('Webcam no conectada, revise su cámara.')
  }
  function viewVideo(video,context) {	//console.log('viewVideo');
      context.drawImage(video,0,0,context.width,context.height);
      socket.emit(eventStream,canvas.toDataURL('image/webp'));//console.log(eventStream)
  }
  $(function(){
      navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia)
      if (navigator.getUserMedia) {
          console.log('Navigator user media');
          navigator.getUserMedia({video: true},loadCam,loadFail)
      } else{
          console.log('No navigator user media');
      }
      let emit;
      $('#start').click(function() {
          emit = setInterval(function(){
              viewVideo(video,context);
              //console.log('emitiendo')
          },175);
          recordedChunks = [];
          initMediaRecorder();
      })
      
  
      stop=document.getElementById('stop');
      $('#stop').click(function () {
          console.log("stopping");
          mediaRecorder.stop();
          clearInterval(emit);
      })
  })
  
  
  var recordedChunks = [];
  function initMediaRecorder(){
      // Optional frames per second argument.
      var stream = canvas.captureStream(70);//console.log(stream);
      var options = { mimeType: "video/webm; codecs=vp9" };
      mediaRecorder = new MediaRecorder(stream, options);
  
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
  }
  function handleDataAvailable(event) {
    console.log("data-available");
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
      console.log(recordedChunks);
      download();
    } else {
      // ...
    }
  }
  function download() {
    var blob = new Blob(recordedChunks, {
      type: "video/webm"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "test.webm";
    a.click();
    window.URL.revokeObjectURL(url);
  }