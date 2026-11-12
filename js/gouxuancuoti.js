const paperImgSvg=`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="560" viewBox="0 0 400 560"><rect fill="#f9f9f9" width="400" height="560"/><rect x="30" y="30" width="340" height="40" rx="4" fill="#eee"/><text x="200" y="56" text-anchor="middle" font-size="16" fill="#888">数学期中考试试卷</text><line x1="30" y1="90" x2="370" y2="90" stroke="#ddd" stroke-width="1"/><text x="40" y="120" font-size="13" fill="#555">一、选择题（每题5分，共30分）</text><text x="40" y="150" font-size="12" fill="#666">1. 已知集合A={1,2,3}，B={2,3,4}，则A∩B=</text><text x="40" y="175" font-size="12" fill="#666">2. 函数f(x)=2x²-3x+1的最小值为</text><text x="40" y="200" font-size="12" fill="#666">3. sin60°·cos30°+cos60°·sin30°=</text><circle cx="355" cy="150" r="10" fill="none" stroke="#E53935" stroke-width="2"/><text x="355" y="155" text-anchor="middle" font-size="10" fill="#E53935">✗</text><text x="40" y="240" font-size="13" fill="#555">二、填空题（每题5分，共20分）</text><text x="40" y="270" font-size="12" fill="#666">7. 等差数列{an}中，a1=2，d=3，则a10=___</text><text x="40" y="295" font-size="12" fill="#666">8. 向量a=(1,2)，b=(3,-1)，则a·b=___</text><circle cx="355" cy="270" r="10" fill="none" stroke="#E53935" stroke-width="2"/><text x="355" y="275" text-anchor="middle" font-size="10" fill="#E53935">✗</text><text x="40" y="335" font-size="13" fill="#555">三、解答题（每题10分，共50分）</text><text x="40" y="365" font-size="12" fill="#666">11. 已知二次函数f(x)=ax²+bx+c，求...</text><rect x="50" y="380" width="280" height="60" rx="3" fill="#fafafa" stroke="#eee"/><text x="60" y="400" font-size="11" fill="#777">解：由题意得...</text><text x="60" y="420" font-size="11" fill="#777">∴ f(x)的最小值为-4/3</text><circle cx="355" cy="400" r="10" fill="none" stroke="#43A047" stroke-width="2"/><text x="355" y="405" text-anchor="middle" font-size="10" fill="#43A047">✓</text></svg>')}`;

// Read upload context from previous page
const uploadCtx=JSON.parse(localStorage.getItem('uploadContext')||'null');
const currentSubject=uploadCtx?uploadCtx.subject:'数学';
const currentExamName=uploadCtx?uploadCtx.examName:'期中考试';
const currentExamType=uploadCtx?uploadCtx.examType:'big';
const currentExamDate=uploadCtx?uploadCtx.examDate:'';

// Historical exam registry (simulated — in real app from backend)
const examRegistry=[
{name:'期中综合考试',date:'2026-07-15',subjects:['数学','英语','物理']},
{name:'一模考试',date:'2026-06-20',subjects:['数学','物理']},
{name:'月考（三）',date:'2026-06-10',subjects:['数学']},
{name:'二模考试',date:'2026-05-18',subjects:['数学','英语','物理','化学']},
{name:'期末考试',date:'2026-04-22',subjects:['数学','语文','英语','物理','化学','生物']}
];

// Also show the exam date context in the confirm page header
function formatDateLabel(dateStr){
if(!dateStr)return '';
const d=new Date(dateStr);
const today=new Date();today.setHours(0,0,0,0);
const diff=Math.round((today-d)/(1000*60*60*24));
if(diff===0)return '今天';
if(diff===1)return '昨天';
if(diff===2)return '前天';
return dateStr;
}

// Mock OCR scan result - 15 questions grouped by type
let questions=[];
const origWrongCount=4;
const questionGroups=[
{label:'一、选择题',start:1,end:12},
{label:'二、填空题',start:13,end:15}
];
function initQuestions(){
questions=[];
for(let i=1;i<=15;i++){
const isWrong=(i===1||i===4||i===8||i===11);
questions.push({num:i,wrong:isWrong,isNew:false});
}
}
initQuestions();

