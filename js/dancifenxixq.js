let activeTab = 'overview';
let selectedExam = '2025-2026学年 期中综合考试';
let selectedSubject = '数学';

const examList = [
  {name:'2025-2026学年 期中综合考试', date:'2026-07-15'},
  {name:'2025-2026学年 10月月考', date:'2026-06-20'},
  {name:'2025-2026学年 9月摸底考试', date:'2026-05-18'}
];

function getExamDate(examName){
  const e=examList.find(x=>x.name===examName);
  return e?e.date:'';
}

function formatExamDateCN(dateStr){
  if(!dateStr)return '';
  const parts=dateStr.split('-');
  return parts[0]+'年'+parseInt(parts[1])+'月'+parseInt(parts[2])+'日';
}

const tabs = [
  {key:'overview', label:'总览'},
  {key:'qtype', label:'题型失分'},
  //{key:'attribution', label:'丢分归因'},
  {key:'difficulty', label:'难度梯队'},
  {key:'priority', label:'提分优先级'}
];

const mockExamsData = {
  '2025-2026学年 期中综合考试': {
    subjects: ['数学','语文','英语','物理','化学','生物'],
    scores: [76, 82, 85, 68, 74, 80],
    crossAnalysis: '【跨学科关联诊断】本次考试数学（76%）与物理（68%）在"函数应用与图像推导"模块存在明显联动失分。物理计算题中，有12分因数学三角函数化简错误导致扣分。',
    weakPoints: ['数学: 二次函数最值', '物理: 受力分析与图解', '化学: 抽象化学方程式配平']
  }
};

const qtypeData = {
  '数学': [
    {type:'选择题', total:60, got:48, lost:12, totalQ:12, wrongQ:3, desc:'基础计算与概念辨析'},
    {type:'填空题', total:20, got:12, lost:8, totalQ:4, wrongQ:2, desc:'公式运用与逻辑推导'},
    {type:'解答题', total:50, got:34, lost:16, totalQ:5, wrongQ:2, desc:'综合应用与证明'},
    {type:'压轴题', total:20, got:6, lost:14, totalQ:1, wrongQ:1, desc:'函数最值与数列综合'}
  ],
  '物理': [
    {type:'选择题', total:48, got:36, lost:12, totalQ:12, wrongQ:3, desc:'基本概念与公式'},
    {type:'填空题', total:16, got:10, lost:6, totalQ:4, wrongQ:2, desc:'计算与分析'},
    {type:'解答题', total:36, got:22, lost:14, totalQ:4, wrongQ:2, desc:'受力分析与运动计算'}
  ]
};

const attrData = {
  '数学': {
    total: 50,
    categories: [
      {name:'概念不清', score:14, pct:28, color:'#E53935', icon:'psychology', examples:['二次函数对称轴公式记错','三角恒等变换方向混淆']},
      {name:'计算失误', score:12, pct:24, color:'#FF6D00', icon:'calculate', examples:['解方程时符号丢失','分式化简漏乘']},
      {name:'审题偏差', score:10, pct:20, color:'#FBC02D', icon:'visibility_off', examples:['题目要求最大值看成最小值','忽略取值范围限制']},
      {name:'解题无思路', score:14, pct:28, color:'#9C27B0', icon:'help_outline', examples:['压轴题函数与数列综合','导数应用于最值证明']}
    ]
  },
  '物理': {
    total: 32,
    categories: [
      {name:'概念不清', score:10, pct:31, color:'#E53935', icon:'psychology', examples:['牛顿第三定律适用条件混淆']},
      {name:'计算失误', score:8, pct:25, color:'#FF6D00', icon:'calculate', examples:['单位换算出错']},
      {name:'审题偏差', score:6, pct:19, color:'#FBC02D', icon:'visibility_off', examples:['漏看"光滑"条件']},
      {name:'解题无思路', score:8, pct:25, color:'#9C27B0', icon:'help_outline', examples:['多体系统受力分析']}
    ]
  }
};

