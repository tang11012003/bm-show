const paperImgSvg=`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="560" viewBox="0 0 400 560"><rect fill="#f9f9f9" width="400" height="560"/><rect x="30" y="30" width="340" height="40" rx="4" fill="#eee"/><text x="200" y="56" text-anchor="middle" font-size="16" fill="#888">数学期中考试试卷</text><line x1="30" y1="90" x2="370" y2="90" stroke="#ddd" stroke-width="1"/><text x="40" y="120" font-size="13" fill="#555">一、选择题（每题5分，共30分）</text><text x="40" y="150" font-size="12" fill="#666">1. 已知集合A={1,2,3}，B={2,3,4}，则A∩B=</text><text x="40" y="175" font-size="12" fill="#666">2. 函数f(x)=2x²-3x+1的最小值为</text><text x="40" y="200" font-size="12" fill="#666">3. sin60°·cos30°+cos60°·sin30°=</text><circle cx="355" cy="150" r="10" fill="none" stroke="#E53935" stroke-width="2"/><text x="355" y="155" text-anchor="middle" font-size="10" fill="#E53935">✗</text><text x="40" y="240" font-size="13" fill="#555">二、填空题（每题5分，共20分）</text><text x="40" y="270" font-size="12" fill="#666">7. 等差数列{an}中，a1=2，d=3，则a10=___</text><text x="40" y="295" font-size="12" fill="#666">8. 向量a=(1,2)，b=(3,-1)，则a·b=___</text><circle cx="355" cy="270" r="10" fill="none" stroke="#E53935" stroke-width="2"/><text x="355" y="275" text-anchor="middle" font-size="10" fill="#E53935">✗</text><text x="40" y="335" font-size="13" fill="#555">三、解答题（每题10分，共50分）</text><text x="40" y="365" font-size="12" fill="#666">11. 已知二次函数f(x)=ax²+bx+c，求...</text><rect x="50" y="380" width="280" height="60" rx="3" fill="#fafafa" stroke="#eee"/><text x="60" y="400" font-size="11" fill="#777">解：由题意得...</text><text x="60" y="420" font-size="11" fill="#777">∴ f(x)的最小值为-4/3</text><circle cx="355" cy="400" r="10" fill="none" stroke="#43A047" stroke-width="2"/><text x="355" y="405" text-anchor="middle" font-size="10" fill="#43A047">✓</text></svg>')}`;

let hasImage=false;
let examType='big';
let selectedRecentExam='';

// Historical exam names (simulated, would come from backend)
const recentBigExams=[
{name:'期中综合考试',date:'2026-07-15'},
{name:'一模考试',date:'2026-06-20'},
{name:'二模考试',date:'2026-05-18'},
{name:'月考（三）',date:'2026-06-10'},
{name:'期末考试',date:'2026-04-22'}
];
const recentSmallExams=[
{name:'单元测试',date:'2026-07-10'},
{name:'周测',date:'2026-07-08'},
{name:'随堂小测',date:'2026-07-05'}
];

function fmtDate(d){return d.toISOString().slice(0,10)}
function getDateOffset(offset){const d=new Date();d.setDate(d.getDate()+offset);return fmtDate(d)}

function pickImage(){
hasImage=true;
const area=document.getElementById('uploadArea');
area.classList.remove('empty');
area.innerHTML=`<img src="${paperImgSvg}" style="width:100%;height:100%;object-fit:cover">`;
}

function selectExamType(type,el){
examType=type;
document.querySelectorAll('.exam-type-option').forEach(o=>o.classList.remove('active'));
el.classList.add('active');
selectedRecentExam='';
renderRecentExams();
}

function renderRecentExams(){
const list=examType==='big'?recentBigExams:recentSmallExams;
const container=document.getElementById('recentExams');
container.innerHTML=`
<div class="re-label"><span class="material-icons">history</span>最近考试快捷选择</div>
<div class="re-list">
${list.map(item=>`<span class="re-chip${selectedRecentExam===item.name?' active':''}" onclick="selectRecentExam('${item.name}','${item.date}',this)">${item.name}</span>`).join('')}
</div>`;
}

function selectRecentExam(name,date,el){
if(selectedRecentExam===name){
  selectedRecentExam='';
  document.getElementById('examName').value='';
  document.getElementById('examDate').value=getDateOffset(-1);
  document.getElementById('examDate').disabled=false;
  el.classList.remove('active');
}else{
  selectedRecentExam=name;
  document.getElementById('examName').value=name;
  document.getElementById('examDate').value=date;
  document.getElementById('examDate').disabled=true;
  document.querySelectorAll('.re-chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
}
}

function clearQuickSelect(){
selectedRecentExam='';
document.getElementById('examDate').disabled=false;
document.querySelectorAll('.re-chip').forEach(c=>c.classList.remove('active'));
}

function doUpload(){
if(!hasImage){alert('请先拍照或选择试卷图片');return}
const btn=document.getElementById('uploadBtn');
btn.disabled=true;
btn.textContent='正在识别题号与批改标记…';
// Store upload context for the confirm page
const uploadCtx={
  subject: document.getElementById('subjectSelect').value,
  examName: document.getElementById('examName').value.trim() || '未命名考试',
  examType: examType,
  examDate: document.getElementById('examDate').value,
  uploadedAt: Date.now()
};
localStorage.setItem('uploadContext', JSON.stringify(uploadCtx));
setTimeout(()=>{
window.location.href='gouxuancuoti.html';
},1200);
}

// Initialize
selectExamType('big',document.querySelector('.exam-type-option.active'));
document.getElementById('examDate').value=getDateOffset(-1);
renderRecentExams();