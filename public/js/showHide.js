let start = document.getElementById('start');

let stop = document.getElementById('stop');

let emitAdvice = document.getElementById('emitAdvice');

stop.style.display = 'none';
emitAdvice.style.visibility = 'hidden';

start.addEventListener('click', function(){
    start.style.display = 'none';
    stop.style.display = 'inline-block';
    emitAdvice.style.visibility = 'visible'
})

stop.addEventListener('click', function(){
    start.style.display = 'inline-block';
    stop.style.display = 'none';
    emitAdvice.style.visibility = 'hidden'
})