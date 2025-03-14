import { POLY_API_KEY } from './confjg.js';

const tbody = document.querySelector('tbody');

const socket = new WebSocket('wss://delayed.polygon.io/stocks');
const TOP_10_IT_TICKERS = 'AM.AAPL,AM.MSFT,AM.NVDA,AM.GOOGL,AM.AMZN,AM.META,AM.TSLA,AM.AVGO,AM.TSM,AM.BRK.A';

socket.addEventListener('open', (_) => {
  const data = JSON.stringify({ action: 'auth', params: POLY_API_KEY });
  socket.send(data);
  console.log('Connected');
});

socket.addEventListener('message', (e) => {
  const data = JSON.parse(e.data);
  console.log(data);

  // 인증 완료
  if (data[0].status === 'auth_success') {
    socket.send(
      JSON.stringify({
        action: 'subscribe',
        params: TOP_10_IT_TICKERS,
      }),
    );
  }

  // 주식 정보
  data.forEach((item) => {
    if (item.ev === 'AM') {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      const avg = document.createElement('td');
      const high = document.createElement('td');
      const low = document.createElement('td');
      const chg = document.createElement('td');
      const chgP = document.createElement('td');
      const vol = document.createElement('td');
      const time = document.createElement('td');
      th.innerText = item.sym;
      th.scope = 'row';
      avg.innerText = item.a;
      high.innerText = item.h;
      low.innerText = item.l;
      chg.innerText = item.c - item.o;
      chgP.innerText = ((item.c - item.o) / item.o) * 100;
      vol.innerText = item.v;

      const date = new Date(item.e);
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      const seconds = date.getUTCSeconds().toString().padStart(2, '0');
      time.innerText = `${hours}:${minutes}:${seconds}`;

      tr.append(th, avg, high, low, chg, chgP, vol, time);
      tbody.appendChild(tr);
    }
  });
});

socket.addEventListener('error', (err) => {
  console.error('Failed:', err);
});

socket.addEventListener('close', (code, reason) => {
  console.log(`Closed:`, code, reason);
});
