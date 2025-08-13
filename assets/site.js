// 潛森｜網站腳本：分類渲染、搜尋、排序、詳情彈窗
const PLANTS = [
  // 觀葉
  {id:"a01", section:"觀葉", name:"龜背芋", latin:"Monstera deliciosa", difficulty:2, price:480, img:"", note:"裂葉造型，室內造景首選。"},
  {id:"a02", section:"觀葉", name:"白鶴芋", latin:"Spathiphyllum wallisii", difficulty:2, price:300, img:"", note:"耐陰亦可開白色佛焰苞。"},
  {id:"a03", section:"觀葉", name:"袖珍椰子", latin:"Chamaedorea elegans", difficulty:1, price:260, img:"", note:"辦公室盆栽常見，耐陰好照顧。"},
  // 多肉
  {id:"s01", section:"多肉", name:"熊童子", latin:"Cotyledon tomentosa", difficulty:2, price:180, img:"", note:"葉緣像小熊掌，可愛度爆表。"},
  {id:"s02", section:"多肉", name:"長生草", latin:"Sempervivum tectorum", difficulty:1, price:120, img:"", note:"生命力強，陽台日照位很適合。"},
  {id:"s03", section:"多肉", name:"龜甲牡丹", latin:"Ariocarpus fissuratus", difficulty:5, price:2500, img:"", note:"珍稀收藏，栽培難度高。"},
  // 蕨類
  {id:"f01", section:"蕨類", name:"鹿角蕨", latin:"Platycerium bifurcatum", difficulty:3, price:520, img:"", note:"裝板掛牆很有存在感。"},
  {id:"f02", section:"蕨類", name:"波士頓腎蕨", latin:"Nephrolepis exaltata", difficulty:2, price:220, img:"", note:"羽狀葉瀑布感，需較高濕度。"},
  // 開花
  {id:"b01", section:"開花", name:"非洲菫", latin:"Saintpaulia ionantha", difficulty:3, price:220, img:"", note:"室內也能開花的小巧選擇。"},
  {id:"b02", section:"開花", name:"孔雀木", latin:"Polyscias fruticosa", difficulty:2, price:350, img:"", note:"葉形優雅，偶見小花。"},
];

const sections = ["觀葉","多肉","蕨類","開花"];

const $ = (sel, root=document)=>root.querySelector(sel);
const $$ = (sel, root=document)=>Array.from(root.querySelectorAll(sel));

// Build nav links
function buildNav(){
  const nav = $(".nav-links");
  nav.innerHTML = sections.map(s=>`<a href="#sec-${s}">${s}</a>`).join("");
}

function star(n){ return "★".repeat(n) + "☆".repeat(5-n); }

function renderAll(){
  const q = $("#q").value.trim().toLowerCase();
  const sortBy = $("#sort").value;
  const filtered = PLANTS.filter(p => {
    return !q || (p.name + " " + p.latin + " " + (p.note||"")).toLowerCase().includes(q);
  });

  filtered.sort((a,b)=>{
    if(sortBy==='name') return a.name.localeCompare(b.name,'zh-Hant');
    if(sortBy==='difficulty') return a.difficulty - b.difficulty;
    if(sortBy==='price') return a.price - b.price;
    return 0;
  });

  sections.forEach(sec => {
    const el = $(`#list-${sec}`);
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
          <div class="meta">
            <span class="chip">難度：${star(item.difficulty)}</span>
          </div>
        </div>
        <div class="price">NT$ ${item.price}</div>
      `;
      card.addEventListener('click', ()=>openModal(item));
      el.appendChild(card);
    });
  });
}

function openModal(item){
  $("#m-title").textContent = item.name;
  $("#m-common").textContent = item.name;
  $("#m-latin").textContent = item.latin;
  $("#m-thumb").innerHTML = item.img ? `<img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover">` : 'No Image';
  $("#m-meta").innerHTML = `<span class="chip">難度：${star(item.difficulty)}</span>`;
  $("#m-desc").textContent = item.note || "";
  modal.showModal();
}

document.addEventListener('DOMContentLoaded', ()=>{
  buildNav();
  renderAll();
  $("#q").addEventListener('input', renderAll);
  $("#sort").addEventListener('change', renderAll);
  $("#year").textContent = new Date().getFullYear();
});
