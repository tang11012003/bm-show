function showToast(msg){const t=document.createElement('div');t.style.cssText='position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.78);color:#fff;padding:9px 20px;border-radius:20px;font-size:13px;z-index:3000;white-space:nowrap';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2000)}

const circles=[
{id:0,name:'全部'},
{id:1,name:'高三数学'},
{id:2,name:'高三英语'},
{id:3,name:'学习方法'},
{id:4,name:'心理辅导'},
{id:5,name:'高三物理'},
{id:6,name:'志愿填报'}
];
let activeCircle=0;

const placeholderImg=`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect fill="#f0f0f0" width="400" height="200"/><text x="200" y="100" text-anchor="middle" font-size="14" fill="#bbb">图片</text></svg>')}`;

const mockPosts=[
{id:1,author:'李爸爸',circleId:1,circleName:'高三数学',title:'孩子三角函数老出错怎么办？',content:'最近几次模考三角函数大题都丢分严重，有没有好的练习方法推荐？孩子说自己复习了但还是会出错，感觉是基础不够扎实。',likes:12,comments:5,shares:2,images:[],pinned:false,isReport:false},
{id:2,author:'王妈妈',circleId:3,circleName:'学习方法',title:'分享一个错题整理的好习惯',content:'我家孩子坚持每周整理错题本，按知识点分类，标注错误原因和正确思路。这学期数学从72提到了85分，分享给大家参考。',likes:128,comments:13,shares:8,images:[placeholderImg,placeholderImg,placeholderImg],pinned:false,isReport:false},
{id:3,author:'张妈妈',circleId:1,circleName:'高三数学',title:'数学期中考试分析报告分享',content:'用陪读社区的试卷分析功能生成的报告，发现二次函数是最大薄弱点，分享给同年级的家长参考。',likes:45,comments:21,shares:15,images:[],pinned:false,isReport:true},
{id:4,author:'刘爸爸',circleId:4,circleName:'心理辅导',title:'高三压力大，家长怎么陪伴？',content:'最近发现孩子情绪波动比较大，考试前会焦虑失眠。我们家长应该怎么做才能帮到他？求有经验的家长分享。',likes:67,comments:34,shares:5,images:[],pinned:true,isReport:false},
{id:5,author:'陈妈妈',circleId:1,circleName:'高三数学',title:'数列求和公式总结',content:'整理了高中数列所有求和方法：等差等比公式、裂项相消、错位相减、分组求和。打印出来贴在书桌前，效果不错。',likes:89,comments:28,shares:12,images:[placeholderImg],pinned:false,isReport:false},
{id:6,author:'赵妈妈',circleId:2,circleName:'高三英语',title:'完形填空提分技巧',content:'英语老师推荐的完形填空解题方法：先通读全文不看选项，把握文章大意，然后再逐题分析。亲测有效，孩子完形从扣8分减到扣2分。',likes:52,comments:18,shares:6,images:[placeholderImg,placeholderImg],pinned:false,isReport:false},
{id:7,author:'张爸爸',circleId:3,circleName:'学习方法',title:'用试卷分析两个月的心得',content:'用了两个月的试卷分析功能，发现孩子数学丢分主要集中在函数和概率两个板块。针对性练习后，最近一次月考提高了15分。',likes:103,comments:22,shares:9,images:[],pinned:false,isReport:true}
];

let litPosts=new Set();

function renderCircles(){
document.getElementById('circleStrip').innerHTML=circles.map(c=>
`<button class="circle-chip${c.id===activeCircle?' active':''}" onclick="filterCircle(${c.id})">${c.name}</button>`
).join('');
}

function filterCircle(id){
activeCircle=id;
renderCircles();
renderPosts();
}

function toggleLit(id,e){
e.stopPropagation();
if(litPosts.has(id))litPosts.delete(id);else litPosts.add(id);
renderPosts();
}

function renderPosts(){
const filtered=activeCircle===0?mockPosts:mockPosts.filter(p=>p.circleId===activeCircle);
if(filtered.length===0){
document.getElementById('pageBody').innerHTML='<div class="empty-state">这里还没有帖子，去发一条吧～</div>';
return;
}
document.getElementById('pageBody').innerHTML=filtered.map(p=>{
const isHot=p.pinned||p.likes>100;
const isLit=litPosts.has(p.id);
const litCount=p.likes+(isLit?1:0);
return `
<div class="post-card" onclick="window.location.href='tiezidetail.html?id=${p.id}'">
<div class="post-card-inner">
<div class="post-tags">
<span class="tag-circle">${p.circleName}</span>
${isHot?'<span class="tag-hot">热</span>':''}
${p.isReport?'<span class="tag-report"><span class="material-icons">insights</span>报告</span>':''}
</div>
<div class="post-title">${p.title}</div>
<div class="post-summary">${p.content}</div>
</div>
${p.images.length>0?`<div class="post-image"><img src="${p.images[0]}">${p.images.length>1?`<span class="img-count">+${p.images.length}</span>`:''}</div>`:''}
<div class="post-actions">
<button class="action-btn${isLit?' lit':''}" onclick="toggleLit(${p.id},event)"><span class="material-icons">${isLit?'lightbulb':'lightbulb_outline'}</span>亮了 ${litCount}</button>
<button class="action-btn"><span class="material-icons">chat_bubble_outline</span>${p.comments}</button>
<button class="action-btn"><span class="material-icons">share</span>${p.shares}</button>
</div>
</div>`;
}).join('');
}

renderCircles();
renderPosts();