// 유틸리티
function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function removeCookie(cname) {
  document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

Authorization = getCookie('Authorization');
email = getCookie('email');
if (Authorization && email) {
  axios.defaults.headers.common['Authorization'] = Authorization; // Authorization 헤더 설정
  document.getElementById('loginSpan').innerHTML = `${email}  
    <button class="btn btn-danger btn-sm" id="logoutBtn">Logout</button>`;
}
