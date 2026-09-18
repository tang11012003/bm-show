let images=[];
const placeholderImg=`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="#e8e8e8" width="200" height="200"/><text x="100" y="95" text-anchor="middle" font-size="12" fill="#999">示例图片</text><rect x="60" y="105" width="80" height="50" rx="4" fill="#ddd"/><circle cx="85" cy="125" r="8" fill="#bbb"/><path d="M70 150 L100 120 L130 150Z" fill="#ccc"/></svg>')}`;

function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.style.display='block';setTimeout(()=>t.style.display='none',2000)}

function addImage(){
if(images.length>=9){showToast('最多添加9张图片');return}
images.push(placeholderImg);
renderImages();
}

function removeImage(idx){
images.splice(idx,1);
renderImages();
}

function renderImages(){
const grid=document.getElementById('imageGrid');
let html=images.map((img,i)=>`
<div class="img-thumb">
<img src="${img}">
<button class="remove-btn" onclick="removeImage(${i})"><span class="material-icons">close</span></button>
</div>`).join('');
if(images.length<9){
html+=`<div class="add-img-btn" onclick="addImage()"><span class="material-icons">camera_alt</span><span>添加图片</span></div>`;
}
grid.innerHTML=html;
}

function goBack(){
if(document.getElementById('postContent').value.trim()||images.length>0){
if(!confirm('确定要离开吗？已编辑的内容将丢失'))return;
}
history.back();
}

function publish(){
const content=document.getElementById('postContent').value.trim();
if(!content&&images.length===0){
showToast('请输入内容或添加图片');
return;
}
const btn=document.getElementById('publishBtn');
btn.disabled=true;
btn.textContent='发布中…';
setTimeout(()=>{
showToast('发布成功');
setTimeout(()=>{
window.location.href='shequ.html';
},600);
},800);
}