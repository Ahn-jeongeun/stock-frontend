import { polyAxios } from './axios.js';

const TOP_10_IT_TICKERS = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'META', 'TSLA', 'AVGO', 'TSM', 'BRK.A'];
const currDate = new Date().toISOString().split('T')[0];
const tbody = document.querySelector('tbody');

for (const ticker of TOP_10_IT_TICKERS) {
  getStocks(ticker, currDate).then((data) => {
    const tr = document.createElement('tr');
    tr.id = data.symbol;

    const name = document.createElement('th');
    const avg = document.createElement('td');
    const high = document.createElement('td');
    const low = document.createElement('td');
    const chg = document.createElement('td');
    const chgP = document.createElement('td');
    const vol = document.createElement('td');
    const time = document.createElement('td');
    name.innerText = data.symbol;
    name.scope = 'row';
    avg.innerText = (data.open + data.close) / 2;
    high.innerText = data.high;
    low.innerText = data.low;
    chg.innerText = data.afterHours - data.open;
    chgP.innerText = ((data.afterHours - data.open) / data.open) * 100;
    vol.innerText = data.volume;
    time.innerText = `${data.from.split('-')[1]}/${data.from.split('-')[2]}`;

    tr.append(name, avg, high, low, chg, chgP, vol, time);
    tbody.appendChild(tr);
  });
}

async function getStocks(ticker, date) {
  return await polyAxios.get(`/v1/open-close/${ticker}/2023-01-09`).then((res) => res.data);
}
