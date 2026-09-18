const methods=[
{value:'studentCard',label:'学生证'},
{value:'classGroup',label:'班级群截图'},
{value:'paymentReceipt',label:'缴费凭证'},
{value:'inviteCode',label:'邀请码'}
];

let selectedMethod='inviteCode';
let submitting=false;
let verificationStatus=null; // null | 'pending' | 'approved' | 'rejected'

function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.style.display='block';setTimeout(()=>t.style.display='none',2000)}

function render(){
const isInvite=selectedMethod==='inviteCode';

let methodContent='';
if(isInvite){
methodContent=`
<div class="method-content">
<div style="font-size:13px;color:var(--text3);margin-bottom:10px">输入已认证家长分享的邀请码</div>
<input class="invite-input" id="inviteInput" maxlength="10" placeholder="请输入邀请码" autocomplete="off">
</div>`;
}else{
const labels={'studentCard':'学生证照片','classGroup':'班级群截图','paymentReceipt':'缴费凭证截图'};
methodContent=`
<div class="method-content">
<div class="upload-area" onclick="showToast('选择图片上传（演示）')">
<span class="material-icons">photo_camera</span>
<div class="upload-text">
<div class="ut-title">上传${labels[selectedMethod]||'材料截图'}</div>
<div class="ut-sub">点击拍照或从相册选择</div>
</div>
<span class="material-icons" style="color:var(--hint);font-size:20px">chevron_right</span>
</div>
</div>`;
}

let statusHtml='';
if(verificationStatus==='pending'){
statusHtml=`<div class="status-banner" style="background:rgba(255,152,0,.1)"><span class="material-icons" style="color:#FF9800">info</span><div class="sb-text" style="color:#E65100">审核中，请耐心等待（预计≤30分钟）</div></div>`;
}else if(verificationStatus==='approved'){
statusHtml=`<div class="status-banner" style="background:rgba(67,160,71,.1)"><span class="material-icons" style="color:var(--keep)">check_circle</span><div class="sb-text" style="color:#2E7D32">已通过认证，已解锁全部功能</div></div>`;
}else if(verificationStatus==='rejected'){
statusHtml=`<div class="status-banner" style="background:rgba(229,57,53,.08)"><span class="material-icons" style="color:var(--urgent)">cancel</span><div class="sb-text" style="color:#C62828">认证被驳回：材料不清晰，请重新提交</div></div>`;
}

document.getElementById('pageBody').innerHTML=`
<div class="section-heading">请选择一种方式完成家长身份确认</div>
<div class="radio-list">
${methods.map(m=>`
<div class="radio-item${m.value===selectedMethod?' active':''}" onclick="selectMethod('${m.value}')">
<div class="radio-circle"></div>
<span class="radio-label">${m.label}</span>
</div>`).join('')}
</div>
${methodContent}
<button class="submit-btn" id="submitBtn" onclick="doSubmit()"${submitting?' disabled':''}>${submitting?'提交中…':'提交认证'}</button>
${statusHtml}
`;
}

function selectMethod(val){
selectedMethod=val;
render();
}

function doSubmit(){
const isInvite=selectedMethod==='inviteCode';
if(isInvite){
const input=document.getElementById('inviteInput');
const code=input?input.value.trim():'';
if(!code){showToast('请输入邀请码');return}
submitting=true;
render();
setTimeout(()=>{
submitting=false;
if(code.toUpperCase()==='PAIDU8'||code.length>=4){
verificationStatus='approved';
showToast('邀请码认证成功，已解锁全部功能');
render();
setTimeout(()=>{window.location.href='wode.html'},1500);
}else{
verificationStatus=null;
showToast('邀请码无效，请重新输入');
render();
}
},1000);
}else{
submitting=true;
render();
setTimeout(()=>{
submitting=false;
verificationStatus='pending';
showToast('已提交，审核中（预计≤30分钟）');
render();
},1000);
}
}

render();