const diffData = {
  '数学': [
    {level:'基础题', label:'简单', total:60, got:52, rate:87, color:'var(--keep)', badge_bg:'rgba(67,160,71,.1)', badge_color:'var(--keep)', tip:'基础题仍有8分失分，主要为计算粗心，可快速补回'},
    {level:'中档题', label:'中等', total:50, got:34, rate:68, color:'var(--attention)', badge_bg:'rgba(251,192,45,.1)', badge_color:'var(--attention)', tip:'中档题是提分性价比最高的区间，建议重点突破'},
    {level:'拔高题', label:'困难', total:40, got:14, rate:35, color:'var(--urgent)', badge_bg:'rgba(229,57,53,.1)', badge_color:'var(--urgent)', tip:'拔高题暂时提升空间有限，建议先稳固中档题后再攻克'}
  ],
  '物理': [
    {level:'基础题', label:'简单', total:40, got:34, rate:85, color:'var(--keep)', badge_bg:'rgba(67,160,71,.1)', badge_color:'var(--keep)', tip:'基础题掌握较好，保持即可'},
    {level:'中档题', label:'中等', total:36, got:22, rate:61, color:'var(--attention)', badge_bg:'rgba(251,192,45,.1)', badge_color:'var(--attention)', tip:'受力分析类中档题失分较多，需重点加强'},
    {level:'拔高题', label:'困难', total:24, got:12, rate:50, color:'var(--urgent)', badge_bg:'rgba(229,57,53,.1)', badge_color:'var(--urgent)', tip:'综合运动计算题需建立系统解题框架'}
  ]
};

const priorityData = {
  '数学': [
    {rank:1, title:'中档解答题 — 二次函数应用', sub:'预计可提12~16分',
      tags:[{text:'中档题',bg:'rgba(251,192,45,.15)',color:'#F57F17'},{text:'概念+思路',bg:'rgba(229,57,53,.1)',color:'var(--urgent)'}],
      reason:'本次中档解答题失分16分，其中二次函数最值、图像变换类题占12分。这类题型出题规律性强，通过针对性训练可在短期内显著提分。',
      action:'建议每天练习1-2道二次函数综合变式题，重点掌握配方法与判别式应用'},
    {rank:2, title:'选择题计算准确率提升', sub:'预计可提6~8分',
      tags:[{text:'基础题',bg:'rgba(67,160,71,.1)',color:'var(--keep)'},{text:'计算失误',bg:'rgba(255,109,0,.1)',color:'var(--orange)'}],
      reason:'选择题3道错题中2道属于计算失误（符号丢失、分式化简），并非知识点欠缺。这是"最容易拿回来的分"。',
      action:'考前做3套限时选择题训练，重点练习检查习惯，每题做完回读一遍关键步骤'}
  ],
  '物理': [
    {rank:1, title:'受力分析与牛顿定律应用', sub:'预计可提10~14分',
      tags:[{text:'中档题',bg:'rgba(251,192,45,.15)',color:'#F57F17'},{text:'概念不清',bg:'rgba(229,57,53,.1)',color:'var(--urgent)'}],
      reason:'受力分析类题失分集中，主要是力的分解方向选取不准确和牛顿第二定律列式遗漏力。通过建立标准解题流程可显著改善。',
      action:'使用"隔离体→标力→选坐标→列方程"四步法，每天分析2道受力图'}
  ]
};

function openSheet(){ document.getElementById('pickerSheet').classList.add('show'); }
function closeSheet(e){ if(e.target.classList.contains('sheet-mask')) document.getElementById('pickerSheet').classList.remove('show'); }

function openPicker(){
  document.getElementById('pickerOptions').innerHTML = examList.map(item => `
    <div class="option-item${item.name===selectedExam?' active':''}" onclick="selectExam('${item.name}')">
      <div style="display:flex;flex-direction:column;gap:2px">
        <span style="font-size:13px">${item.name}</span>
        <span style="font-size:11px;color:var(--text3);display:flex;align-items:center;gap:3px"><span class="material-icons" style="font-size:12px">calendar_today</span>${item.date}</span>
      </div>
      <span class="material-icons" style="font-size:18px;display:${item.name===selectedExam?'block':'none'}">check</span>
    </div>`).join('');
  openSheet();
}

