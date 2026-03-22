/* 
Tên: Nguyễn Khánh Trung
Lớp: 24TTH002
MSSV: 24T01010 */
const gohome=document.getElementById("backhome");
gohome.addEventListener("click", () => {
    window.location.href="index.html";
})

const tbody = document.getElementById("gioHangBody");

function layGioHang(){
  return JSON.parse(localStorage.getItem("gioHang")) || [];
}

function formatVND(x){
  return x.toLocaleString("vi-VN") + " đ";
}

function renderGioHang(){
    const gioHang = layGioHang();
  tbody.innerHTML = "";
  let tong = 0;

  gioHang.forEach((item, index)=>{
    const tr = document.createElement("tr");

    const thanhTien = item.soLuong * item.gia;
    tong += thanhTien;

    tr.innerHTML = `
  <td class="product">
    <img src="${item.image}">
    <span>${item.name}</span>
  </td>

  <td>
    <button onclick="giam(${index})">-</button>
    ${item.soLuong}
    <button onclick="tang(${index})">+</button>
  </td>

  <td>${formatVND(thanhTien)}</td>

  <td>
    <button onclick="xoa(${index})">❌</button>
  </td>
`;

    tbody.appendChild(tr);
  });

  document.getElementById("tongTien").textContent = formatVND(tong);
}

function tang(index){
  let gioHang = layGioHang();  
  gioHang[index].soLuong++;
  capNhat(gioHang);
}

function giam(index){
    let gioHang = layGioHang();
  if(gioHang[index].soLuong > 1){
    gioHang[index].soLuong--;
  }
  capNhat(gioHang);
}

function xoa(index){
    let gioHang = layGioHang();
  gioHang.splice(index, 1);
  capNhat(gioHang);
}

function xoaHet(){
    let gioHang = layGioHang();
  gioHang = [];
  capNhat(gioHang);
}

function capNhat(gioHangMoi){
  localStorage.setItem("gioHang", JSON.stringify(gioHangMoi));
  renderGioHang();
  capNhatSoLuongIcon();
}

function thanhToan(){
  let gioHang = layGioHang();
  let currentUser = localStorage.getItem("currentUser");

  //chưa đăng nhập
  if(!currentUser){
    alert("Bạn cần đăng nhập trước khi thanh toán!");
    window.location.href = "login.html";
    return; 
  }

  //giỏ hàng trống
  if(gioHang.length === 0){
    alert("Giỏ hàng đang trống!");
    return;
  }

  // hợp lệ
  alert("Thanh toán thành công 🎉");

  // xóa giỏ hàng sau khi thanh toán
  localStorage.removeItem("gioHang");

  // reload lại trang
  location.reload();
}
renderGioHang();
