// 潛森｜六組分類版：搜尋、排序、詳情彈窗
const sections = [
  "Begonia sect. Platycentrum",
  "Begonia sect. Diploclinium",
  "Begonia sect. Coelocentrum",
  "Begonia sect. Petermannia",
  "Adiantum",
  "Bucephalandra"
];

// 示範資料（請替換為你的清單與圖片）
const PLANTS = [
  {id:"p01", section:"Begonia sect. Platycentrum", name:"台灣秋海棠（示例）", latin:"Begonia formosana", difficulty:2, price:480, img:"", note:"示範備註。"},
  {id:"p02", section:"Begonia sect. Diploclinium", name:"長葉秋海棠（示例）", latin:"Begonia longifolia", difficulty:3, price:520, img:"", note:"示範備註。"},
  {id:"p03", section:"Begonia sect. Coelocentrum", name:"洞穴秋海棠（示例）", latin:"Begonia cavicola", difficulty:4, price:980, img:"", note:"示範備註。"},
  {id:"p04", section:"Begonia sect. Petermannia", name:"斑葉秋海棠（示例）", latin:"Begonia maculata", difficulty:2, price:420, img:"", note:"示範備註。"},
  {id:"p05", section:"Adiantum", name:"鐵線蕨（示例）", latin:"Adiantum capillus-veneris", difficulty:3, price:260, img:"", note:"示範備註。"},
  {id:"p06", section:"Bucephalandra", name:"辣椒榕（示例）", latin:"Bucephalandra sp.", difficulty:2, price:350, img:"", note:"示範備註。"}
];

const $ = (sel, root=document)=>root.querySelector(sel);

function buildNav(){
  const nav = document.querySelector(".nav-links");
  nav.innerHTML = sections.map(s=>`<a href="#sec-${cssId(s)}">${s}</a>`).join("");
}
function cssId(s){ return s.replaceAll(/\s|\.|\(|\)/g, "_"); }
function star(n){ return "★".repeat(n) + "☆".repeat(5-n); }

function renderAll(){
  const q = document.getElementById("q").value.trim().toLowerCase();
  const sortBy = document.getElementById("sort").value;
  const filtered = PLANTS.filter(p => !q || (p.name + " " + p.latin + " " + (p.note||"")).toLowerCase().includes(q));

  filtered.sort((a,b)=>{
    if(sortBy==='name') return a.name.localeCompare(b.name, 'zh-Hant');
    if(sortBy==='difficulty') return a.difficulty - b.difficulty;
    if(sortBy==='price') return a.price - b.price;
    return 0;
  });

  sections.forEach(sec => {
    const el = document.getElementById(`list-${cssId(sec)}`);
    const list = filtered.filter(p=>p.section===sec);
    el.innerHTML = "";
    list.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="thumb">${item.img ? `<img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover">` : 'No Image'}</div>
        <div>
          <div class="title">${item.name}</div>
          <div class="latin">${item.latin}</div>
          <div class="meta"><span class="chip">難度：${star(item.difficulty)}</span></div>
        </div>
        <div class="price">NT$ ${item.price}</div>`;
      card.addEventListener('click', ()=>openModal(item));
      el.appendChild(card);
    });
  });
}

function openModal(item){
  document.getElementById("m-title").textContent = item.name;
  document.getElementById("m-common").textContent = item.name;
  document.getElementById("m-latin").textContent = item.latin;
  document.getElementById("m-thumb").innerHTML = item.img ? `<img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover">` : 'No Image';
  document.getElementById("m-meta").innerHTML = `<span class="chip">難度：${star(item.difficulty)}</span>`;
  document.getElementById("m-desc").textContent = item.note || "";
  modal.showModal();
}

document.addEventListener('DOMContentLoaded', ()=>{
  buildNav();
  renderAll();
  document.getElementById("q").addEventListener('input', renderAll);
  document.getElementById("sort").addEventListener('change', renderAll);
  document.getElementById('year').textContent = new Date().getFullYear();
});
