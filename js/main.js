document.addEventListener('DOMContentLoaded', function () {
  const signInBtn = document.querySelector('.signInBtn');
  const signUpBtn = document.querySelector('.signUpBtn');
  const signinModal = document.getElementById('signin');
  const signupModal = document.getElementById('signup');
  const closeModalBtn = document.querySelectorAll('.close');
  const backBtn = document.querySelectorAll('.back');
  const togglePassword = document.querySelectorAll('.toggle-password');
  const passwordInput = document.querySelectorAll('#password');
  const signupLink = document.querySelector('.signup-link');
  const signinLink = document.querySelector('.signin-link');

  // 모달 열기 함수 (Sign In)
  function openSigninModal() {
    signinModal.style.display = 'flex';
    signupModal.style.display = 'none'; // Sign Up 모달은 숨기기
  }

  // Sign Up 모달 열기 함수
  function openSignupModal() {
    signupModal.style.display = 'flex';
    modal.style.display = 'none'; // Sign In 모달은 숨기기
  }

  // 모달 닫기 함수
  function closeModal() {
    signinModal.style.display = 'none';
    signupModal.style.display = 'none'; // Sign Up 모달도 닫기
  }

  // Sign In 버튼 클릭 시 모달 열기
  signInBtn.addEventListener('click', openSigninModal);

  // Sign Up 버튼 클릭 시 Sign Up 모달 열기
  signUpBtn.addEventListener('click', openSignupModal);

  // Sign Up 링크 클릭 시 Sign Up 모달 열기
  signupLink.addEventListener('click', function (event) {
    event.preventDefault(); // 기본 링크 동작을 막음
    openSignupModal();
  });

  // Sign In 링크 클릭 시 Sign In 모달 열기
  signinLink.addEventListener('click', function (event) {
    event.preventDefault(); // 기본 링크 동작을 막음
    openSigninModal();
  });

  // 모든 닫기 버튼 클릭 시 모달 닫기
  closeModalBtn.forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  // 모든 뒤로가기 버튼 클릭 시 모달 닫기
  backBtn.forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  // 비밀번호 토글 (비밀번호 보이기/숨기기)
  togglePassword.forEach((icon) => {
    icon.addEventListener('click', function () {
      passwordInput.forEach((input) => {
        input.type = input.type === 'password' ? 'text' : 'password';
      });
    });
  });
});