function selectExam(val){
  selectedExam = val;
  document.getElementById('pickerSheet').classList.remove('show');
  render();
}

function drawRadarSVG(subjects, scores) {
  const n = subjects.length; const cx=140, cy=130, r=80;
  const angles = subjects.map((_,i)=>(-Math.PI/2)+(2*Math.PI*i/n));
  let polygonOuter='', polygonData='', labels='', gridLines='';
  // Draw inner grid rings
  [0.25, 0.5, 0.75, 1].forEach(pct=>{
    let ring='';
    angles.forEach(a=>{ ring+=`${cx+r*pct*Math.cos(a)},${cy+r*pct*Math.sin(a)} `; });
    gridLines+=`<polygon points="${ring}" fill="none" stroke="#eee" stroke-width="${pct===1?'1.2':'0.6'}"/>`;
  });
  angles.forEach((a,i)=>{
    const x=cx+r*Math.cos(a), y=cy+r*Math.sin(a);
    const xd=cx+r*(scores[i]/100)*Math.cos(a), yd=cy+r*(scores[i]/100)*Math.sin(a);
    polygonOuter+=`${x},${y} `;
    polygonData+=`${xd},${yd} `;
    // Axis line
    gridLines+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#eee" stroke-width="0.6"/>`;
    // Label positioning with more offset for score
    const lx=cx+(r+26)*Math.cos(a), ly=cy+(r+26)*Math.sin(a);
    const scoreColor = scores[i]>=80?'#43A047': scores[i]>=65?'#FF6D00':'#E53935';
    labels+=`<text x="${lx}" y="${ly-7}" text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="700" fill="#424242">${subjects[i]}</text>`;
    labels+=`<text x="${lx}" y="${ly+7}" text-anchor="middle" dominant-baseline="middle" font-size="10" font-weight="700" fill="${scoreColor}">${scores[i]}分</text>`;
  });
  return `<svg viewBox="0 0 280 270" style="width:100%;max-width:280px;display:block;margin:0 auto">${gridLines}<polygon points="${polygonData}" fill="rgba(230,67,26,.12)" stroke="#E6431A" stroke-width="1.8"/>${labels}</svg>`;
}

