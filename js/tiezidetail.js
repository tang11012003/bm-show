const placeholderImg=`data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect fill="#f0f0f0" width="400" height="400"/><text x="200" y="200" text-anchor="middle" font-size="14" fill="#bbb">图片</text></svg>')}`;

const posts={
1:{id:1,author:'李爸爸',avatarColor:'#1565C0',circleName:'高三数学',title:'孩子三角函数老出错怎么办？',content:'最近几次模考三角函数大题都丢分严重，有没有好的练习方法推荐？\n\n孩子说自己复习了但还是会出错，感觉是基础不够扎实。公式记住了但是看到题不知道怎么用，特别是辅助角公式和和差化积那块。\n\n有经验的家长能分享一下吗？',likes:12,comments:5,shares:2,images:[],pinned:false,isReport:false,time:'2026-07-20 09:30'},
2:{id:2,author:'王妈妈',avatarColor:'#9C27B0',circleName:'学习方法',title:'分享一个错题整理的好习惯',content:'我家孩子坚持每周整理错题本，按知识点分类，标注错误原因和正确思路。\n\n具体做法：\n1. 每次考试后把错题剪下来贴到本子上\n2. 用红笔标注错误原因（计算失误/概念不清/方法不对）\n3. 用蓝笔写出正确解题思路\n4. 每周复习一遍，标记已掌握的\n\n这学期数学从72提到了85分，分享给大家参考。坚持是关键！',likes:128,comments:13,shares:8,images:[placeholderImg,placeholderImg,placeholderImg],pinned:false,isReport:false,time:'2026-07-19 15:20'},
3:{id:3,author:'张妈妈',avatarColor:'#E6431A',circleName:'高三数学',title:'数学期中考试分析报告分享',content:'用陪读社区的试卷分析功能生成的报告，发现二次函数是最大薄弱点。\n\n三档分布：\n- 待改进：二次函数、三角函数\n- 需关注：概率统计、数列\n- 已掌握：向量、集合\n\n分享给同年级的家长参考，大家也可以试试这个功能，真的挺有帮助。',likes:45,comments:21,shares:15,images:[],pinned:false,isReport:true,time:'2026-07-18 20:10'},
4:{id:4,author:'刘爸爸',avatarColor:'#43A047',circleName:'心理辅导',title:'高三压力大，家长怎么陪伴？',content:'最近发现孩子情绪波动比较大，考试前会焦虑失眠。我们家长应该怎么做才能帮到他？\n\n目前尝试了：\n- 不过分追问考试成绩\n- 周末带他出去运动放松\n- 晚上给他准备些牛奶和水果\n\n但感觉效果不是很明显，求有经验的家长分享。',likes:67,comments:34,shares:5,images:[],pinned:true,isReport:false,time:'2026-07-17 22:00'},
5:{id:5,author:'陈妈妈',avatarColor:'#FF6D00',circleName:'高三数学',title:'数列求和公式总结',content:'整理了高中数列所有求和方法：\n\n1. 等差数列求和公式 Sn=na1+n(n-1)d/2\n2. 等比数列求和公式 Sn=a1(1-q^n)/(1-q)\n3. 裂项相消法\n4. 错位相减法\n5. 分组求和法\n6. 倒序相加法\n\n打印出来贴在书桌前，效果不错。孩子说以前总搞混，现在一目了然。',likes:89,comments:28,shares:12,images:[placeholderImg],pinned:false,isReport:false,time:'2026-07-16 14:30'},
6:{id:6,author:'赵妈妈',avatarColor:'#00838F',circleName:'高三英语',title:'完形填空提分技巧',content:'英语老师推荐的完形填空解题方法：\n\n第一步：先通读全文不看选项，把握文章大意\n第二步：再逐题分析，注意上下文逻辑关系\n第三步：做完后再通读一遍，确保整体连贯\n\n亲测有效，孩子完形从扣8分减到扣2分。关键是要把握文章整体意思，不能只看单个空的前后。',likes:52,comments:18,shares:6,images:[placeholderImg,placeholderImg],pinned:false,isReport:false,time:'2026-07-15 11:45'},
7:{id:7,author:'张爸爸',avatarColor:'#1565C0',circleName:'学习方法',title:'用试卷分析两个月的心得',content:'用了两个月的试卷分析功能，发现孩子数学丢分主要集中在函数和概率两个板块。\n\n针对性练习后，最近一次月考提高了15分。\n\n建议：\n- 每次考试后立刻上传分析\n- 对比多次报告看趋势变化\n- 重点攻克"待改进"的知识点\n- 不用面面俱到，先解决最弱的',likes:103,comments:22,shares:9,images:[],pinned:false,isReport:true,time:'2026-07-14 08:20'}
};

