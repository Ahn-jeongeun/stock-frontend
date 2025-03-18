const username = document.querySelector('.username');
const walletPopup = document.querySelector('.walletPopup');
const walletOverlay = document.querySelector('.walletOverlay');
const body = document.querySelector('body');

username.addEventListener('click', () => {
  if (walletPopup.style.display === '' || walletPopup.style.display === 'none') {
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