function drawDonut(categories, total) {
  const size=120, cx=60, cy=60, r=42, inner=28;
  let startAngle=-Math.PI/2, paths='';
  categories.forEach(cat=>{
    const sweep=(cat.pct/100)*2*Math.PI;
    const endAngle=startAngle+sweep;
    const x1=cx+r*Math.cos(startAngle),y1=cy+r*Math.sin(startAngle);
    const x2=cx+r*Math.cos(endAngle),y2=cy+r*Math.sin(endAngle);
    const ix1=cx+inner*Math.cos(endAngle),iy1=cy+inner*Math.sin(endAngle);
    const ix2=cx+inner*Math.cos(startAngle),iy2=cy+inner*Math.sin(startAngle);
    const largeArc=sweep>Math.PI?1:0;
    paths+=`<path d="M${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} L${ix1},${iy1} A${inner},${inner} 0 ${largeArc} 0 ${ix2},${iy2} Z" fill="${cat.color}" opacity="0.85"/>`;
    startAngle=endAngle;
  });
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${paths}<text x="${cx}" y="${cy-4}" text-anchor="middle" font-size="14" font-weight="800" fill="var(--text1)">${total}分</text><text x="${cx}" y="${cy+12}" text-anchor="middle" font-size="10" fill="var(--text3)">总失分</text></svg>`;
}

function renderOverview(){
  const data = mockExamsData[selectedExam] || mockExamsData['2025-2026学年 期中综合考试'];
  const examDate = getExamDate(selectedExam);
  return `
  <div class="card">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <span style="font-size:14px;font-weight:700">本次全科能力雷达图</span>
      ${examDate?`<span style="font-size:11px;color:var(--text3);display:flex;align-items:center;gap:3px"><span class="material-icons" style="font-size:13px">calendar_today</span>考试时间：${formatExamDateCN(examDate)}</span>`:''}
    </div>
    ${drawRadarSVG(data.subjects, data.scores)}
  </div>
  <div class="card">
    <div class="cross-analysis-box">
      <div class="cab-title"><span class="material-icons" style="font-size:16px">hub</span> 跨学科联动诊断</div>
      <div class="cab-desc">${data.crossAnalysis}</div>
    </div>
    <div style="margin-top:12px">
      <div style="font-size:12px;font-weight:600;margin-bottom:6px">重灾失分点：</div>
      ${data.weakPoints.map(wp=>`<div style="font-size:12px;color:var(--urgent);padding:2px 0">• ${wp}</div>`).join('')}
    </div>
  </div>`;
}

function renderQtype(){
  const subjs=Object.keys(qtypeData);
  const curSubj=subjs.includes(selectedSubject)?selectedSubject:subjs[0];
  const items=qtypeData[curSubj];
  const totalLost=items.reduce((s,i)=>s+i.lost,0);
  const totalFull=items.reduce((s,i)=>s+i.total,0);
  return `
  <div class="card">
    <div style="font-size:14px;font-weight:700;margin-bottom:4px;display:flex;align-items:center;gap:6px"><span class="material-icons" style="font-size:18px;color:var(--primary)">pie_chart</span>题型与失分分布</div>
    <div style="font-size:12px;color:var(--text3);margin-bottom:12px">迅速定位是基础不牢还是高分突破受阻</div>
    <div class="chip-wrap">${subjs.map(s=>`<span class="choice-chip${s===curSubj?' active':''}" onclick="selectedSubject='${s}';render()">${s}</span>`).join('')}</div>
    <div style="display:flex;justify-content:space-between;margin-bottom:12px;padding:8px 12px;background:#f8f8f8;border-radius:8px">
      <span style="font-size:12px;color:var(--text3)">满分 <strong style="color:var(--text1)">${totalFull}</strong> 分</span>
      <span style="font-size:12px;color:var(--text3)">总失分 <strong style="color:var(--urgent)">${totalLost}</strong> 分</span>
      <span style="font-size:12px;color:var(--text3)">得分率 <strong style="color:var(--keep)">${Math.round((1-totalLost/totalFull)*100)}%</strong></span>
    </div>
    ${items.map(item=>{
      const lostPct=Math.round(item.lost/totalLost*100);
      return `<div class="qtype-row"><div class="qtype-label">${item.type}</div><div class="qtype-bar-wrap"><div class="qtype-bar-track"><div class="qtype-bar-got" style="width:${item.got/item.total*100}%"></div><div class="qtype-bar-lost" style="width:${item.lost/item.total*100}%"></div></div><div class="qtype-meta"><span>${item.desc}</span><span>失分占比 <strong style="color:var(--urgent)">${lostPct}%</strong></span></div></div><div class="qtype-score"><div style="color:var(--text1);font-weight:700">${item.got}/${item.total}</div><div style="font-size:10px;color:var(--text3)">${Math.round(item.got/item.total*100)}%</div></div></div>`;
    }).join('')}
  </div>
  <div class="card" style="background:#FFF7F5;border:1px solid rgba(230,67,26,.15)">
    <div style="font-size:13px;font-weight:700;color:var(--primary);display:flex;align-items:center;gap:4px;margin-bottom:6px"><span class="material-icons" style="font-size:16px">lightbulb</span>诊断结论</div>
    <div style="font-size:12px;color:var(--text2);line-height:1.6">${items.length>=4&&(items[2].lost+items[3].lost)/totalLost>0.5?'压轴题/解答题失分占比较高（'+Math.round((items[2].lost+(items[3]?items[3].lost:0))/totalLost*100)+'%），说明<strong>高分突破受阻</strong>，建议在稳固基础后重点攻克中高档题的解题思路。':'选择题/填空题失分占比较高，说明<strong>基础仍不牢固</strong>，建议优先补强基础概念和计算准确率。'}</div>
  </div>`;
}

/*function renderAttribution(){
  const subjs=Object.keys(attrData);
  const curSubj=subjs.includes(selectedSubject)?selectedSubject:subjs[0];
  const data=attrData[curSubj];
  return `
  <div class="card">
    <div style="font-size:14px;font-weight:700;margin-bottom:4px;display:flex;align-items:center;gap:6px"><span class="material-icons" style="font-size:18px;color:var(--primary)">psychology</span>丢分原因归因分析</div>
    <div style="font-size:12px;color:var(--text3);margin-bottom:12px">区分"真不会"与"粗心"，缓解沟通焦虑</div>
    <div class="chip-wrap">${subjs.map(s=>`<span class="choice-chip${s===curSubj?' active':''}" onclick="selectedSubject='${s}';render()">${s}</span>`).join('')}</div>
    <div class="attr-donut-wrap">
      ${drawDonut(data.categories,data.total)}
      <div class="attr-legend">${data.categories.map(c=>`<div class="attr-legend-item"><span class="attr-legend-dot" style="background:${c.color}"></span>${c.name} ${c.pct}%（${c.score}分）</div>`).join('')}</div>
    </div>
  </div>
  ${data.categories.map(cat=>`<div class="attr-detail-item"><div class="attr-detail-header"><div class="attr-detail-title"><span class="material-icons" style="font-size:16px;color:${cat.color}">${cat.icon}</span>${cat.name}</div><div class="attr-detail-score" style="color:${cat.color}">-${cat.score}分（${cat.pct}%）</div></div><div class="attr-detail-desc">${cat.examples.map(e=>'• '+e).join('<br>')}</div></div>`).join('')}
  <div class="card" style="background:#FFF7F5;border:1px solid rgba(230,67,26,.15);margin-top:12px">
    <div style="font-size:13px;font-weight:700;color:var(--primary);display:flex;align-items:center;gap:4px;margin-bottom:6px"><span class="material-icons" style="font-size:16px">family_restroom</span>给家长的话</div>
    <div style="font-size:12px;color:var(--text2);line-height:1.6">本次考试中<strong>"计算失误"和"审题偏差"合计占丢分的 ${data.categories[1].pct+data.categories[2].pct}%</strong>，这部分并非知识欠缺，而是考试习惯问题。建议避免简单指责"粗心"，可以和孩子一起制定检查清单，针对性提升考场细心度。</div>
  </div>`;
}*/

function renderDifficulty(){
  const subjs=Object.keys(diffData);
  const curSubj=subjs.includes(selectedSubject)?selectedSubject:subjs[0];
  const items=diffData[curSubj];
  const easyLost=items[0].total-items[0].got, midLost=items[1].total-items[1].got, hardLost=items[2].total-items[2].got;
  const totalLost=easyLost+midLost+hardLost;
  return `
  <div class="card">
    <div style="font-size:14px;font-weight:700;margin-bottom:4px;display:flex;align-items:center;gap:6px"><span class="material-icons" style="font-size:18px;color:var(--primary)">trending_up</span>难度梯队掌握度</div>
    <div style="font-size:12px;color:var(--text3);margin-bottom:12px">了解提分性价比，找到最容易补救的分数</div>
    <div class="chip-wrap">${subjs.map(s=>`<span class="choice-chip${s===curSubj?' active':''}" onclick="selectedSubject='${s}';render()">${s}</span>`).join('')}</div>
  </div>
  ${items.map(item=>`<div class="diff-item"><div class="diff-header"><div class="diff-title"><span>${item.level}</span><span class="diff-badge" style="background:${item.badge_bg};color:${item.badge_color}">${item.label}</span></div><span style="font-size:18px;font-weight:800;color:${item.color}">${item.rate}%</span></div><div class="diff-stats"><div class="diff-stat">满分 <strong>${item.total}</strong>分</div><div class="diff-stat">得分 <strong>${item.got}</strong>分</div><div class="diff-stat">失分 <strong style="color:var(--urgent)">${item.total-item.got}</strong>分</div></div><div class="diff-bar-track"><div class="diff-bar-fill" style="width:${item.rate}%;background:${item.color}"></div></div><div class="diff-tip"><span class="material-icons">lightbulb</span>${item.tip}</div></div>`).join('')}
  <div class="card" style="background:#FFF7F5;border:1px solid rgba(230,67,26,.15);margin-top:4px">
    <div style="font-size:13px;font-weight:700;color:var(--primary);display:flex;align-items:center;gap:4px;margin-bottom:6px"><span class="material-icons" style="font-size:16px">auto_awesome</span>提分性价比建议</div>
    <div style="font-size:12px;color:var(--text2);line-height:1.6">基础题 + 中档题失分合计 <strong>${easyLost+midLost} 分</strong>（占总失分 ${Math.round((easyLost+midLost)/totalLost*100)}%），这些分数通过短期训练即可回收。建议<strong>优先稳固基础题，再重点攻克中档题</strong>，拔高题可在前两项稳定后再突破。</div>
  </div>`;
}

function renderPriority(){
  const subjs=Object.keys(priorityData);
  const curSubj=subjs.includes(selectedSubject)?selectedSubject:subjs[0];
  const items=priorityData[curSubj];
  return `
  <div class="card">
    <div style="font-size:14px;font-weight:700;margin-bottom:4px;display:flex;align-items:center;gap:6px"><span class="material-icons" style="font-size:18px;color:var(--primary)">flag</span>本次考试提分优先级</div>
    <div style="font-size:12px;color:var(--text3);margin-bottom:6px">明确的"下一步行动清单"，让数据变为行动</div>
  </div>
  ${items.map(item=>`<div class="priority-card"><div class="priority-header"><div class="priority-rank">${item.rank}</div><div><div class="priority-title">${item.title}</div><div class="priority-sub">${item.sub}</div></div></div><div style="margin-bottom:8px">${item.tags.map(t=>`<span class="priority-tag" style="background:${t.bg};color:${t.color}">${t.text}</span>`).join('')}</div><div class="priority-body">${item.reason}</div><div class="priority-action"><span class="material-icons">check_circle</span>${item.action}</div></div>`).join('')}
  <div class="card" style="text-align:center;padding:20px">
    <span class="material-icons" style="font-size:32px;color:var(--primary);margin-bottom:6px">emoji_objects</span>
    <div style="font-size:13px;font-weight:600;color:var(--text1);margin-bottom:4px">按优先级逐个击破</div>
    <div style="font-size:12px;color:var(--text3)">先拿回容易拿的分，再挑战更高目标</div>
  </div>`;
}

function render(){
  const pageBody = document.getElementById('pageBody');
  const scrollPos = pageBody.scrollTop;
  document.getElementById('subTabBar').innerHTML = tabs.map(t=>`<div class="sub-tab-item${t.key===activeTab?' active':''}" data-tab="${t.key}" onclick="scrollToSection('${t.key}')">${t.label}</div>`).join('');

  let html = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
    <span style="font-size:13px;color:var(--text3)">考试场次：</span>
    <div class="filter-picker-btn" onclick="openPicker()"><span>${selectedExam}${getExamDate(selectedExam)?' ('+getExamDate(selectedExam)+')':''}</span><span class="material-icons" style="font-size:16px">arrow_drop_down</span></div>
  </div>`;

  html += `<div id="sec-overview" class="section-anchor">${renderOverview()}</div>`;
  html += `<div id="sec-qtype" class="section-anchor">${renderQtype()}</div>`;
  //html += `<div id="sec-attribution" class="section-anchor">${renderAttribution()}</div>`;
  html += `<div id="sec-difficulty" class="section-anchor">${renderDifficulty()}</div>`;
  html += `<div id="sec-priority" class="section-anchor">${renderPriority()}</div>`;

  pageBody.innerHTML = html;
  pageBody.scrollTop = scrollPos;
}

