import { polyAxios } from './axios.js';
import { fixAndLocale } from './util.js';

dayjs.locale('ko');

const MILLION = 1000000;
const tickers = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'META', 'TSLA', 'AVGO', 'TSM', 'BRK.A'];
const tbody = document.querySelector('tbody');

window.addEventListener('load', async () => {
  const results = await getRecentStocks(dayjs().subtract(1, 'day'));
  results.forEach((data) => createTableRow(data));
  tbody.style.display = 'contents';
});

async function getRecentStocks(dayjs) {
  let results = [];
  try {
    results = await Promise.all(tickers.map((ticker) => getStocks(ticker, dayjs.format('YYYY-MM-DD'))));
  } catch (err) {
    dayjs = dayjs.subtract(1, 'day');
    results = await getRecentStocks(dayjs);
  }
  return results;
}

async function getStocks(ticker, date) {
  return await polyAxios.get(`/v1/open-close/${ticker}/${date}`).then((res) => res.data);
}

export function createTableRow(data) {
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
  avg.innerText = fixAndLocale((data.open + data.close) / 2);
  high.innerText = fixAndLocale(data.high);
  low.innerText = fixAndLocale(data.low);

  const chgValue = data.afterHours - data.open;
  const colorClassName = chgValue >= 0 ? 'plus' : 'minus';
  const sign = chgValue > 0 ? '+' : '';
  const chgPValue = ((data.afterHours - data.open) / data.open) * 100;
  chg.innerText = sign + fixAndLocale(data.afterHours - data.open);
  chg.classList.add('chg', colorClassName);
  chgP.innerText = sign + fixAndLocale(chgPValue) + '%';
  chgP.classList.add('chgP', colorClassName);

  vol.innerText = data.volume ? fixAndLocale(data.volume / MILLION) + 'M' : '-';
  time.innerText = `${data.from.split('-')[1]}/${data.from.split('-')[2]}`;

  tr.append(name, avg, high, low, chg, chgP, vol, time);
  tbody.appendChild(tr);
}
