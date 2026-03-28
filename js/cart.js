/* 
Tên: Nguyễn Khánh Trung
Lớp: 24TTH002
MSSV: 24T01010 */
let gioHang = JSON.parse(localStorage.getItem("gioHang")) || []; //lấy giỏ hàng, nếu chưa có tạo mảng rỗng

function luuGioHang(){ //lưu mỗi khi có thay đổi
    localStorage.setItem("gioHang", JSON.stringify(gioHang));
}

function themVaoGio(id, soLuong){ 
    const book = books.find(b => b.id === id); //lấy thông tin
    const item = gioHang.find(i => i.id === id); // kiểm tra sản phẩm có trong giỏ chưa

    if(item){
        item.soLuong += soLuong; //đã có, + thêm
    } else {// chưa có, tạo mới
        gioHang.push({
            id: book.id,
            name: book.name,
            gia: book.gia,
            image: book.image,
            soLuong: soLuong
        });
    }

    luuGioHang(); // lưu
    capNhatSoLuongIcon(); //cập nhật icon
    alert("Đã thêm vào giỏ hàng"); //thông báo
}
function formatVND(x){
    return x.toLocaleString("vi-VN") + " đ";
}
function capNhatSoLuongIcon(){
    const gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];
    let tong = 0;

    gioHang.forEach(item=>{
        tong += item.soLuong;
    });

    const el = document.getElementById("cart-count");
    if(el){
        el.textContent = tong;
    }
}