const commentsData={
1:[
{id:1,author:'王妈妈',avatarColor:'#9C27B0',text:'我家也是这个问题，后来给孩子报了一个网课，三角函数那块好多了。建议先把基础公式背熟再做题。',time:'07-20 10:15',likes:3,liked:false},
{id:2,author:'张爸爸',avatarColor:'#1565C0',text:'推荐一本书《高中数学三角函数专项突破》，我家孩子用了之后提了不少。',time:'07-20 11:30',likes:5,liked:false},
{id:3,author:'赵妈妈',avatarColor:'#00838F',text:'辅助角公式确实难，让孩子多画单位圆图，建立直觉会好很多。',time:'07-20 14:20',likes:2,liked:false},
{id:4,author:'陈妈妈',avatarColor:'#FF6D00',text:'我们也是刚攻克这个难关，每天坚持做3道三角函数题，一个月后明显改善。',time:'07-20 16:45',likes:1,liked:false},
{id:5,author:'刘爸爸',avatarColor:'#43A047',text:'同感，让孩子先把公式推导一遍，理解推导过程比死记硬背有用。',time:'07-20 18:00',likes:4,liked:false}
],
2:[
{id:1,author:'李爸爸',avatarColor:'#1565C0',text:'太棒了！我让我家孩子也试试这个方法。请问错题本是手写还是打印？',time:'07-19 16:00',likes:2,liked:false},
{id:2,author:'张妈妈',avatarColor:'#E6431A',text:'我家也是类似的方法，确实有效。补充一点：可以用不同颜色的便利贴标注重要程度。',time:'07-19 17:30',likes:6,liked:false},
{id:3,author:'刘爸爸',avatarColor:'#43A047',text:'72到85，一学期提13分，太厉害了！坚持是关键。',time:'07-19 19:20',likes:3,liked:false}
],
3:[
{id:1,author:'李爸爸',avatarColor:'#1565C0',text:'这个报告功能确实好用，我也生成了一份，发现孩子的薄弱点和自己预想的不太一样。',time:'07-18 21:00',likes:4,liked:false},
{id:2,author:'王妈妈',avatarColor:'#9C27B0',text:'请问这个分析功能在哪里？我刚注册还不太熟悉。',time:'07-18 22:15',likes:1,liked:false},
{id:3,author:'张妈妈',avatarColor:'#E6431A',text:'回复楼上：在首页点"上传"按钮，拍照上传试卷就可以了。',time:'07-18 22:30',likes:2,liked:false}
],
4:[
{id:1,author:'王妈妈',avatarColor:'#9C27B0',text:'理解你的心情。我家孩子去年也这样，后来我们约定每周六下午一起散步聊天，慢慢好了。',time:'07-18 08:00',likes:8,liked:false},
{id:2,author:'陈妈妈',avatarColor:'#FF6D00',text:'建议找学校的心理辅导老师聊聊，专业人士的建议会更有针对性。',time:'07-18 09:30',likes:5,liked:false},
{id:3,author:'赵妈妈',avatarColor:'#00838F',text:'不要给孩子太大压力，有时候家长的焦虑会传染给孩子。我们能做的就是给他一个温暖的家。',time:'07-18 10:45',likes:12,liked:false}
],
5:[
{id:1,author:'李爸爸',avatarColor:'#1565C0',text:'太感谢了！收藏了。错位相减法那块能详细讲讲吗？',time:'07-16 15:00',likes:3,liked:false},
{id:2,author:'张妈妈',avatarColor:'#E6431A',text:'能分享一下打印版吗？我也想给孩子贴一份。',time:'07-16 16:20',likes:2,liked:false}
],
6:[
{id:1,author:'李爸爸',avatarColor:'#1565C0',text:'这个方法我家孩子也在用，确实有效！关键是第一步不看选项通读全文。',time:'07-15 12:30',likes:4,liked:false},
{id:2,author:'刘爸爸',avatarColor:'#43A047',text:'从扣8分到扣2分，进步太明显了。请问大概练了多久？',time:'07-15 14:00',likes:2,liked:false}
],
7:[
{id:1,author:'王妈妈',avatarColor:'#9C27B0',text:'月考提了15分！太厉害了。这个功能确实值得坚持用。',time:'07-14 09:30',likes:5,liked:false},
{id:2,author:'赵妈妈',avatarColor:'#00838F',text:'同意先解决最弱的，不要面面俱到，集中火力各个击破。',time:'07-14 11:00',likes:3,liked:false}
]
};

function getPostId(){
const params=new URLSearchParams(window.location.search);
return parseInt(params.get('id'))||1;
}

const postId=getPostId();
const post=posts[postId]||posts[1];
const comments=commentsData[postId]||[];

