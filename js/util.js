function convertToUnixMs(dayjs) {
  return new Date(Date.UTC(dayjs.get('year'), dayjs.get('month'), dayjs.get('date'))).getTime();
}

function fixAndLocale(num) {
  return Number(num.toFixed(2)).toLocaleString();
}

export { convertToUnixMs, fixAndLocale };
