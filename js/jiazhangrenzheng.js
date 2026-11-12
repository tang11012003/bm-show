let method='student_card';
let submitting=false;
let uploadDone=false;
let verificationStatus='approved';
let reviewNote='';

const options=[
  {value:'student_card', label:'学生证 / 校园卡'},
  {value:'class_group', label:'班级群截图'},
  {value:'payment', label:'缴费凭证'},
  {value:'invite_code', label:'邀请码'}
];

function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.style.display='block';setTimeout(()=>t.style.display='none',2200)}

function isInvite(){return method==='invite_code'}

function render(){
const pb=document.getElementById('pageBody');
let html='';

html+=`<div class="section-label">选择认证方式</div>`;
html+=`<div class="section-desc">完成家长身份认证后即可使用全部功能</div>`;

options.forEach(opt=>{
  const sel=method===opt.value?'selected':'';
  html+=`<div class="radio-item ${sel}" onclick="selectMethod('${opt.value}')">
    <div class="radio-dot"><div class="radio-dot-inner"></div></div>
    <span class="radio-label">${opt.label}</span>
  </div>`;
});

if(isInvite()){
  html+=`<div class="form-area">
    <div class="input-label">邀请码</div>
    <input class="input-field" id="codeInput" maxlength="10" placeholder="请输入邀请码">
  </div>`;
}else{
  html+=`<div class="form-area">
    <div class="upload-card${uploadDone?' done':''}" onclick="doUpload()">
      <span class="material-icons">${uploadDone?'check_circle':'photo_camera'}</span>
      <div class="uc-text">
        <div class="uc-title">${uploadDone?'已选择图片':'上传材料截图'}</div>
        <div class="uc-sub">${uploadDone?'点击可重新选择':'点击拍照或从相册选取'}</div>
      </div>
    </div>
  </div>`;
}

html+=`<button class="submit-btn" id="submitBtn" onclick="doSubmit()"${submitting?' disabled':''}>${submitting?'提交中…':'提交认证'}</button>`;

if(verificationStatus){
  let color,icon,text;
  if(verificationStatus==='approved'){
    color='var(--keep)'; icon='check_circle'; text='已通过认证';
  }else if(verificationStatus==='pending'){
    color='var(--attention)'; icon='hourglass_top'; text='审核中，请耐心等待';
  }else{
    color='var(--urgent)'; icon='cancel'; text='认证被驳回：'+(reviewNote||'材料不清晰');
  }
  html+=`<div class="status-banner" style="background:${color}1F">
    <span class="material-icons" style="color:${color}">${icon}</span>
    <span class="sb-text" style="color:${color}">${text}</span>
  </div>`;
}

pb.innerHTML=html;
}

function selectMethod(val){
  method=val;
  uploadDone=false;
  render();
}

function doUpload(){
  uploadDone=true;
  render();
}

function doSubmit(){
  if(submitting)return;
  if(isInvite()){
    const code=document.getElementById('codeInput').value.trim().toUpperCase();
    if(!code){showToast('请输入邀请码');return}
    if(code.length<4){showToast('邀请码格式不正确');return}
    submitting=true;
    render();
    setTimeout(()=>{
      submitting=false;
      if(code==='PAIDU8'||code.length>=4){
        verificationStatus='approved';
        showToast('邀请码认证成功，已解锁全部功能');
      }else{
        showToast('邀请码无效');
      }
      render();
    },800);
  }else{
    if(!uploadDone){showToast('请先上传材料截图');return}
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