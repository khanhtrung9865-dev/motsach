/* 
Tên: Nguyễn Khánh Trung
Lớp: 24TTH002
MSSV: 24T01010 */
const trangchinh = document.getElementById("main");

function hienThiSach(danhSach){
    trangchinh.innerHTML = "";
    danhSach.forEach(book =>{
        const card=document.createElement("div");
        card.classList.add("card");

        card.innerHTML=`
        <img class="anh" src="${book.image}" alt="${book.name}">
        <h2 class="tensach">${book.name}</h2>
        <p> Tác giả: ${book.tacgia}</p>
        <p class="giaban"> Giá bán: ${book.gia.toLocaleString('vi-VN')}đ</p>

        <div class="soluong">
        <button class="minus">-</button>
        <input class="qty" type="text" value="1">
        <button class="plus">+</button>
        </div>

        <div class="actions">
            <button class="giohang">Thêm vào giỏ</button>
        </div>
        `;

        const btnPlus = card.querySelector(".plus");
        const btnMinus = card.querySelector(".minus");
        const qtyInput = card.querySelector(".qty");
        const btnGio = card.querySelector(".giohang");
        const img = card.querySelector(".anh");

        btnPlus.onclick = ()=> qtyInput.value = Number(qtyInput.value)+1;

        btnMinus.onclick = ()=>{
            let val = Number(qtyInput.value);
            if(val>1) qtyInput.value = val-1;
        };

        btnGio.onclick = ()=>{
            let sl = Number(qtyInput.value);
            if(sl<=0) return alert("Số lượng không hợp lệ");
            themVaoGio(book.id, sl);
        };

        img.onclick = ()=>{
            localStorage.setItem("dulieutrangchu", JSON.stringify(book));
            window.location.href = "chitiet.html";
        };

        trangchinh.appendChild(card);
    });
}
hienThiSach(books);

let currentUser = localStorage.getItem("currentUser");

if (currentUser) {
    // đã đăng nhập
    document.querySelector(".nutlogin").style.display = "none";
    document.getElementById("logoutbtn").style.display = "inline-block";
} else {
    // chưa đăng nhập
    document.querySelector(".nutlogin").style.display = "block";
    document.getElementById("logoutbtn").style.display = "none";
}
document.getElementById("logoutbtn").addEventListener("click", function() {
    localStorage.removeItem("currentUser");

    document.querySelector(".nutlogin").style.display = "block";
    document.getElementById("logoutbtn").style.display = "none";
    
});
capNhatSoLuongIcon();
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const ketQua = books.filter(book =>
        book.name.toLowerCase().includes(keyword)
    );

    hienThiSach(ketQua);
});
const categoryItems = document.querySelectorAll(".sidebar li");

categoryItems.forEach(item => {
    item.addEventListener("click", () => {
        const category = item.getAttribute("data-category");

        let ketQua;

        if(category === "all"){
            ketQua = books;
        } else {
            ketQua = books.filter(book => 
                book.theloai === category
            );
        }

        currentPage = 1; // reset
        hienThiSach(ketQua);
    });
});
const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {

        let ketQua;

        if(index === 0){
            ketQua = books; // Trang chủ
        }
        else if(index === 1){
            ketQua = books.slice(0, 6); // Sách mới
        }
        else if(index === 2){
            ketQua = books.slice(6, 12); // bán chạy
        }
        else if(index === 3){
            ketQua = books.filter(b => b.gia < 900000);
        }
        else{
            alert("Trang này chưa làm 😄");
            return;
        }

        currentPage = 1;
        hienThiSach(ketQua);
    });
});