function render(){
const isHot=post.pinned||post.likes>100;
let imagesHtml='';
if(post.images.length>0){
const cols=post.images.length===1?'cols-1':post.images.length===2?'cols-2':'cols-3';
imagesHtml=`<div class="post-detail-images ${cols}">${post.images.map(img=>`<img src="${img}">`).join('')}</div>`;
}

let html=`
<div class="post-header">
<div class="post-author">
<div class="avatar" style="background:${post.avatarColor}">${post.author[0]}</div>
<div class="author-info">
<div class="author-name">${post.author}</div>
<div class="author-meta">${post.time}</div>
</div>
<button class="follow-btn">关注</button>
</div>
<div class="post-detail-tags">
<span class="tag-circle">${post.circleName}</span>
${isHot?'<span class="tag-hot">热</span>':''}
${post.isReport?'<span class="tag-report"><span class="material-icons">insights</span>报告</span>':''}
</div>
<div class="post-detail-title">${post.title}</div>
<div class="post-detail-content">${post.content.replace(/\n/g,'<br>')}</div>
${imagesHtml}
<div class="post-stats">
<span><span class="material-icons">lightbulb</span>${post.likes} 亮了</span>
<span><span class="material-icons">chat_bubble_outline</span>${comments.length} 评论</span>
<span><span class="material-icons">share</span>${post.shares} 分享</span>
</div>
</div>

<div class="comments-section">
<div class="comments-title">评论 (${comments.length})</div>
${comments.length===0?'<div style="text-align:center;padding:20px;color:var(--hint);font-size:13px">暂无评论，快来抢沙发</div>':''}
${comments.map(c=>`
<div class="comment-item">
<div class="c-avatar" style="background:${c.avatarColor}">${c.author[0]}</div>
<div class="c-body">
<div class="c-header"><span class="c-name">${c.author}</span><span class="c-time">${c.time}</span></div>
<div class="c-text">${c.text}</div>
<div class="c-actions">
<button class="${c.liked?'liked':''}" onclick="likeComment(${c.id})"><span class="material-icons">${c.liked?'thumb_up':'thumb_up_off_alt'}</span>${c.likes}</button>
<button onclick="replyComment('${c.author}')"><span class="material-icons">reply</span>回复</button>
</div>
</div>
</div>`).join('')}
</div>`;
document.getElementById('pageBody').innerHTML=html;
}

function likeComment(cid){
const c=comments.find(x=>x.id===cid);
if(c){c.liked=!c.liked;c.likes+=c.liked?1:-1;render();}
}

function replyComment(name){
const input=document.getElementById('commentInput');
input.value=`回复 ${name}：`;
input.focus();
}

function sendComment(){
const input=document.getElementById('commentInput');
const text=input.value.trim();
if(!text&&commentImages.length===0)return;
let finalText=text;
if(commentImages.length>0)finalText+=(text?' ':'')+'[图片x'+commentImages.length+']';
comments.push({id:Date.now(),author:'我',avatarColor:'#E6431A',text:finalText,time:'刚刚',likes:0,liked:false});
input.value='';
commentImages=[];
renderImgPreview();
hideToolbar();
render();
const body=document.querySelector('.page-body');
body.scrollTop=body.scrollHeight;
}

let toolbarVisible=false;
let hideTimer=null;
let commentImages=[];
const atUsers=[
{name:'李爸爸',color:'#1565C0'},
{name:'王妈妈',color:'#9C27B0'},
{name:'张妈妈',color:'#E6431A'},
{name:'刘爸爸',color:'#43A047'},
{name:'陈妈妈',color:'#FF6D00'},
{name:'赵妈妈',color:'#00838F'}
];

function showToolbar(){
clearTimeout(hideTimer);
toolbarVisible=true;
document.getElementById('toolbarRow').classList.add('show');
}

function hideToolbarDelay(){
hideTimer=setTimeout(()=>{
if(!document.getElementById('atDropdown').classList.contains('show')){
hideToolbar();
}
},200);
}

function hideToolbar(){
toolbarVisible=false;
document.getElementById('toolbarRow').classList.remove('show');
document.getElementById('atDropdown').classList.remove('show');
}

function addImage(){
commentImages.push(placeholderImg);
if(commentImages.length>3)commentImages=commentImages.slice(0,3);
renderImgPreview();
}

function removeImage(idx){
commentImages.splice(idx,1);
renderImgPreview();
}

function renderImgPreview(){
const row=document.getElementById('imgPreviewRow');
if(commentImages.length===0){row.innerHTML='';return;}
row.innerHTML=commentImages.map((img,i)=>`
<div style="position:relative;width:56px;height:56px">
<img class="img-thumb" src="${img}" style="width:56px;height:56px;border-radius:8px;object-fit:cover">
<div class="img-remove" onclick="removeImage(${i})"><span class="material-icons" style="font-size:12px">close</span></div>
</div>`).join('');
}

function showAtList(){
clearTimeout(hideTimer);
const dropdown=document.getElementById('atDropdown');
dropdown.innerHTML=atUsers.map(u=>`
<div class="at-item" onmousedown="selectAt('${u.name}')">
<div class="at-avatar" style="background:${u.color}">${u.name[0]}</div>
<span class="at-name">${u.name}</span>
</div>`).join('');
dropdown.classList.add('show');
}

function selectAt(name){
const input=document.getElementById('commentInput');
input.value+=`@${name} `;
input.focus();
document.getElementById('atDropdown').classList.remove('show');
}

render();