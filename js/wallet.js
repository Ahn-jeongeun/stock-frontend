import { _axios } from './axios.js';
import { TransactionType } from './enum.js';

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
const inputSection = walletPopup.querySelector('.inputSection');
const input = inputSection.querySelector('input');
const helperText = inputSection.querySelector('.helperText');

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
  inputSection.style.display = 'none';
  depositBtn.style.display = 'block';
  withdrawBtn.style.display = 'block';
  confirmBtn.style.display = 'none';
  input.id = '';
  helperText.innerText = '';
});

depositBtn.addEventListener('click', async () => {
  walletHeader.innerText = 'Deposit';
  inputSection.style.display = 'inline';
  depositBtn.style.display = 'none';
  withdrawBtn.style.display = 'none';
  confirmBtn.style.display = 'block';
  input.id = TransactionType.DEPOSIT;
});

withdrawBtn.addEventListener('click', async () => {
  walletHeader.innerText = 'Withdrawal';
  inputSection.style.display = 'inline';
  depositBtn.style.display = 'none';
  withdrawBtn.style.display = 'none';
  confirmBtn.style.display = 'block';
  input.id = TransactionType.WITHDRAWAL;
});

confirmBtn.addEventListener('click', async () => {
  const amount = Number(input.value);
  const typeString = input.id === TransactionType.DEPOSIT ? '입금' : '출금';

  if (amount <= 0) {
    helperText.classList.remove('ok');
    helperText.classList.add('error');
    helperText.innerText = `1원부터 ${typeString} 가능합니다`;
    return;
  }

  const balanceAmount = Number(balance.innerText.slice(1).split(',').join(''));
  const isExceedingBalance = balanceAmount < amount;

  if (input.id === TransactionType.WITHDRAWAL && isExceedingBalance) {
    helperText.classList.remove('ok');
    helperText.classList.add('error');
    helperText.innerText = '잔액이 부족합니다';
    return;
  }

  const data = await updateWallet();
  balance.innerText = '$' + data.balance.toLocaleString();
  helperText.classList.remove('error');
  helperText.classList.add('ok');
  helperText.innerText = `${typeString}되었습니다`;
  input.value = '';
});

async function getWallet() {
  return await _axios.get('/wallet').then((res) => res.data);
}

async function updateWallet() {
  const body = {
    account: account.innerText,
    amount: Number(input.value),
    type: input.id,
  };

  return await _axios.post('/wallet', body).then((res) => res.data);
}
