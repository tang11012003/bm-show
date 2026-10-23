const students=[
{id:1,name:'张小明',grade:'高三',track:'理科'},
{id:2,name:'刘小五',grade:'高三',track:'理科'}
];
let selectedStudentId=1;

const papers=[
{id:1,studentId:1,examName:'数学期中考试',subject:'数学',date:'2026-07-15',totalQ:15,wrongQ:4,scoreRate:78.5,status:'completed'},
{id:2,studentId:1,examName:'英语期末考试',subject:'英语',date:'2026-06-30',totalQ:20,wrongQ:3,scoreRate:85.2,status:'completed'},
{id:3,studentId:1,examName:'数学月考（三）',subject:'数学',date:'2026-06-20',totalQ:18,wrongQ:5,scoreRate:72.0,status:'completed'},
{id:4,studentId:1,examName:'物理一模',subject:'物理',date:'2026-05-18',totalQ:16,wrongQ:6,scoreRate:68.0,status:'completed'},
{id:5,studentId:1,examName:'数学月考（二）',subject:'数学',date:'2026-05-10',totalQ:15,wrongQ:4,scoreRate:74.5,status:'completed'},
{id:6,studentId:1,examName:'化学单元测试',subject:'化学',date:'2026-04-22',totalQ:12,wrongQ:3,scoreRate:75.0,status:'completed'},
{id:7,studentId:1,examName:'语文模拟考',subject:'语文',date:'2026-04-15',totalQ:10,wrongQ:2,scoreRate:80.0,status:'completed'},
{id:8,studentId:2,examName:'数学期中考试',subject:'数学',date:'2026-07-15',totalQ:15,wrongQ:6,scoreRate:70.0,status:'completed'},
{id:9,studentId:2,examName:'英语月考',subject:'英语',date:'2026-06-25',totalQ:20,wrongQ:4,scoreRate:80.0,status:'completed'}
];

const subjects=['全部','数学','英语','物理','化学','语文','生物'];
let selectedSubject='全部';

function renderStudentTab(){
document.getElementById('studentTab').innerHTML=`
<select class="student-dropdown" onchange="switchStudent(Number(this.value))">
${students.map(s=>`<option value="${s.id}"${s.id===selectedStudentId?' selected':''}>${s.name}（${s.grade}·${s.track}）</option>`).join('')}
</select>`;
}

function switchStudent(id){
selectedStudentId=id;
selectedSubject='全部';
renderStudentTab();
render();
}

function getStudentPapers(){
return papers.filter(p=>p.studentId===selectedStudentId);
}

function getStats(){
const studentPapers=getStudentPapers();
const filtered=selectedSubject==='全部'?studentPapers:studentPapers.filter(p=>p.subject===selectedSubject);
return {
total:filtered.length,
totalWrong:filtered.reduce((s,p)=>s+p.wrongQ,0),
avgScore:filtered.length>0?(filtered.reduce((s,p)=>s+p.scoreRate,0)/filtered.length).toFixed(1):0
};
}

function render(){
const stats=getStats();
const studentPapers=getStudentPapers();
const filtered=selectedSubject==='全部'?studentPapers:studentPapers.filter(p=>p.subject===selectedSubject);

const iconColors={
'数学':'rgba(230,67,26,.1)','英语':'rgba(21,101,194,.1)','物理':'rgba(156,39,176,.1)',
'化学':'rgba(67,160,71,.1)','语文':'rgba(255,109,0,.1)','生物':'rgba(0,131,143,.1)'
};
const iconTextColors={
'数学':'#E6431A','英语':'#1565C0','物理':'#9C27B0',
'化学':'#43A047','语文':'#FF6D00','生物':'#00838F'
};

let html=`
<div class="card">
<div class="stats-summary">
<div class="ss-item"><div class="ss-val">${stats.total}</div><div class="ss-label">试卷总数</div></div>
<div class="ss-item"><div class="ss-val" style="color:var(--urgent)">${stats.totalWrong}</div><div class="ss-label">累计错题</div></div>
<div class="ss-item"><div class="ss-val" style="color:var(--keep)">${stats.avgScore}%</div><div class="ss-label">平均得分率</div></div>
</div>
<div class="filter-strip">
${subjects.map(s=>`<span class="filter-chip${s===selectedSubject?' active':''}" onclick="filterSubject('${s}')">${s}</span>`).join('')}
</div>
</div>

<div class="section-title">历史试卷 (${filtered.length})</div>
`;

// Show analyzing card if report is generating
const reportTask=JSON.parse(localStorage.getItem('reportTask')||'null');
if(reportTask && (reportTask.status==='generating'||reportTask.status==='completed')){
const isReady=reportTask.status==='completed';
html+=`
<div class="paper-item" onclick="window.location.href='${isReady?'fenxibaogao.html':'loading.html'}'" style="border-left:3px solid ${isReady?'var(--keep)':'var(--attention)'}">
<div class="pi-icon" style="background:${isReady?'rgba(67,160,71,.1)':'rgba(251,192,45,.1)'}"><span class="material-icons" style="color:${isReady?'var(--keep)':'var(--attention)'}">${isReady?'check_circle':'hourglass_top'}</span></div>
<div class="pi-content">
<div class="pi-title">${reportTask.examName||'试卷分析'}</div>
<div class="pi-meta">
<span class="subject-tag" style="background:${isReady?'rgba(67,160,71,.1)':'rgba(251,192,45,.1)'};color:${isReady?'var(--keep)':'#F57F17'}">${isReady?'报告就绪':'分析中'}</span>
<span>${reportTask.subject||''}</span>
<span>${reportTask.wrongCount||0}题待分析</span>
</div>
</div>
<div class="pi-right">
<span class="material-icons" style="font-size:18px;color:${isReady?'var(--keep)':'var(--attention)'}">${isReady?'arrow_forward':'sync'}</span>
</div>
</div>`;
}

if(filtered.length===0){
html+=`<div class="empty-state"><span class="material-icons">description</span><p>暂无${selectedSubject==='全部'?'':'该科目'}试卷记录</p></div>`;
}else{
filtered.forEach(p=>{
const bg=iconColors[p.subject]||'rgba(230,67,26,.1)';
const color=iconTextColors[p.subject]||'#E6431A';
html+=`
<div class="paper-item" onclick="window.location.href='fenxibaogao.html'">
<div class="pi-icon" style="background:${bg}"><span class="material-icons" style="color:${color}">description</span></div>
<div class="pi-content">
<div class="pi-title">${p.examName}</div>
<div class="pi-meta">
<span class="subject-tag">${p.subject}</span>
<span>${p.date}</span>
<span>共${p.totalQ}题</span>
</div>
</div>
<div class="pi-right">
<div class="wrong-count">${p.wrongQ}</div>
<div class="wrong-label">错题</div>
</div>
</div>`;
});
}

document.getElementById('pageBody').innerHTML=html;
}

function filterSubject(s){selectedSubject=s;render()}

renderStudentTab();
render();