function getWrongCount(){return questions.filter(q=>q.wrong).length}

function render(){
const total=questions.length;
const wrongCount=getWrongCount();
let groupsHtml='';
questionGroups.forEach(g=>{
const groupQs=questions.filter(q=>q.num>=g.start&&q.num<=g.end);
if(groupQs.length===0)return;
groupsHtml+=`<div style="font-size:13px;font-weight:600;color:var(--text1);margin:12px 0 8px">${g.label}</div><div class="chip-grid">`;
groupQs.forEach(q=>{
const i=questions.indexOf(q);
groupsHtml+=`<div class="chip ${q.wrong?'chip-wrong':'chip-correct'}${q.isNew?' chip-new':''}" onclick="toggleQ(${i})">${q.num}</div>`;
});
groupsHtml+=`</div>`;
});
// New questions that don't belong to any group
const ungroupedQs=questions.filter(q=>!questionGroups.some(g=>q.num>=g.start&&q.num<=g.end));
if(ungroupedQs.length>0){
groupsHtml+=`<div style="font-size:13px;font-weight:600;color:var(--text1);margin:12px 0 8px">手动添加</div><div class="chip-grid">`;
ungroupedQs.forEach(q=>{
const i=questions.indexOf(q);
groupsHtml+=`<div class="chip ${q.wrong?'chip-wrong':'chip-correct'}${q.isNew?' chip-new':''}" onclick="toggleQ(${i})">${q.num}</div>`;
});
groupsHtml+=`</div>`;
}
let html=`
<div class="image-preview" onclick="zoomImage()">
<img src="${paperImgSvg}">
<div class="zoom-hint">点击放大</div>
</div>
<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
<span style="font-size:12px;padding:2px 8px;border-radius:4px;background:rgba(21,101,194,.1);color:#1565C0;font-weight:600">${currentSubject}</span>
<span style="font-size:13px;color:var(--text2);font-weight:500">${currentExamName}</span>
${currentExamDate?`<span style="font-size:11px;color:var(--hint);margin-left:auto">${formatDateLabel(currentExamDate)}</span>`:''}
</div>
<div class="stats-text">共识别出 ${total} 道题，算法判断错题 ${origWrongCount} 道</div>
${wrongCount!==origWrongCount?`<div class="stats-changed">当前标记错题 ${wrongCount} 道</div>`:'<div style="margin-bottom:10px"></div>'}
<div class="hint" style="margin-bottom:4px">点击切换对/错状态：</div>
${groupsHtml}
<div class="chip-grid" style="margin-top:10px"><div class="chip chip-add" onclick="showAddDialog()"><span class="material-icons" style="font-size:18px">add</span></div></div>
<div class="hint" style="margin-top:10px">${total===0?'未识别到题目，请手动添加':'红色=错题  灰色=正确  橙框=手动添加'}</div>
`;
document.getElementById('pageBody').innerHTML=html;
}

function toggleQ(i){
questions[i].wrong=!questions[i].wrong;
render();
}

function zoomImage(){
document.getElementById('zoomImg').src=paperImgSvg;
document.getElementById('zoomOverlay').style.display='flex';
}

function showAddDialog(){
document.getElementById('modalBox').innerHTML=`
<h3 style="font-size:16px;font-weight:600;margin-bottom:14px">添加题号</h3>
<input type="number" id="newQNum" placeholder="输入题号，如 16" style="width:100%;padding:11px 14px;border:1px solid #e0e0e0;border-radius:8px;font-size:14px;outline:none;margin-bottom:16px">
<div style="display:flex;gap:10px;justify-content:flex-end">
<button onclick="hideModal()" style="padding:8px 18px;border-radius:8px;border:none;background:none;font-size:14px;color:#424242;cursor:pointer">取消</button>
<button onclick="confirmAddQ()" style="padding:8px 18px;border-radius:8px;border:none;background:var(--primary);color:#fff;font-size:14px;font-weight:500;cursor:pointer">添加</button>
</div>`;
document.getElementById('modalOverlay').style.display='flex';
setTimeout(()=>document.getElementById('newQNum').focus(),100);
}

