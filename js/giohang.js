/* 
Tên: Nguyễn Khánh Trung
Lớp: 24TTH002
MSSV: 24T01010 */
const gohome=document.getElementById("backhome");
gohome.addEventListener("click", () => {
    window.location.href="index.html";
})

const tbody = document.getElementById("gioHangBody");

function layGioHang(){ //lấy dữ liệu từ localstorage 
  return JSON.parse(localStorage.getItem("gioHang")) || [];
}

function formatVND(x){
  return x.toLocaleString("vi-VN") + " đ";
}

function renderGioHang(){ //hiển thị giỏ hàng
    const gioHang = layGioHang(); //lấy giỏ hàng
  tbody.innerHTML = ""; //xóa bảng cũ
  let tong = 0;

  gioHang.forEach((item, index)=>{ // duyệt từng sản phẩm
    const tr = document.createElement("tr");

    const thanhTien = item.soLuong * item.gia; //tính tiền
    tong += thanhTien; // tổng
//gắn nội dung vào dòng
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

    tbody.appendChild(tr); //gắn vào bảng
  });

  document.getElementById("tongTien").textContent = formatVND(tong); // tổng tiền
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

    // Kiểm tra giỏ hàng trống
    if(gioHang.length === 0){
        alert("Giỏ hàng đang trống!");
        return;
    }

    // Hỏi xác nhận
    let xacNhan = confirm("Bạn có chắc muốn xóa hết?");

    if(xacNhan){
        gioHang = [];
        capNhat(gioHang);
    }
}
//lưu lại giỏ hàng , tạo lại giao diện, cập nhật iccon giỏ hàng
//tự động cập nhật khi có thay đổi
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
