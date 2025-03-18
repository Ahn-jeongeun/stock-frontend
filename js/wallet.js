import { _axios } from './axios.js';

const username = document.querySelector('.username');
const walletPopup = document.querySelector('.walletPopup');
const walletOverlay = document.querySelector('.walletOverlay');
const body = document.querySelector('body');
const walletUsername = walletPopup.querySelector('.username');
const account = walletPopup.querySelector('.account');
const balance = walletPopup.querySelector('.balance');

username.addEventListener('click', async () => {
  // 팝업 오픈
  if (walletPopup.style.display === '' || walletPopup.style.display === 'none') {
    const wallet = await getWallet();

    walletUsername.innerText = wallet.username;
    account.innerText = wallet.account;
    balance.innerText = '$' + wallet.balance.toLocaleString();
    walletPopup.style.display = 'block';
    walletOverlay.style.display = 'block';
    body.style.overflow = 'hidden';
  }
});

walletOverlay.addEventListener('click', () => {
  walletPopup.style.display = 'none';
  walletOverlay.style.display = 'none';
  body.style.overflow = 'unset';
});

async function getWallet() {
  return await _axios
    .get('/wallet', { headers: { Authorization: '48cd84fa9d02ffdfd4cc8f84069ec0a207c500f6313d6e522066c48d177a1c95' } })
    .then((res) => res.data);
}
