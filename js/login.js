let countdown = 0;
let currentStep = 1;
const phoneInput = document.getElementById('loginPhone');
const codeInput = document.getElementById('loginCode');
const smsBtn = document.getElementById('smsBtn');

// Step 2 倒计时变量
let step2Countdown = 5;
let step2Timer = null;

// Phone formatting 3-4-4
function getRawPhone(){
  return phoneInput.value.replace(/\D/g,'');
}

phoneInput.addEventListener('input', ()=>{
  let val = getRawPhone();
  if(val.length>11) val=val.slice(0,11);
  if(val.length>7) val=val.replace(/^(\d{3})(\d{4})(\d{1,4})$/,'$1 $2 $3');
  else if(val.length>3) val=val.replace(/^(\d{3})(\d{1,4})$/,'$1 $2');
  phoneInput.value=val;
  smsBtn.disabled = !(getRawPhone().length===11 && countdown===0);
});

// Toast
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.add('show');
  setTimeout(()=>{t.classList.remove('show')},2200);
}

// SMS countdown
function sendSms(){
  if(countdown>0)return;
  if(getRawPhone().length<11){showToast('请输入正确的11位手机号');return}
  showToast('验证码已发送（测试码: 888888）');
  countdown=60;
  smsBtn.disabled=true;
  const timer=setInterval(()=>{
    countdown--;
    smsBtn.textContent=`${countdown}s 后重发`;
    if(countdown<=0){
      clearInterval(timer);
      smsBtn.textContent='获取验证码';
      if(getRawPhone().length===11) smsBtn.disabled=false;
    }
  },1000);
}

// Step transitions
function goToStep(n){
  const prev=document.getElementById('step'+currentStep);
  const next=document.getElementById('step'+n);
  prev.classList.remove('active');
  prev.classList.add('exit-left');
  setTimeout(()=>{prev.classList.remove('exit-left')},400);
  next.classList.add('active');
  currentStep=n;
}

// Step 2 按钮 5 秒强制倒计时
function startStep2Countdown() {
  const btn = document.getElementById('step2NextBtn');
  if(!btn) return;
  step2Countdown = 5;
  btn.disabled = true;
  btn.textContent = `下一步：定制孩子学情 (${step2Countdown}s)`;

  if(step2Timer) clearInterval(step2Timer);

  step2Timer = setInterval(() => {
    step2Countdown--;
    if (step2Countdown > 0) {
      btn.textContent = `下一步：定制孩子学情 (${step2Countdown}s)`;
    } else {
      clearInterval(step2Timer);
      btn.disabled = false;
      btn.textContent = '下一步：定制孩子学情';
    }
  }, 1000);
}

// Login
function doLogin(){
  const raw=getRawPhone();
  const code=codeInput.value.trim();
  if(!raw||raw.length<11){showToast('请输入正确的手机号');return}
  if(!code||code.length<4){showToast('请输入正确的验证码');return}
  if(code==='888888'){
    showToast('验证成功，欢迎新用户！');
    setTimeout(()=>{
      goToStep(2);
      startStep2Countdown(); // 进入 Step 2 并开启 5s 强制等待
    },800);
  }else{
    showToast('登录成功');
    setTimeout(()=>{window.location.href='fenxi.html'},800);
  }
}

// Step 2 -> Step 3
function goStep3(){
  if(step2Countdown > 0) return; // 倒计时未结束防止误触
  goToStep(3);
  renderStep3();
}

// Step 3: Certification
let certMethod='invite_code';
let certUploaded=false;
const certOptions=[
  {value:'student_card', label:'学生证 / 校园卡'},
  {value:'class_group', label:'班级群截图'},
  {value:'payment', label:'缴费凭证'},
  {value:'invite_code', label:'邀请码'}
];

function renderStep3(){
  let radioHtml=certOptions.map(opt=>{
    const sel=certMethod===opt.value?'selected':'';
    return `<div class="radio-item ${sel}" onclick="pickCertMethod('${opt.value}')"><div class="radio-dot"><div class="radio-dot-inner"></div></div><span class="radio-label">${opt.label}</span></div>`;
  }).join('');
  document.getElementById('s3RadioList').innerHTML=radioHtml;

  let formHtml='';
  if(certMethod==='invite_code'){
    formHtml=`<div class="s3-form-area"><div class="input-label">邀请码</div><input class="input-field" id="inviteCodeInput" maxlength="10" placeholder="请输入邀请码" style="text-transform:uppercase;letter-spacing:1px;font-weight:600"></div>`;
  }else{
    formHtml=`<div class="s3-form-area"><div class="upload-card${certUploaded?' done':''}" onclick="doCertUpload()"><span class="material-icons">${certUploaded?'check_circle':'photo_camera'}</span><div style="flex:1"><div style="font-size:14px;font-weight:500;color:var(--text1)">${certUploaded?'已选择图片':'上传材料截图'}</div><div style="font-size:12px;color:var(--text3);margin-top:2px">${certUploaded?'点击可重新选择':'点击拍照或从相册选取'}</div></div></div></div>`;
  }
  document.getElementById('s3Form').innerHTML=formHtml;
}

function pickCertMethod(val){
  certMethod=val;
  certUploaded=false;
  renderStep3();
}

function doCertUpload(){
  certUploaded=true;
  renderStep3();
}

// Step 3: Skip
function skipCert(){
  showToast('已跳过，可稍后在"我的"中认证');
  setTimeout(()=>{window.location.href='fenxi.html'},800);
}

// Step 3: Submit
function doCert(){
  if(certMethod==='invite_code'){
    const code=document.getElementById('inviteCodeInput').value.trim().toUpperCase();
    if(!code){showToast('请输入邀请码');return}
    if(code.length<4){showToast('邀请码格式不正确');return}
    const btn=document.getElementById('s3SubmitBtn');
    btn.disabled=true;btn.textContent='验证中…';
    setTimeout(()=>{
      showToast('邀请码认证成功，已解锁全部功能');
      setTimeout(()=>{window.location.href='fenxi.html?is_certified=1'},800);
    },800);
  }else{
    if(!certUploaded){showToast('请先上传材料截图');return}
    const btn=document.getElementById('s3SubmitBtn');
    btn.disabled=true;btn.textContent='提交中…';
    setTimeout(()=>{
      showToast('已提交，审核中（预计≤30分钟）');
      setTimeout(()=>{window.location.href='fenxi.html'},800);
    },1000);
  }
}