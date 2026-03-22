/* 
Tên: Nguyễn Khánh Trung
Lớp: 24TTH002
MSSV: 24T01010 */
let gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];

function luuGioHang(){
    localStorage.setItem("gioHang", JSON.stringify(gioHang));
}

function themVaoGio(id, soLuong){
    const book = books.find(b => b.id === id);
    const item = gioHang.find(i => i.id === id);

    if(item){
        item.soLuong += soLuong;
    } else {
        gioHang.push({
            id: book.id,
            name: book.name,
            gia: book.gia,
            image: book.image,
            soLuong: soLuong
        });
    }

    luuGioHang();
    capNhatSoLuongIcon();
    alert("Đã thêm vào giỏ hàng");
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