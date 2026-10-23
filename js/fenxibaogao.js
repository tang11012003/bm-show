function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.style.display='block';setTimeout(()=>t.style.display='none',2000)}

const report={
exam:{name:'期中考试',subject:'数学',date:'2026-07-15'},
scoreRate:78.5,
kpResults:[
{name:'二次函数',level:'urgent',errorRate:0.6,desc:'函数图像平移变换、顶点坐标计算、与x轴交点'},
{name:'三角函数',level:'urgent',errorRate:0.5,desc:'正弦余弦公式运用、诱导公式、图像变换'},
{name:'概率统计',level:'attention',errorRate:0.35,desc:'条件概率计算、独立事件、分布列'},
{name:'数列求和',level:'attention',errorRate:0.3,desc:'等比数列求和、裂项相消法'},
{name:'向量运算',level:'keep',errorRate:0.1,desc:'平面向量基本运算、数量积应用'},
{name:'集合运算',level:'keep',errorRate:0.05,desc:'交集并集补集判断、集合关系'}
]
};

const tierLabels={urgent:'待改进（需重点突破）',attention:'需关注（加强巩固）',keep:'继续保持（已掌握）'};
const tierColors={urgent:'var(--urgent)',attention:'var(--attention)',keep:'var(--keep)'};
const tierEmoji={urgent:'🔴',attention:'🟡',keep:'🟢'};

function render(){
const r=report;
const urgentCount=r.kpResults.filter(k=>k.level==='urgent').length;
const attentionCount=r.kpResults.filter(k=>k.level==='attention').length;
const keepCount=r.kpResults.filter(k=>k.level==='keep').length;

let html=`
<div class="card">
<div style="font-size:18px;font-weight:700;color:var(--text1)">${r.exam.name} · ${r.exam.subject}</div>
<div style="font-size:15px;color:var(--text2);margin-top:6px">得分率：${r.scoreRate}%</div>
</div>

<div class="section-title">三档分布</div>
<div class="card">
<div class="tier-bar">
<div style="flex:${urgentCount};background:var(--urgent)"></div>
<div style="flex:${attentionCount};background:var(--attention)"></div>
<div style="flex:${keepCount};background:var(--keep)"></div>
</div>
<div class="tier-legend">
<span style="color:var(--urgent)">待改进 ${urgentCount}</span>
<span style="color:var(--attention)">需关注 ${attentionCount}</span>
<span style="color:var(--keep)">保持 ${keepCount}</span>
</div>
</div>
`;

['urgent','attention','keep'].forEach(level=>{
const items=r.kpResults.filter(k=>k.level===level);
if(items.length===0)return;
html+=`<div class="section-title">${tierEmoji[level]} ${tierLabels[level]}</div>`;
items.forEach(k=>{
html+=`<div class="kp-card" style="border-left:3px solid ${tierColors[level]}" onclick="showToast('查看知识点趋势：${k.name}')">
<div class="kp-name">${k.name}</div>
<div class="kp-desc">${k.desc}</div>
<div class="kp-rate" style="color:${tierColors[level]}">错误率 ${(k.errorRate*100).toFixed(0)}%</div>
</div>`;
});
});

html+=`
<div style="margin-top:20px">
<button class="btn btn-primary" onclick="shareToCommunity()"><span class="material-icons" style="font-size:18px;margin-right:8px">forum</span>把分析报告分享到社区</button>
</div>
`;
document.getElementById('pageBody').innerHTML=html;
}

function doShare(){showToast('已分享，获得 1 次额外分析次数')}
function shareToCommunity(){
showModal();
}
function showModal(){
const overlay=document.createElement('div');
overlay.id='shareModal';
overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:1000;display:flex;align-items:center;justify-content:center';
overlay.innerHTML=`<div style="background:#fff;border-radius:16px;padding:22px;width:88%;max-width:330px">
<h3 style="font-size:17px;font-weight:600;margin-bottom:16px">分享到圈子</h3>
<div id="circleList" style="margin-bottom:16px">
${['高三数学','高三英语','学习方法','心理辅导'].map((c,i)=>`<label style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;cursor:pointer"><input type="radio" name="circle" value="${i+1}" ${i===0?'checked':''} style="margin-right:10px;accent-color:var(--primary)"><span style="font-size:14px">${c}</span></label>`).join('')}
</div>
<div style="display:flex;gap:10px;justify-content:flex-end">
<button onclick="document.getElementById('shareModal').remove()" style="padding:8px 18px;border-radius:8px;border:none;background:none;font-size:14px;color:#424242;cursor:pointer">取消</button>
<button onclick="document.getElementById('shareModal').remove();showToast('已分享到社区')" style="padding:8px 18px;border-radius:8px;border:none;background:var(--primary);color:#fff;font-size:14px;font-weight:500;cursor:pointer">确定</button>
</div></div>`;
overlay.addEventListener('click',function(e){if(e.target===overlay)overlay.remove()});
document.body.appendChild(overlay);
}

render();