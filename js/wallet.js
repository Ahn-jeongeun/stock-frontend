import { _axios } from './axios.js';

const username = document.querySelector('.username');
const walletPopup = document.querySelector('.walletPopup');
const walletOverlay = document.querySelector('.walletOverlay');
const body = document.querySelector('body');
const walletUsername = walletPopup.querySelector('.username');
const account = walletPopup.querySelector('.account');
const balance = walletPopup.querySelector('.balance');
const depositBtn = walletPopup.querySelector('.depositBtn');
const withdrawBtn = walletPopup.querySelector('.withdrawBtn');
const confirmBtn = walletPopup.querySelector('.confirmBtn');
const walletHeader = walletPopup.querySelector('.walletHeader');
const depositInput = walletPopup.querySelector('.depositInput');

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

  walletHeader.innerText = 'Ureka Wallet';
  depositInput.style.display = 'none';
  depositBtn.style.display = 'block';
  withdrawBtn.style.display = 'block';
  confirmBtn.style.display = 'none';
});

depositBtn.addEventListener('click', async () => {
  walletHeader.innerText = 'Deposit';
  depositInput.style.display = 'inline';
  depositBtn.style.display = 'none';
  withdrawBtn.style.display = 'none';
  confirmBtn.style.display = 'block';
});

withdrawBtn.addEventListener('click', async () => {
  walletHeader.innerText = 'Withdrawal';
  depositInput.style.display = 'inline';
  depositBtn.style.display = 'none';
  withdrawBtn.style.display = 'none';
  confirmBtn.style.display = 'block';
});

async function getWallet() {
  return await _axios.get('/wallet').then((res) => res.data);
}

async function deposit() {
  console.log(account.innerText);
  const body = {
    account: account.innerText,
    amount: 1000,
    type: 'WITHDRAWAL',
  };
}