function scrollToSection(key){
  const el = document.getElementById('sec-'+key);
  if(el){
    isScrolling = true;
    el.scrollIntoView({behavior:'smooth'});
    setActiveTab(key);
    setTimeout(()=>{ isScrolling = false; }, 600);
  }
}

function setActiveTab(key){
  activeTab = key;
  document.querySelectorAll('.sub-tab-item').forEach(t=>{
    t.classList.toggle('active', t.dataset.tab===key);
  });
}

let isScrolling = false;
function initScrollspy(){
  const pageBody = document.getElementById('pageBody');
  const sectionKeys = tabs.map(t=>t.key);
  pageBody.addEventListener('scroll', ()=>{
    if(isScrolling) return;
    const offset = pageBody.scrollTop + 80;
    let current = sectionKeys[0];
    for(const key of sectionKeys){
      const sec = document.getElementById('sec-'+key);
      if(sec && sec.offsetTop <= offset){
        current = key;
      }
    }
    if(current !== activeTab){
      setActiveTab(current);
    }
  });
}

render();
initScrollspy();

// Share feature
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>{t.classList.remove('show')},2200);
}

function openShareSheet(){
  updateSharePreview();
  document.getElementById('shareMask').classList.add('show');
}

function closeShareSheet(e){
  if(e.target.classList.contains('share-mask')) document.getElementById('shareMask').classList.remove('show');
}

