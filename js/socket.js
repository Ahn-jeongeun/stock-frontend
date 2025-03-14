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
      const tr = document.getElementById(item.sym);

      // 기존에 있는 리스트이면
      if (tr) {
        console.log(tr.children);
        tr[1].innerText = item.a;
        tr[2].innerText = item.h;
        tr[3].innerText = item.l;
        tr[4].innerText = item.c - item.o;
        tr[5].innerText = ((item.c - item.o) / item.o) * 100;
        tr[6].innerText = item.v;
        tr[7].innerText = convertTime(item.e);
      } else {
        // 새 리스트 추가
        const tr = document.createElement('tr');
        tr.id = item.sym;

        const name = document.createElement('th');
        const avg = document.createElement('td');
        const high = document.createElement('td');
        const low = document.createElement('td');
        const chg = document.createElement('td');
        const chgP = document.createElement('td');
        const vol = document.createElement('td');
        const time = document.createElement('td');
        name.innerText = item.sym;
        name.scope = 'row';
        avg.innerText = item.a;
        high.innerText = item.h;
        low.innerText = item.l;
        chg.innerText = item.c - item.o;
        chgP.innerText = ((item.c - item.o) / item.o) * 100;
        vol.innerText = item.v;
        time.innerText = convertTime(item.e);

        tr.append(name, avg, high, low, chg, chgP, vol, time);
        tbody.appendChild(tr);
      }
    }
  });
});

socket.addEventListener('error', (err) => {
  console.error('Failed:', err);
});

socket.addEventListener('close', (code, reason) => {
  console.log(`Closed:`, code, reason);
});

function convertTime(unixMs) {
  const date = new Date(unixMs);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
