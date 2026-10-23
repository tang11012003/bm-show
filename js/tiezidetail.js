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
let customPosts = [];
try {
  customPosts = JSON.parse(localStorage.getItem('community_custom_posts') || '[]');
} catch(e){}
const post = customPosts.find(p => p.id === postId) || posts[postId] || posts[1];
const comments=commentsData[postId]||[];

function render(){
const isHot=post.pinned||post.likes>100;
let imagesHtml='';
if(post.images.length>0){
const cols=post.images.length===1?'cols-1':post.images.length===2?'cols-2':'cols-3';
imagesHtml=`<div class="post-detail-images ${cols}">${post.images.map(img=>`<img src="${img}">`).join('')}</div>`;
}

  let reportAttachmentHtml = '';
  if (post.isReport) {
    const focus = post.selectedFocus;
    let cardBodyHtml = '';
    
    if (focus && focus.type === 'question' && focus.data) {
      const q = focus.data;
      cardBodyHtml = `
        <div class="focus-snippet-card">
          <div class="focus-snippet-head">
            <span class="focus-q-title"><span class="material-icons focus-q-icon">help_outline</span>第${q.qNo}题 · ${q.kpName}</span>
            <span class="focus-deduct-pill">失分 -${q.scoreLoss}分</span>
          </div>
          <div class="focus-stem-box">
            <div class="focus-stem-content">${q.stem || '暂无题目详情'}</div>
          </div>
          <div class="focus-obstacle-badge">
            <span class="obstacle-tag"><span class="material-icons" style="font-size:13px;">error_outline</span>孩子卡点</span>
            <span class="obstacle-desc">${q.obstacle || '二面角法向量建系坐标计算失误'}</span>
          </div>
          <div class="focus-suggestion-box">
            <span class="material-icons" style="font-size:14px;color:#9333EA;flex-shrink:0;margin-top:1px;">tips_and_updates</span>
            <div><strong>AI 提分锦囊：</strong>${q.suggestion || '建议先通过手绘辅助线明确平面法向量方向，建立右手直角坐标系后代入坐标公式校验。'}</div>
          </div>
          <div class="focus-reassurance-box">
            <span class="reassurance-icon">🌱</span>
            <span class="reassurance-text"><strong>底盘极稳：</strong>卷面其余19题均为满分！孩子基础功底非常扎实，攻克此题可冲击更高分段！</span>
          </div>
          <button class="btn-check-wrong-sheet" type="button" onclick="openWrongQuestionsModal()" style="margin-top:6px;">
            <span class="material-icons" style="font-size:16px;">receipt_long</span>
            查看整卷错题与解析 (4道) ›
          </button>
        </div>
      `;
    } else {
      // 整卷总览模式 (图二样式)
      cardBodyHtml = `
        <div class="diag-overview-box">
          <div class="kp-group-title urgent">
            <span class="material-icons">flag</span>
            <span>待攻坚突破知识点 (3项)</span>
          </div>
          <div class="kp-items-list">
            <div class="kp-item-card urgent" onclick="openWrongQuestionsModal()">
              <div class="kp-item-head">
                <span class="kp-item-name">第18题 · 解析几何 (二面角计算)</span>
                <span class="kp-item-score-loss">-8分</span>
              </div>
              <div class="kp-item-summary">2道错题 · 法向量建系坐标计算失误，已识别攻坚点</div>
              <div class="kp-item-action-link">查看错题解析与微课 ›</div>
            </div>
            <div class="kp-item-card urgent" onclick="openWrongQuestionsModal()">
              <div class="kp-item-head">
                <span class="kp-item-name">第4题 · 二次函数与区间最值</span>
                <span class="kp-item-score-loss">-5分</span>
              </div>
              <div class="kp-item-summary">1道错题 · 对称轴分类讨论不完整</div>
              <div class="kp-item-action-link">查看错题解析与微课 ›</div>
            </div>
          </div>
          <div class="kp-group-title keep" style="margin-top:10px;">
            <span class="material-icons">check_circle</span>
            <span>稳固基础底盘 (19项满分)</span>
          </div>
          <div class="kp-keep-grid">
            <span class="kp-keep-pill">集合与常用逻辑</span>
            <span class="kp-keep-pill">平面向量数量积</span>
            <span class="kp-keep-pill">复数四则运算</span>
            <span class="kp-keep-pill">等差数列性质</span>
            <span class="kp-keep-pill">+15项满分</span>
          </div>
          <button class="btn-check-wrong-sheet" type="button" onclick="openWrongQuestionsModal()" style="margin-top:10px;">
            <span class="material-icons" style="font-size:16px;">receipt_long</span>
            查看整卷4道错题与名师解析 ›
          </button>
        </div>
      `;
    }

    const rep = post.reportData || {};
    const scoreVal = rep.scoreRate !== undefined ? Math.round(rep.scoreRate) : 86;
    const sub = rep.subject || '数学';
    const urgentCount = Array.isArray(rep.toImprove) ? rep.toImprove.length : 2;
    const attentionCount = Array.isArray(rep.toFocus) ? rep.toFocus.length : 1;
    const keepCount = rep.totalKeepCount || 19;
    const totalCount = rep.totalCount || 22;
    const wrongCount = rep.wrongCount || (urgentCount + attentionCount);
    const correctCount = totalCount - wrongCount;
    const verdict = rep.verdict || '<strong>学情总评</strong>：基础概念盘极稳（94%达标，19题满分）；失分主要集中在<strong>中档综合题与压轴题计算</strong>。';
    const totalWeak = urgentCount + attentionCount;

    reportAttachmentHtml = `
      <div class="diag-share-card" id="tieziDiagCard" style="margin: 12px 0 16px;">
        <!-- 考试与学科元数据行 -->
        <div class="diag-exam-meta-row">
          <span class="diag-exam-pill">${rep.examName || '期中综合考试'}</span>
          <span class="diag-subject-pill">${sub}</span>
          <span class="diag-date-text">${rep.date ? rep.date.slice(5) : '10/10'} 诊断</span>
        </div>

        <!-- 核心大盘行：半圆仪表盘 + 三档统计 -->
        <div class="diag-dashboard-row">
          <div class="oc-gauge-wrap">
            <svg class="oc-gauge-svg" viewBox="0 0 120 60">
              <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="#E8E8E8" stroke-width="8" stroke-linecap="round"/>
              <path class="gauge-progress-path" d="M 10 55 A 50 50 0 0 1 100 25" fill="none" stroke="url(#gaugeGradSnapshotDetail)" stroke-width="8" stroke-linecap="round"/>
              <defs>
                <linearGradient id="gaugeGradSnapshotDetail" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#EAED83"/>
                  <stop offset="1" stop-color="#21DCAB"/>
                </linearGradient>
              </defs>
            </svg>
            <div class="oc-score-num">
              <span>${scoreVal}</span><span class="oc-score-unit">%</span>
            </div>
            <div class="oc-rate-label"><span class="oc-rate-dot"></span>得分率</div>
          </div>

          <div class="oc-stats-breakdown">
            <div class="oc-stat-row">
              <div class="oc-stat-left">
                <span class="oc-stat-bar urgent"></span>
                <span>待改进</span>
              </div>
              <div class="oc-stat-right-wrap">
                <span class="oc-stat-num">${urgentCount}</span>
                <span class="oc-stat-unit">处薄弱</span>
              </div>
            </div>
            <div class="oc-stat-row">
              <div class="oc-stat-left">
                <span class="oc-stat-bar attention"></span>
                <span>需关注</span>
              </div>
              <div class="oc-stat-right-wrap">
                <span class="oc-stat-num">${attentionCount}</span>
                <span class="oc-stat-unit">处易错</span>
              </div>
            </div>
            <div class="oc-stat-row">
              <div class="oc-stat-left">
                <span class="oc-stat-bar keep"></span>
                <span>持续保持</span>
              </div>
              <div class="oc-stat-right-wrap">
                <span class="oc-stat-num">${keepCount}</span>
                <span class="oc-stat-unit">处稳固</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 宏观题量与错题透出 -->
        <div class="oc-macro-stat-row">
          <div class="oc-macro-col">
            <span class="oc-macro-val">${totalCount} 题</span>
            <span class="oc-macro-lbl">总批改</span>
          </div>
          <div class="oc-macro-divider"></div>
          <div class="oc-macro-col">
            <span class="oc-macro-val" style="color:#E11D48;">${wrongCount} 题</span>
            <span class="oc-macro-lbl">卷面错题</span>
          </div>
          <div class="oc-macro-divider"></div>
          <div class="oc-macro-col">
            <span class="oc-macro-val" style="color:#059669;">${correctCount} 题</span>
            <span class="oc-macro-lbl">完全正确</span>
          </div>
        </div>

        <!-- 学情总评引用便签 -->
        <div class="diag-verdict-quote">
          <span class="quote-icon">💡</span>
          <span class="quote-text">${verdict}</span>
        </div>

        <!-- 展开/收起切换栏 -->
        <div class="diag-detail-toggle-btn" id="tieziDetailToggleBtn" onclick="toggleDetailReportCard(event)">
          <span id="tieziToggleText">展开明细</span>
          <svg class="diag-toggle-arrow" viewBox="0 0 16 16"><path d="M8 11.5L3.5 7h9L8 11.5z"/></svg>
        </div>

        <!-- 展开内容区 -->
        <div class="diag-collapsible-detail" id="tieziCollapsibleDetail" style="display:none;">
          <!-- 难易度得分分布 (展开区第一模块，对齐 baogao_preview.html) -->
          <div class="oc-diff-section" style="margin-bottom: 12px;">
            <div class="oc-diff-head">
              <div class="oc-diff-title">
                <svg viewBox="0 0 24 24" width="15" height="15"><path fill="#4F46E5" d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/></svg>
                <span>难易度得分分布</span>
              </div>
              <div class="oc-diff-badge">
                <span class="cac-badge-dot pass"></span>2项达标<span class="cac-badge-divider">·</span><span class="cac-badge-dot warn"></span>1项待提升
              </div>
            </div>
            <div class="cac-ind-list">
              <div class="cac-ind-row" title="基础题定义：单一步骤公式套用、概念辨析、识记题">
                <div class="cac-ind-left">
                  <span class="cac-ind-name">基础题</span>
                  <span class="cac-ind-sub">满分80分</span>
                </div>
                <div class="cac-ind-center">
                  <div class="cac-ind-track">
                    <div class="cac-ind-fill pass" style="width: 94%"></div>
                  </div>
                </div>
                <div class="cac-ind-right">
                  <span class="cac-ind-score">94%</span>
                  <span class="cac-ind-tag pass">达标</span>
                </div>
              </div>
              <div class="cac-ind-row" title="中档题定义：2~3个考点交叉、需常规逻辑推导">
                <div class="cac-ind-left">
                  <span class="cac-ind-name">中档题</span>
                  <span class="cac-ind-sub">满分50分</span>
                </div>
                <div class="cac-ind-center">
                  <div class="cac-ind-track">
                    <div class="cac-ind-fill good" style="width: 84%"></div>
                  </div>
                </div>
                <div class="cac-ind-right">
                  <span class="cac-ind-score">84%</span>
                  <span class="cac-ind-tag good">良好</span>
                </div>
              </div>
              <div class="cac-ind-row" title="难题定义：跨模块综合、含分类讨论、推导≥5步或新定义题">
                <div class="cac-ind-left">
                  <span class="cac-ind-name">难题</span>
                  <span class="cac-ind-sub">满分20分</span>
                </div>
                <div class="cac-ind-center">
                  <div class="cac-ind-track">
                    <div class="cac-ind-fill warn" style="width: 60%"></div>
                  </div>
                </div>
                <div class="cac-ind-right">
                  <span class="cac-ind-score">60%</span>
                  <span class="cac-ind-tag warn">待提升</span>
                </div>
              </div>
            </div>
          </div>
          ${cardBodyHtml}
          <div class="diag-viral-cta-box" onclick="window.location.href='xuanzhexingzhi.html';" style="margin-top:12px;">
            <div class="viral-cta-left">
              <div class="viral-text-group">
                <span class="viral-title">小苗伴学 · 试卷诊断</span>
                <span class="viral-sub">测同款试卷，精准排查薄弱知识点</span>
              </div>
            </div>
            <button class="viral-btn" type="button" onclick="event.stopPropagation(); window.location.href='xuanzhexingzhi.html';">免费诊断 ›</button>
          </div>
          <div class="diag-collapse-btn-row" onclick="toggleDetailReportCard(event)" style="margin-top:10px;">
            <span>收起考点明细</span>
            <span class="toggle-icon-circle is-up"><svg viewBox="0 0 16 16"><path d="M8 11.5L3.5 7h9L8 11.5z"/></svg></span>
          </div>
        </div>
      </div>
    `;
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
${reportAttachmentHtml}
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

/* === 错题弹窗底层数据与交互 (对齐 baogao_preview.html 原生规范) === */
const DEFAULT_WRONG_QUESTIONS = [
  {
    qNo: 18,
    scoreLoss: 8,
    stem: "已知四棱锥 P-ABCD 中，底面 ABCD 为菱形，∠DAB=60°，PA⊥底面 ABCD，PA=AB=2。E 为 PD 的中点。(1) 求证：PB // 平面 AEC；(2) 求二面角 D-AE-C 的正弦值。",
    kpName: "立体几何 · 空间向量求二面角",
    tagType: "待攻坚",
    reason: "二面角法向量建系错误，法向量坐标解算符号弄反导致最终余弦值求错。",
    difficulty: "较难 (难度系数 0.42)",
    standardScore: 12,
    myScore: 4,
    aiSuggestion: "建议先用右手定则重新确认空间直角坐标系各轴正方向，求解平面 AEC 的法向量 n=(x,y,z) 时用两向量内积为0立方程检验。"
  },
  {
    qNo: 4,
    scoreLoss: 5,
    stem: "设函数 f(x) = x^2 - 2ax + 3 在区间 [1, 3] 上的最大值为 M，最小值为 m。若 M - m = 4，则实数 a 的取值集合为？",
    kpName: "函数与导数 · 二次函数区间最值",
    tagType: "待突破",
    reason: "对称轴分类讨论漏解，只考虑了对称轴 a 在区间内部的情况，漏掉了 a < 1 与 a > 3 的边界临界点。",
    difficulty: "中等 (难度系数 0.61)",
    standardScore: 5,
    myScore: 0,
    aiSuggestion: "画数轴标出区间 [1, 3] 与动轴 x = a，分为 a<1, 1≤a<2, 2≤a≤3, a>3 四段讨论，尤其关注区间端点值比较。"
  },
  {
    qNo: 12,
    scoreLoss: 5,
    stem: "已知函数 f(x) = e^x - ax - 1 有两个零点，则实数 a 的取值范围是？",
    kpName: "函数与导数 · 导数极值与零点",
    tagType: "待突破",
    reason: "导数切线不等式放缩不熟练，未能准确分离参数 a = (e^x - 1)/x。",
    difficulty: "难 (难度系数 0.38)",
    standardScore: 5,
    myScore: 0,
    aiSuggestion: "采用参变分离法，构造 g(x)=(e^x-1)/x，利用求导研究 g(x) 单调性与极值确定 a 的范围。"
  },
  {
    qNo: 6,
    scoreLoss: 3,
    stem: "已知 sin(α - π/3) = 1/3，则 cos(α + π/6) 的值为？",
    kpName: "三角函数 · 诱导公式与和差化积",
    tagType: "需关注",
    reason: "诱导公式角变换符号遗漏，未能观察出 (α - π/3) + (α + π/6) 的角互余互补关联。",
    difficulty: "易 (难度系数 0.78)",
    standardScore: 5,
    myScore: 2,
    aiSuggestion: "利用角变换技巧：α + π/6 = π/2 - (π/3 - α) = π/2 + (α - π/3)，直接利用 cos(π/2 + θ) = -sinθ 快速化简。"
  }
];

function getPostWrongQuestions() {
  if (post && post.reportData && post.reportData.wrongQuestionsList && post.reportData.wrongQuestionsList.length > 0) {
    return post.reportData.wrongQuestionsList;
  }
  return DEFAULT_WRONG_QUESTIONS;
}

function openWrongQuestionsModal() {
  const modal = document.getElementById('wrongQuestionsModal');
  if (!modal) return;
  const questions = getPostWrongQuestions();
  const totalLoss = questions.reduce((sum, q) => sum + (q.scoreLoss || 0), 0);
  
  const countEl = document.getElementById('wmMetaCount');
  const lossEl = document.getElementById('wmMetaLoss');
  const listEl = document.getElementById('wmQuestionList');
  
  if (countEl) countEl.textContent = `已识别 ${questions.length} 道错题`;
  if (lossEl) lossEl.textContent = `累计失 ${totalLoss} 分`;
  
  if (listEl) {
    listEl.innerHTML = questions.map(q => `
      <div class="wm-question-card">
        <div class="wm-q-head">
          <span class="wm-q-no">第${q.qNo}题</span>
          <span class="wm-q-loss">- ${q.scoreLoss}分</span>
          <span class="wm-q-kp">${q.kpName}</span>
        </div>
        <div class="wm-q-stem">${q.stem}</div>
        <div class="wm-q-analysis">
          <div class="wm-q-reason"><strong>错因归因：</strong>${q.reason}</div>
          <div class="wm-q-suggest"><strong>AI提升建议：</strong>${q.aiSuggestion || '加强该题型的题干特征识别与通法强化练习。'}</div>
        </div>
      </div>
    `).join('');
  }
  
  modal.classList.add('show');
}

function closeWrongQuestionsModal() {
  const modal = document.getElementById('wrongQuestionsModal');
  if (modal) modal.classList.remove('show');
}

/**
 * 详情页折叠/展开诊断卡片
 */
/**
 * 详情页展开/收起诊断考点明细
 */
function toggleDetailReportCard(e) {
  if (e) e.stopPropagation();
  const detailBox = document.getElementById('tieziCollapsibleDetail');
  const toggleBtn = document.getElementById('tieziDetailToggleBtn');
  const toggleText = document.getElementById('tieziToggleText');
  if (!detailBox) return;
  const isHidden = detailBox.style.display === 'none';
  if (isHidden) {
    detailBox.style.display = 'block';
    if (toggleBtn) toggleBtn.style.display = 'none';
  } else {
    detailBox.style.display = 'none';
    if (toggleBtn) {
      toggleBtn.style.display = 'flex';
      toggleBtn.classList.remove('is-expanded');
    }
    if (toggleText) toggleText.textContent = '展开明细';
  }
}
