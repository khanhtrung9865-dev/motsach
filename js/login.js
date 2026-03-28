/* 
Tên: Nguyễn Khánh Trung
Lớp: 24TTH002
MSSV: 24T01010 */
let accounts = [
    {username: "admin", password: "123"},
    {username: "user1", password: "111"},
];
// lấy phần tử
const btnlogin = document.getElementById("btnlogin");
const btnregister = document.getElementById("btnregister");
const btnlogout = document.getElementById("btnlogout");

const btnloginsubmit = document.getElementById("loginsubmit");
const btnregistersubmit = document.getElementById("registersubmit");

//lấy tài khoản đã đăng ký từ localstorage
let saveaccounts = JSON.parse(localStorage.getItem("accounts")) || [];
accounts=accounts.concat(saveaccounts);

//hiển thị from
function showlogin() {
    hideall();
    document.getElementById("loginform").style.display="block";
}

function showregister () {
    hideall();
    document.getElementById("registerform").style.display="block";
}
function hideall () {
    document.getElementById("loginform").style.display="none";
    document.getElementById("registerform").style.display="none";
}
//đăng ký
function register () {
    let user = document.getElementById("registeruser").value.trim();
    let pass = document.getElementById("registerpass").value.trim();
    if (!user || !pass) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    //kiểm tra trùng username
    let isexist = accounts.some(acc => acc.username === user);

    if (isexist) {
        alert("Tên đăng nhập đã tồn tại, vui lòng chọn tên khác!");
        return;
    }
    //thêm tài khoản mới 
    let newaccount = { username: user, password: pass};

    accounts.push(newaccount);
    saveaccounts.push(newaccount);

    localStorage.setItem("accounts",JSON.stringify(saveaccounts));

    alert("Đăng ký thành công!");
    showlogin();
}
    //đăng nhập
    function login() {
        let user = document.getElementById("loginuser").value;
        let pass = document.getElementById("loginpass").value;

        let found = accounts.find(acc =>acc.username ===user && acc.password === pass);

        if (found) {
            localStorage.setItem("currentUser", user);

            document.getElementById("welcometext").innerText = `Xin chào bạn ${user}`;
            document.getElementById("authbuttons").style.display = "none";
            document.getElementById("btnlogout").style.display = "inline-block";
            hideall();
        } else {
            alert("Sai tài khoản hoặc mật khẩu");
        }

    }
//Đăng xuất
function logout() {
            localStorage.removeItem("currentUser");

            document.getElementById("welcometext").innerText = "Xin chào quý khách";
            document.getElementById("authbuttons").style.display = "block";
            document.getElementById("btnlogout").style.display = "none";
}
//gắn sự kiện
btnlogin.addEventListener("click", showlogin);
btnregister.addEventListener("click", showregister);
btnlogout.addEventListener("click",logout);

btnloginsubmit.addEventListener("click",login);

btnregistersubmit.addEventListener("click",register);

hideall();
showlogin();
document.getElementById("btnlogout").style.display = "none";

const gohome=document.getElementById("backhome");
gohome.addEventListener("click", () => {
    window.location.href="index.html";
})
//khôi phục trạng thái đăng nhập, nếu đã login, hiện:
let currentUser = localStorage.getItem("currentUser");
if (currentUser) {
    document.getElementById("welcometext").innerText = `Xin chào bạn ${currentUser}`;
    document.getElementById("authbuttons").style.display = "none";
    document.getElementById("btnlogout").style.display = "inline-block";
}
