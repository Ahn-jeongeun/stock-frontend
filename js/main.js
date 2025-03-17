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
    signinModal.style.display = 'none'; // Sign In 모달은 숨기기
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

  // signup.js
  document.getElementById('signupBtn').addEventListener('click', function (e) {
    e.preventDefault(); // 폼 제출을 막습니다.

    const name = document.getElementById('name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signuppassword').value;

    // 입력값 확인
    if (!name || !email || !password) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    // 서버로 회원가입 데이터 전송
    axios.post('http://localhost:8080/api/users/register', {
      name: name,
      email: email,
      password: password,
    })
      .then((response) => {
        alert("회원가입이 완료되었습니다.");
        document.getElementById('signup').style.display = 'none'; // 회원가입 창 닫기
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      });
  });

  document.getElementById('loginBtn').addEventListener('click', async (e) => {
    e.preventDefault(); // 폼 제출을 막습니다.

    const email = document.getElementById('email').value;
    const password = document.getElementById('loginpassword').value;

    const data = { email, password };

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', data);

      // 로그인 성공 시 사용자 이름과 로그아웃 버튼 표시
      document.getElementById("userid").innerHTML = `${response.data.name}
        <button class="btn btn-danger btn-sm" id="logoutBtn">Logout</button>`;

      // 로그인 창 숨기기
      document.getElementById('signin').style.display = 'none';

      // 토큰과 이름을 세션 스토리지에 저장
      const token = response.data.Authorization;
      sessionStorage.setItem('Authorization', token);
      sessionStorage.setItem('name', response.data.name);

      // Axios 기본 헤더에 Authorization 토큰 추가
      axios.defaults.headers.common['Authorization'] = token;

    } catch (error) {
      console.error("Login Error:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  });

  // 페이지 로드 시 로그인 상태 복원
  const Authorization = sessionStorage.getItem("Authorization");
  const name = sessionStorage.getItem("name");

  if (Authorization && name) {
    // 토큰이 있으면 로그인 상태로 처리
    axios.defaults.headers.common['Authorization'] = Authorization;
    document.getElementById("userid").innerHTML = `${name}
      <button class="btn btn-danger btn-sm" id="logoutBtn">Logout</button>`;
  }

  //로그아웃처리
  document.getElementById('logoutBtn').addEventListener('click', async (e) => {
    e.preventDefault(); 
  
    const token = sessionStorage.getItem("Authorization");
  
    if (!token) {
      alert("로그인 상태가 아닙니다.");
      return;
    }
  
    try {
      // 로그아웃 요청 보내기
      await axios.post("http://localhost:8080/api/users/logout", {}, {
        headers: {
          'Authorization': `Bearer ${token}` // Authorization 헤더에 Bearer 토큰 포함
        }
      });
  
      
      sessionStorage.removeItem("Authorization");
      sessionStorage.removeItem("name");
  
    
      delete axios.defaults.headers.common['Authorization'];
  
      // 로그아웃 성공 시
      alert("로그아웃 되었습니다.");
      window.location.reload();
  
    } catch (error) {
      console.error("Logout Error:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  });


  
});