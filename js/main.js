const signInBtn = document.querySelector('.signInBtn');
const signUpBtn = document.querySelector('.signUpBtn');
const modalDiv = document.querySelector('#modal');
const modalOverlay = document.querySelector('#overlay');
const tbody = document.querySelector('tbody');

signInBtn.addEventListener('click', (_) => {
  // 모달 열기
  modalDiv.style.display = 'block';
});

signUpBtn.addEventListener('click', (_) => {
  // 모달 열기
  modalDiv.style.display = 'block';
});

// 모달 바깥 쪽 누르면 모달 닫기
modalOverlay.addEventListener('click', (e) => {
  modalDiv.style.display = 'none';
});

async function getStocks() {}
