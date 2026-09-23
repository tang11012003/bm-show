const user={name:'张妈妈',phone:'138****8888',verified:true,following:23,followers:56,likes:128};
const quota={free:5,used:3,bonus:2,totalRemain:4};
const invites=[
{code:'ZHANG88',usedBy:'王妈妈',usedAt:'2026-07-10',status:'used'},
{code:'ZHANG66',usedBy:null,usedAt:null,status:'active',expiresAt:'2026-08-20'}
];

function render(){
document.getElementById('pageBody').innerHTML=`
<div class="card user-card">
<div class="user-avatar">张</div>
<div class="user-info">
<div class="user-name">${user.name}</div>
<div class="user-phone">${user.phone}</div>
${user.verified?'<div class="user-badge"><span class="material-icons">verified</span>已认证家长</div>':'<div class="user-badge" style="color:var(--attention);background:rgba(251,192,45,.08)"><span class="material-icons">warning</span>未认证</div>'}
</div>
</div>

<div class="card stats-card">
<div class="stat-item"><div class="stat-num">${user.following}</div><div class="stat-label">关注</div></div>
<div class="stat-item"><div class="stat-num">${user.followers}</div><div class="stat-label">粉丝</div></div>
<div class="stat-item"><div class="stat-num">${user.likes}</div><div class="stat-label">获赞</div></div>
</div>

<div class="card menu-list">
<div class="menu-item" onclick="window.location.href='jiazhangrenzheng.html'">
<div class="mi-icon" style="background:rgba(67,160,71,.1)"><span class="material-icons" style="color:var(--keep)">verified_user</span></div>
<div class="mi-content"><div class="mi-title">家长认证</div><div class="mi-sub">${user.verified?'已通过邀请码认证':'点击进行认证'}</div></div>
<div class="mi-arrow"><span class="material-icons">chevron_right</span></div>
</div>
<div class="menu-item" onclick="window.location.href='fenxi.html'">
<div class="mi-icon" style="background:rgba(230,67,26,.1)"><span class="material-icons" style="color:var(--primary)">insights</span></div>
<div class="mi-content"><div class="mi-title">学习分析</div><div class="mi-sub">能力雷达、得分趋势、知识点诊断</div></div>
<div class="mi-arrow"><span class="material-icons">chevron_right</span></div>
</div>
<div class="menu-item" onclick="alert('分析次数详情')">
<div class="mi-icon" style="background:rgba(21,101,194,.1)"><span class="material-icons" style="color:#1565C0">confirmation_number</span></div>
<div class="mi-content"><div class="mi-title">本月剩余分析次数</div><div class="mi-sub">免费 ${quota.free} 次 + 奖励 ${quota.bonus} 次 · 剩余 ${quota.totalRemain} 次</div></div>
<div class="mi-arrow"><span class="material-icons">chevron_right</span></div>
</div>
</div>

<div class="card">
<div class="section-title">我的邀请码 <button style="background:none;border:none;color:var(--primary);font-size:13px;cursor:pointer;display:flex;align-items:center;gap:2px" onclick="generateInvite()"><span class="material-icons" style="font-size:16px">add</span>生成</button></div>
${invites.map(inv=>`
<div class="invite-item">
<span class="material-icons ii-icon">${inv.status==='used'?'check_circle':'qr_code'}</span>
<div class="ii-content">
<div class="ii-code">${inv.code}</div>
<div class="ii-sub">${inv.status==='used'?`${inv.usedBy} · ${inv.usedAt} 使用`:`有效期至 ${inv.expiresAt}`}</div>
</div>
</div>`).join('')}
</div>

<div class="card menu-list">
<div class="menu-item" onclick="window.location.href='bianjixs.html'">
<div class="mi-icon" style="background:rgba(156,39,176,.1)"><span class="material-icons" style="color:#9C27B0">face</span></div>
<div class="mi-content"><div class="mi-title">我的孩子</div><div class="mi-sub">张小明 · 高三理科</div></div>
<div class="mi-arrow"><span class="material-icons">chevron_right</span></div>
</div>
<div class="menu-item" onclick="window.location.href='shezhi.html'">
<div class="mi-icon" style="background:#f5f5f5"><span class="material-icons" style="color:var(--text3)">settings</span></div>
<div class="mi-content"><div class="mi-title">设置</div><div class="mi-sub">账号与隐私</div></div>
<div class="mi-arrow"><span class="material-icons">chevron_right</span></div>
</div>
</div>

`;
}

function generateInvite(){
const code='ZHANG'+Math.random().toString(36).substr(2,4).toUpperCase();
const d=new Date();d.setDate(d.getDate()+30);
const exp=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
invites.push({code,usedBy:null,usedAt:null,status:'active',expiresAt:exp});
render();
}

render();