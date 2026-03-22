/* 
Tên: Nguyễn Khánh Trung
Lớp: 24TTH002
MSSV: 24T01010 */
const gohome=document.getElementById("backhome");
gohome.addEventListener("click", () => {
    window.location.href="index.html";
})

const dulieunhan=JSON.parse(localStorage.getItem("dulieutrangchu"));

function hienthichitiet(data) {
    const detailContainer= document.getElementById("noidung");
    detailContainer.innerHTML = `
<div class="product-detail">

  <div class="left">
    <div class="image-container">
      <div id="image-gallery" class="image-gallery"></div>
      <img id="main-image" class="anhchinh" src="${data.image}" alt="${data.name}">
    </div>
  </div>

  <div class="right">
    <h1 class="dataname">${data.name}</h1>
    <p class="mota">${data.mota}</p>

    <div class="buy-box">
      <div class="soluong">
        <span>Số lượng</span>
        <div class="qty-control">
          <button id="minus">-</button>
          <input id="qty" type="text" value="1">
          <button id="plus">+</button>
        </div>
      </div>

      <div class="actions">
        <button class="add-cart">Thêm vào giỏ</button>
</button>
      </div>
    </div>

  </div>
</div>
`;

const btnPlus = document.getElementById("plus");
const btnMinus = document.getElementById("minus");
const qtyInput = document.getElementById("qty");
const btnAdd = document.querySelector(".add-cart");


btnPlus.addEventListener("click", () => {
    qtyInput.value = Number(qtyInput.value) + 1;
});

btnMinus.addEventListener("click", () => {
    let val = Number(qtyInput.value);
    if(val > 1){
        qtyInput.value = val - 1;
    }
});

    const galleryContainer=document.getElementById("image-gallery");

    for (let i = 1; i <= 3; i++) {
  const img = document.createElement("img");
  img.src = `hinhanh/${data.id}/${data.id}_${i}.jpg`;
  img.alt = `${data.name} ${i}`;

  img.onclick = () => {
    document.getElementById("main-image").src = img.src;
  };

  galleryContainer.appendChild(img);
}

} 

hienthichitiet(dulieunhan);
const btnAdd = document.querySelector(".add-cart");
const qtyInput = document.getElementById("qty");

btnAdd.addEventListener("click", () => {
    let sl = Number(qtyInput.value);

    if(sl <= 0 || isNaN(sl)){
        alert("Số lượng không hợp lệ");
        return;
    }

    themVaoGio(dulieunhan.id, sl);
});
capNhatSoLuongIcon();