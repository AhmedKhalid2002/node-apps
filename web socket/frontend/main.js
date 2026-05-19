const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('connected with backend');
});

const msg = document.getElementById('msg');
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  // send data to backend use emit
  socket.emit('chat', msg.value);
  // recive from backend use on
});
