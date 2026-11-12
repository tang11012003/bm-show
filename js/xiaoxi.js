// Social interaction data
const socialData={
likes:[
{id:1,user:'王妈妈',avatar:'#9C27B0',action:'赞了你的帖子',ref:'错题整理方法分享',time:'07-22 09:30'},
{id:2,user:'李爸爸',avatar:'#1565C0',action:'赞了你的评论',ref:'建议先把基础公式背熟再做题',time:'07-21 18:20'},
{id:3,user:'陈妈妈',avatar:'#FF6D00',action:'赞了你的帖子',ref:'数学期中考试分析报告分享',time:'07-21 14:10'},
{id:4,user:'赵妈妈',avatar:'#00838F',action:'赞了你的评论',ref:'我家也试过这个方法，确实有效',time:'07-20 22:00'},
{id:5,user:'刘爸爸',avatar:'#43A047',action:'赞了你的帖子',ref:'错题整理方法分享',time:'07-20 16:45'}
],
followers:[
{id:1,user:'陈妈妈',avatar:'#FF6D00',time:'07-22 08:15',followed:false},
{id:2,user:'赵妈妈',avatar:'#00838F',time:'07-21 20:30',followed:true},
{id:3,user:'刘爸爸',avatar:'#43A047',time:'07-20 11:00',followed:true}
],
comments:[
{id:1,user:'李爸爸',avatar:'#1565C0',action:'回复了你',content:'我家也是这个问题，后来给孩子报了一个网课，三角函数那块好多了。',ref:'孩子三角函数老出错怎么办？',time:'07-22 10:15'},
{id:2,user:'赵妈妈',avatar:'#00838F',action:'评论了你的帖子',content:'谢谢分享！我家孩子也在试这个方法，确实有帮助。',ref:'错题整理方法分享',time:'07-21 20:10'},
{id:3,user:'王妈妈',avatar:'#9C27B0',action:'@了你',content:'@张妈妈 你之前推荐的那本练习册叫什么名字？想给我家孩子也买一本。',ref:'数列求和公式总结',time:'07-21 15:30'},
{id:4,user:'刘爸爸',avatar:'#43A047',action:'回复了你',content:'同感，让孩子先把公式推导一遍，理解推导过程比死记硬背有用。',ref:'孩子三角函数老出错怎么办？',time:'07-20 18:00'}
]
};

// Channel data
const channels={
system:[
{id:1,title:'系统更新通知',content:'陪读社区 v2.1 已更新：新增确认错题功能',time:'07-20'},
{id:2,title:'活动通知',content:'暑期学习打卡活动开始，连续7天打卡赢分析次数',time:'07-18'}
],
study:[
{id:1,title:'分析报告已生成',content:'「数学期中考试」试卷分析已完成，点击查看',time:'07-22'},
{id:2,title:'备考提醒',content:'距期中联考还有5天，建议重点复习薄弱知识点',time:'07-21'},
{id:3,title:'错题复盘建议',content:'距上次错题复盘已过7天，建议安排一次复盘',time:'07-19'}
],
chat:[
{id:1,name:'李爸爸',avatar:'李',lastMsg:'好的，我把那个网课链接发给你',time:'10:30',unread:2},
{id:2,name:'王妈妈',avatar:'王',lastMsg:'太感谢了！我回去让孩子试试',time:'昨天',unread:0},
{id:3,name:'系统助手',avatar:'系',lastMsg:'欢迎使用陪读社区，有问题可以咨询',time:'07-15',unread:0}
]
};

const unreadCounts={likes:3,followers:1,comments:2,system:1,study:2,chat:2};

let currentView='main'; // main | likes | followers | comments