function scoreToLevel(score){
  if(score>=85) return '优异';
  if(score>=75) return '良好';
  if(score>=60) return '稳步提升';
  return '需加油';
}

function updateSharePreview(){
  const hideScores=document.getElementById('hideScores').checked;
  const data=mockExamsData[selectedExam]||mockExamsData['2025-2026学年 期中综合考试'];

  const name='张妈妈';
  const avatar='张';
  const examDate=getExamDate(selectedExam);

  let scoresHtml='';
  data.subjects.forEach((subj,i)=>{
    const val=hideScores?scoreToLevel(data.scores[i]):(data.scores[i]+'分');
    scoresHtml+=`<span class="sp-score-chip">${subj} ${val}</span>`;
  });

  document.getElementById('sharePreview').innerHTML=`
    <div class="sp-header">
      <div class="sp-avatar">${avatar}</div>
      <div><div class="sp-name">${name}</div><div class="sp-tag">${selectedExam}${examDate?' · '+examDate:''}</div></div>
    </div>
    <div class="sp-body">单次大考诊断卡片 —— 各科表现一览：</div>
    <div class="sp-scores">${scoresHtml}</div>
  `;
}

function toggleTag(el){
  el.classList.toggle('selected');
}

function doSharePost(){
  const hideScores=document.getElementById('hideScores').checked;
  const tags=Array.from(document.querySelectorAll('#tagChips .tag-chip.selected')).map(t=>t.textContent);
  const data=mockExamsData[selectedExam]||mockExamsData['2025-2026学年 期中综合考试'];

  const shareData={
    type:'single_exam',
    exam:selectedExam,
    examDate:getExamDate(selectedExam),
    subjects:data.subjects,
    scores:hideScores?data.scores.map(scoreToLevel):data.scores.map(s=>s+'分'),
    hideScores,
    anon:false,
    tags,
    author:'张妈妈',
    createdAt:new Date().toISOString()
  };
  localStorage.setItem('sharePostDraft',JSON.stringify(shareData));
  document.getElementById('shareMask').classList.remove('show');
  showToast('正在跳转至社区发帖...');
  setTimeout(()=>{window.location.href='shequ.html?from=share'},1000);
}