function hideModal(){document.getElementById('modalOverlay').style.display='none'}

function confirmAddQ(){
const n=parseInt(document.getElementById('newQNum').value);
if(!n||n<=0){alert('请输入有效题号');return}
if(questions.find(q=>q.num===n)){alert(`题号 ${n} 已存在`);return}
questions.push({num:n,wrong:true,isNew:true});
questions.sort((a,b)=>a.num-b.num);
hideModal();
render();
}

// Duplicate exam name detection
function checkDuplicateExamName(inputName){
const normalized=inputName.trim().replace(/[\s·\-_]+/g,'');
for(const exam of examRegistry){
  const regNorm=exam.name.trim().replace(/[\s·\-_]+/g,'');
  if(normalized===regNorm) return exam;
  // Fuzzy: check if one contains the other or Levenshtein distance <=2
  if(normalized.length>2 && regNorm.length>2){
    if(regNorm.includes(normalized)||normalized.includes(regNorm)) return exam;
    if(levenshtein(normalized,regNorm)<=2) return exam;
  }
}
return null;
}

function levenshtein(a,b){
const m=a.length,n=b.length;
const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));
for(let i=0;i<=m;i++)dp[i][0]=i;
for(let j=0;j<=n;j++)dp[0][j]=j;
for(let i=1;i<=m;i++)for(let j=1;j<=n;j++){
dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:Math.min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1])+1;
}
return dp[m][n];
}

function showDuplicateModal(matchedExam,onUseExisting,onKeepNew){
document.getElementById('modalBox').innerHTML=`
<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
<span class="material-icons" style="font-size:22px;color:var(--orange)">warning_amber</span>
<h3 style="font-size:15px;font-weight:700">检测到相似考试名称</h3>
</div>
<div style="font-size:13px;color:var(--text2);margin-bottom:14px;line-height:1.6">
系统中已存在 <strong>"${matchedExam.name}"</strong>（${matchedExam.date}），已关联科目：${matchedExam.subjects.join('、')}。<br>
是否将本次 <strong>${currentSubject}</strong> 试卷归入此考试？
</div>
<div style="background:#FFF9F6;border-radius:8px;padding:10px 12px;margin-bottom:16px;font-size:12px;color:var(--text3)">
<span class="material-icons" style="font-size:14px;vertical-align:middle;color:var(--primary)">info</span>
归入同一考试可实现跨学科联合诊断，提升分析精度。
</div>
<div style="display:flex;flex-direction:column;gap:8px">
<button onclick="window._dupResolve('existing')" style="width:100%;padding:11px;border-radius:8px;border:none;background:var(--primary);color:#fff;font-size:14px;font-weight:600;cursor:pointer">归入"${matchedExam.name}"</button>
<button onclick="window._dupResolve('new')" style="width:100%;padding:11px;border-radius:8px;border:1px solid var(--divider);background:#fff;color:var(--text2);font-size:14px;cursor:pointer">保持当前名称，作为新考试</button>
</div>`;
document.getElementById('modalOverlay').style.display='flex';
return new Promise(resolve=>{
  window._dupResolve=(choice)=>{
    hideModal();
    resolve(choice);
  };
});
}

async function doConfirm(){
const btn=document.getElementById('confirmBtn');
btn.disabled=true;
btn.textContent='校验中…';

// Check for duplicate exam names
const match=checkDuplicateExamName(currentExamName);
let finalExamName=currentExamName;
if(match && match.name!==currentExamName){
  btn.disabled=false;
  btn.textContent='确认并生成报告';
  const choice=await showDuplicateModal(match);
  if(choice==='existing'){
    finalExamName=match.name;
  }
  btn.disabled=true;
}

btn.textContent='正在生成报告…';
const task={
  examName: finalExamName,
  subject: currentSubject,
  examType: currentExamType,
  examDate: currentExamDate,
  status: 'generating',
  startedAt: Date.now(),
  updatedAt: Date.now(),
  wrongCount: questions.filter(q=>q.wrong).length,
  totalCount: questions.length
};
localStorage.setItem('reportTask', JSON.stringify(task));
setTimeout(()=>{
window.location.href='loading.html';
},600);
}

render();