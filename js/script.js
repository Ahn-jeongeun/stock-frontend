document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.querySelector(".close");
    const backBtn = document.querySelector(".back");
    const togglePassword = document.querySelector(".toggle-password");
    const passwordInput = document.getElementById("password");

    // 모달 열기
    openModalBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    // 모달 닫기
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    
    // 뒤로 가기 버튼 클릭 시 모달 닫기 (추가 기능 가능)
    backBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 비밀번호 표시/숨기기
    togglePassword.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