function renderMain(){
document.getElementById('mainAppBar').style.display='flex';
document.getElementById('mainAppBar').innerHTML='<span class="title">消息</span>';

let html=`
<div class="social-strip">
<div class="social-item" onclick="openView('likes')">
<div class="si-icon" style="background:rgba(233,30,99,.1)"><span class="material-icons" style="color:#E91E63">favorite</span></div>
${unreadCounts.likes>0?`<span class="si-badge">${unreadCounts.likes}</span>`:''}
<span class="si-label">赞</span>
</div>
<div class="social-item" onclick="openView('followers')">
<div class="si-icon" style="background:rgba(21,101,194,.1)"><span class="material-icons" style="color:#1565C0">person_add</span></div>
${unreadCounts.followers>0?`<span class="si-badge">${unreadCounts.followers}</span>`:''}
<span class="si-label">新增粉丝</span>
</div>
<div class="social-item" onclick="openView('comments')">
<div class="si-icon" style="background:rgba(67,160,71,.1)"><span class="material-icons" style="color:#43A047">chat</span></div>
${unreadCounts.comments>0?`<span class="si-badge">${unreadCounts.comments}</span>`:''}
<span class="si-label">评论和@</span>
</div>
</div>

<div class="channel-section">
<div class="channel-section-title">消息频道</div>
</div>

<div class="channel-item" onclick="alert('系统通知详情')">
<div class="ch-icon" style="background:rgba(21,101,194,.08)"><span class="material-icons" style="color:#1565C0">campaign</span></div>
<div class="ch-body">
<div class="ch-title">系统通知</div>
<div class="ch-desc">${channels.system[0].content}</div>
</div>
<div class="ch-right">
<span class="ch-time">${channels.system[0].time}</span>
${unreadCounts.system>0?`<span class="ch-badge">${unreadCounts.system}</span>`:''}
</div>
</div>
<div class="channel-item" onclick="alert('学情诊断提醒详情')">
<div class="ch-icon" style="background:rgba(230,67,26,.08)"><span class="material-icons" style="color:var(--primary)">analytics</span></div>
<div class="ch-body">
<div class="ch-title">学情诊断提醒</div>
<div class="ch-desc">${channels.study[0].content}</div>
</div>
<div class="ch-right">
<span class="ch-time">${channels.study[0].time}</span>
${unreadCounts.study>0?`<span class="ch-badge">${unreadCounts.study}</span>`:''}
</div>
</div>
<div class="channel-item" onclick="alert('私信列表')">
<div class="ch-icon" style="background:rgba(156,39,176,.08)"><span class="material-icons" style="color:#9C27B0">mail</span></div>
<div class="ch-body">
<div class="ch-title">私信</div>
<div class="ch-desc">${channels.chat[0].name}：${channels.chat[0].lastMsg}</div>
</div>
<div class="ch-right">
<span class="ch-time">${channels.chat[0].time}</span>
${unreadCounts.chat>0?`<span class="ch-badge">${unreadCounts.chat}</span>`:''}
</div>
</div>
`;
document.getElementById('pageBody').innerHTML=html;
}

function openView(view){
currentView=view;
if(view==='likes')renderLikes();
else if(view==='followers')renderFollowers();
else if(view==='comments')renderComments();
}

function goBack(){
currentView='main';
renderMain();
}

function renderLikes(){
unreadCounts.likes=0;
document.getElementById('mainAppBar').innerHTML=`
<button class="back-btn" onclick="goBack()" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;border-radius:50%;border:none;background:none;color:var(--text2)"><span class="material-icons">arrow_back</span></button>
<span class="title" style="margin-left:4px">赞</span>`;

document.getElementById('pageBody').innerHTML=`<div class="detail-list">${socialData.likes.map(item=>`
<div class="detail-item">
<div class="di-avatar" style="background:${item.avatar}">${item.user[0]}</div>
<div class="di-body">
<div class="di-header"><span class="di-name">${item.user}</span><span class="di-time">${item.time}</span></div>
<div class="di-content">${item.action}</div>
<div class="di-ref">${item.ref}</div>
</div>
</div>`).join('')}</div>`;
}

function renderFollowers(){
unreadCounts.followers=0;
document.getElementById('mainAppBar').innerHTML=`
<button class="back-btn" onclick="goBack()" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;border-radius:50%;border:none;background:none;color:var(--text2)"><span class="material-icons">arrow_back</span></button>
<span class="title" style="margin-left:4px">新增粉丝</span>`;

document.getElementById('pageBody').innerHTML=`<div class="detail-list">${socialData.followers.map(item=>`
<div class="detail-item">
<div class="di-avatar" style="background:${item.avatar}">${item.user[0]}</div>
<div class="di-body">
<div class="di-header"><span class="di-name">${item.user}</span><span class="di-time">${item.time}</span></div>
<div class="di-content">关注了你</div>
</div>
<button style="padding:5px 14px;border-radius:14px;font-size:12px;font-weight:500;cursor:pointer;flex-shrink:0;margin-left:8px;${item.followed?'background:none;border:1px solid var(--divider);color:var(--text3)':'background:var(--primary);border:none;color:#fff'}">${item.followed?'已关注':'回关'}</button>
</div>`).join('')}</div>`;
}

function renderComments(){
unreadCounts.comments=0;
document.getElementById('mainAppBar').innerHTML=`
<button class="back-btn" onclick="goBack()" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;border-radius:50%;border:none;background:none;color:var(--text2)"><span class="material-icons">arrow_back</span></button>
<span class="title" style="margin-left:4px">评论和@</span>`;

document.getElementById('pageBody').innerHTML=`<div class="detail-list">${socialData.comments.map(item=>`
<div class="detail-item">
<div class="di-avatar" style="background:${item.avatar}">${item.user[0]}</div>
<div class="di-body">
<div class="di-header"><span class="di-name">${item.user} <span style="font-weight:400;color:var(--text3)">${item.action}</span></span><span class="di-time">${item.time}</span></div>
<div class="di-content">${item.content}</div>
<div class="di-ref">${item.ref}</div>
</div>
</div>`).join('')}</div>`;
}

renderMain();