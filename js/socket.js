// import { POLY_API_KEY } from './confjg.js';

// const socket = new WebSocket('wss://delayed.polygon.io/stocks');

// socket.addEventListener('open', (e) => {
//   const data = JSON.stringify({ action: 'auth', params: POLY_API_KEY });
//   socket.send(data);
//   console.log('Connected');
// });

// socket.addEventListener('message', (e) => {
//   const data = JSON.parse(e.data);

//   // 인증 완료
//   if (data[0].status === 'auth_success') {
//     socket.send(JSON.stringify({ action: 'subscribe', params: 'AM.*' }));
//   }

//   // 주식 정보
//   data.forEach((item) => {
//     if (item.ev === 'AM') {
//       console.log(item);
//     }
//   });
// });

// socket.addEventListener('error', (e) => {
//   console.error(e);
// });

// socket.addEventListener('close', (e) => {
//   console.log('Closed');
// });
