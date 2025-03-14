import { POLY_API_KEY } from './confjg.js';
import { fixAndLocale } from './util.js';

const TOP_10_IT_TICKERS = 'AM.AAPL,AM.MSFT,AM.NVDA,AM.GOOGL,AM.AMZN,AM.META,AM.TSLA,AM.AVGO,AM.TSM,AM.BRK.A';

const tbody = document.querySelector('tbody');
const socket = new WebSocket('wss://delayed.polygon.io/stocks');

socket.addEventListener('open', (_) => {
  const data = JSON.stringify({ action: 'auth', params: POLY_API_KEY });
  socket.send(data);
  console.log('Connected');
});

socket.addEventListener('message', (e) => {
  const data = JSON.parse(e.data);

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
        const cells = tr.children;
        cells[1].innerText = fixAndLocale(item.a);
        cells[2].innerText = fixAndLocale(item.h);
        cells[3].innerText = fixAndLocale(item.l);

        const chg = item.c - item.o;
        const colorClassName = chg >= 0 ? 'plus' : 'minus';
        const sign = chg > 0 ? '+' : '';
        cells[4].classList.remove('plus', 'minus');
        cells[5].classList.remove('plus', 'minus');
        cells[4].classList.add(colorClassName);
        cells[5].classList.add(colorClassName);
        cells[4].innerText = sign + fixAndLocale(chg);
        cells[5].innerText = sign + fixAndLocale((chg / item.o) * 100) + '%';

        cells[6].innerText = fixAndLocale(item.v);
        cells[7].innerText = convertToLocalDate(item.e);
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
        avg.innerText = fixAndLocale(item.a);
        high.innerText = fixAndLocale(item.h);
        low.innerText = fixAndLocale(item.l);

        const chgValue = item.c - item.o;
        const colorClassName = chgValue >= 0 ? 'plus' : 'minus';
        const sign = chgValue > 0 ? '+' : '';
        chg.classList.remove('plus', 'red');
        chgP.classList.remove('plus', 'red');
        chg.classList.add(colorClassName);
        chgP.classList.add(colorClassName);
        chg.innerText = sign + fixAndLocale(chgValue);
        chgP.innerText = sign + fixAndLocale((chgValue / item.o) * 100) + '%';

        vol.innerText = fixAndLocale(item.v);
        time.innerText = convertToLocalDate(item.e);

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

function convertToLocalDate(unixMs) {
  const date = dayjs(unixMs);
  return date.format('HH:mm:ss');
}
