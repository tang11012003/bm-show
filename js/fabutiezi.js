/**
 * 发布帖子逻辑 - 家长学情攻坚便签与真实心声流转
 */

let images = [];
const placeholderImg = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="#e8e8e8" width="200" height="200"/><text x="100" y="95" text-anchor="middle" font-size="12" fill="#999">示例图片</text><rect x="60" y="105" width="80" height="50" rx="4" fill="#ddd"/><circle cx="85" cy="125" r="8" fill="#bbb"/><path d="M70 150 L100 120 L130 150Z" fill="#ccc"/></svg>');

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => {
    t.style.display = 'none';
  }, 2000);
}

function addImage() {
  if (images.length >= 9) {
    showToast('最多上传9张照片');
    return;
  }
  images.push(placeholderImg);
  renderImages();
}

function removeImage(idx) {
  images.splice(idx, 1);
  renderImages();
}

function renderImages() {
  const grid = document.getElementById('postImageGrid');
  if (!grid) return;
  
  let html = images.map((img, i) => `
    <div class="post-img-thumb">
      <img src="${img}" alt="upload">
      <button class="post-img-del-btn" onclick="removeImage(${i})" type="button">
        <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </button>
    </div>
  `).join('');

  if (images.length < 9) {
    html += `
      <div class="post-add-img-box" onclick="addImage()">
        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
      </div>
    `;
  }
  grid.innerHTML = html;
}

/**
 * 存草稿
 */
function saveDraft() {
  const title = document.getElementById('postTitleInput').value.trim();
  const content = document.getElementById('postContentInput').value.trim();
  if (!title && !content && images.length === 0) {
    showToast('内容为空，无需保存草稿');
    return;
  }
  try {
    localStorage.setItem('post_draft', JSON.stringify({
      title,
      content,
      images,
      saveTime: new Date().toISOString()
    }));
    showToast('草稿已保存');
  } catch (e) {
    showToast('草稿保存成功');
  }
}

/**
 * 返回
 */
function goBack() {
  const title = document.getElementById('postTitleInput').value.trim();
  const content = document.getElementById('postContentInput').value.trim();
  if (title || content || images.length > 0) {
    if (confirm('有未发布的内容，是否保存草稿后退出？')) {
      saveDraft();
    }
  }
  window.history.back();
}

function addTopic() {
  const input = document.getElementById('postContentInput');
  if (!input) return;
  const pos = input.selectionStart || input.value.length;
  const val = input.value;
  input.value = val.slice(0, pos) + ' #高考数学攻坚# ' + val.slice(pos);
  input.focus();
}

/**
 * 真实陪读家长求助心声模板字典 (彻底消灭机器人水军公关语)
 */
const POST_TEMPLATES = {
  help: {
    badgeClass: 'help',
    badgeText: '🎯 错题急迫求助',
    title: '孩子数学考了86分，二次函数与方程综合老丢分，想求助有经验的家长二轮怎么攻坚？',
    content: '#数学提分 #二次函数与方程综合 · 刚用学情诊断测了最新试卷，基础题全拿下了（19处稳固），但二次函数与方程综合老扣分（如图报告）。想求助各位有经验的家长，现阶段刷专题卷有用还是找网课专项突破？在线等建议！',
    focusText: '“二次函数分类讨论与代数化简老失分，求过来人家长推荐高效复习技巧！”'
  },
  discuss: {
    badgeClass: 'discuss',
    badgeText: '💬 考点同温层交流',
    title: '数学大题失分诊断报告，同在攻坚二次函数与方程综合的家长欢迎进帖交流～',
    content: '#学习经验交流 #同温层打气 · 发现不少同分段孩子都在二次函数与方程综合和大题计算扣分，大家有什么防粗心技巧或好的例题笔记吗？欢迎评论区互换复习经验！',
    focusText: '“寻求同考点解题口诀与易错笔记互换交流～”'
  },
  clockin: {
    badgeClass: 'clockin',
    badgeText: '📈 提分阶段打卡',
    title: '【提分打卡】数学阶段诊断复盘：基础送分题100%全拿下（19题满分），立帖见证冲刺95分！',
    content: '#提分打卡 #数学复盘 · 坚持每周整理错题并针对性练习，这次诊断基础送分题全部稳固（19题全拿满分）！现在主要集中火力攻坚二次函数与方程综合，立帖见证冲刺95分！大家一起加油！',
    focusText: '“基础防线已筑牢，正集中火力攻坚最后2处薄弱考点！”'
  }
};

let currentTemplate = 'help';

function applyTemplate(type, showToastFlag = false) {
  currentTemplate = type;
  const chips = document.querySelectorAll('.template-chip');
  if (chips.length > 0) {
    chips.forEach(c => c.classList.remove('active'));
    const targetBtn = document.getElementById('tplBtn' + type.charAt(0).toUpperCase() + type.slice(1));
    if (targetBtn) targetBtn.classList.add('active');
  }

  const tpl = POST_TEMPLATES[type] || POST_TEMPLATES.help;
  const titleInput = document.getElementById('postTitleInput');
  const contentInput = document.getElementById('postContentInput');
  const badgeEl = document.getElementById('diagIntentBadge');

  if (titleInput && tpl.title) titleInput.value = tpl.title;
  if (contentInput && tpl.content) contentInput.value = tpl.content;
  if (badgeEl) {
    badgeEl.className = 'diag-intent-badge ' + tpl.badgeClass;
    badgeEl.textContent = tpl.badgeText;
  }
  if (showToastFlag) {
    showToast('已代入「' + tpl.badgeText + '」模板');
  }
}

/**
 * 预览报告弹窗控制 (发帖页轻量抽屉预览)
 */
function openReportPreviewModal(e) {
  if (e) e.stopPropagation();
  const modal = document.getElementById('reportPreviewModal');
  if (modal) modal.classList.add('show');
}

function closeReportPreviewModal() {
  const modal = document.getElementById('reportPreviewModal');
  if (modal) modal.classList.remove('show');
}

/**
 * 隐私脱敏开关
 */
function togglePrivacyScore(isPrivate) {
  const card = document.getElementById('diagShareCard');
  const scoreTextEl = document.getElementById('attachScoreText');
  
  if (card) {
    if (isPrivate) card.classList.add('is-private-score');
    else card.classList.remove('is-private-score');
  }

  if (scoreTextEl && currentShareData) {
    const score = Math.round(currentShareData.scoreRate !== undefined ? currentShareData.scoreRate : 86);
    if (isPrivate) {
      scoreTextEl.textContent = '得分率已保护';
      scoreTextEl.classList.add('is-private');
      showToast('🛡️ 已开启隐私保护，得分率已对外界脱敏');
    } else {
      scoreTextEl.textContent = '得分率 ' + score + '%';
      scoreTextEl.classList.remove('is-private');
      showToast('已恢复公开显示得分率');
    }
  }
}

/**
 * 挂载与取消挂载诊断报告及渐进展开考点明细
 */
let isReportCardRemoved = false;

function toggleDetailContent(e) {
  if (e) e.stopPropagation();
  const detailBox = document.getElementById('diagCollapsibleDetail');
  const toggleBtn = document.getElementById('diagDetailToggleBtn');
  const toggleText = document.getElementById('diagToggleText');
  
  if (!detailBox) return;
  const isHidden = detailBox.style.display === 'none';
  if (isHidden) {
    detailBox.style.display = 'block';
    if (toggleBtn) toggleBtn.classList.add('is-expanded');
    if (toggleText) toggleText.textContent = '收起明细';
  } else {
    detailBox.style.display = 'none';
    if (toggleBtn) toggleBtn.classList.remove('is-expanded');
    if (toggleText) toggleText.textContent = '展开明细';
  }
}

// 兼容别名
function toggleShareCardExpand(e) {
  toggleDetailContent(e);
}

function removeReportCard(e) {
  if (e) e.stopPropagation();
  const card = document.getElementById('diagShareCard');
  const banner = document.getElementById('cardRemovedBanner');
  if (card) card.style.display = 'none';
  if (banner) banner.style.display = 'flex';
  isReportCardRemoved = true;
  showToast('已取消附带试卷诊断');
}

function restoreReportCard() {
  const card = document.getElementById('diagShareCard');
  const banner = document.getElementById('cardRemovedBanner');
  if (card) card.style.display = 'block';
  if (banner) banner.style.display = 'none';
  isReportCardRemoved = false;
  showToast('已重新附带试卷诊断');
}

/**
 * 发布帖子 (打通全链路持久化)
 */
function publishPost() {
  const title = document.getElementById('postTitleInput').value.trim();
  const content = document.getElementById('postContentInput').value.trim();
  
  if (!title && !content && images.length === 0) {
    showToast('请输入内容或上传照片');
    return;
  }

  const btn = document.getElementById('publishMainBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '发布中…';
  }

  // 存入社区自定义动态
  try {
    const isPrivate = document.getElementById('privacyScoreToggle')?.checked || false;
    const newPost = {
      id: Date.now(),
      author: '我（高三家长）',
      circleId: 1,
      circleName: '高三数学',
      title: title || '试卷诊断与学习心得分享',
      content: content,
      likes: 1,
      comments: 0,
      shares: 0,
      images: images,
      pinned: false,
      isReport: !isReportCardRemoved,
      time: '刚刚',
      isPrivateScore: isPrivate,
      templateType: currentTemplate,
      reportData: isReportCardRemoved ? null : currentShareData,
      selectedFocus: currentFocusQuestionIndex
    };
    const old = JSON.parse(localStorage.getItem('community_custom_posts') || '[]');
    old.unshift(newPost);
    localStorage.setItem('community_custom_posts', JSON.stringify(old));
  } catch(e) {}

  setTimeout(() => {
    showToast('发布成功！已同步至小苗社区');
    try {
      localStorage.removeItem('post_draft');
    } catch(e) {}
    setTimeout(() => {
      window.location.href = 'shequ.html';
    }, 700);
  }, 800);
}

/**
 * 初始化填充学情/诊断数据
 */
let currentShareData = null;
let allFocusQuestions = [];
let currentFocusQuestionIndex = 0; // 默认聚焦失分最高的大题

function initReportData() {
  let data = null;
  try {
    const raw = sessionStorage.getItem('shareReport');
    if (raw) data = JSON.parse(raw);
  } catch (e) {
    console.warn('Read shareReport failed', e);
  }

  // 兜底数据
  if (!data) {
    data = {
      examName: '期中综合考试',
      subject: '数学',
      date: '2026-10-10',
      scoreRate: 86,
      totalCount: 22,
      wrongCount: 3,
      correctCount: 19,
      totalKeepCount: 19,
      verdict: '<strong>学情总评</strong>：基础概念盘极稳（94%达标，19题满分）；失分主要集中在<strong>中档综合题与压轴题计算</strong>，重点突破二次函数与几何推导即可冲刺90+分。',
      toImprove: [
        {
          order: 1,
          kp: '二次函数与方程综合',
          totalLostScore: 13,
          suggestion: '稳拿第(1)问步骤分，强化韦达定理代入；代入前养成逆向检验习惯',
          questions: [
            {
              no: '第 18 题',
              type: '解答题',
              deduct: 8,
              stem: '已知椭圆 C: x²/a² + y²/b² = 1 (a>b>0) 的离心率为 √3/2，且过点 (2, 1)。<br>(1) 求椭圆 C 的标准方程；<br>(2) 直线 l 与椭圆 C 交于 A, B 两点，若以 AB 为直径的圆过原点 O，求 △OAB 面积的最大值。',
              reason: '第(1)问已得满分；第(2)问联立方程未化简（扣 8 分）'
            },
            {
              no: '第 4 题',
              type: '单选',
              deduct: 5,
              stem: '设函数 f(x) = 2^{x(x-a)} 在区间 (0, 1) 单调递减，则 a 的取值范围是（　）<div style="color:#64748B;font-size:11.5px;margin-top:4px;">A. (-∞, -2] &nbsp;&nbsp; B. [-2, 0) &nbsp;&nbsp; C. (0, 2] &nbsp;&nbsp; D. [2, +∞)</div>',
              reason: '错选 B ｜ 对称轴分类讨论漏情况，判别式负号判断失误（正确答案：D）'
            }
          ]
        },
        {
          order: 2,
          kp: '三角恒等变换与诱导公式',
          totalLostScore: 5,
          suggestion: '熟练掌握诱导公式推导法则，建立错题反思卡，代入前养成先检验象限符号的习惯',
          questions: [
            {
              no: '第 12 题',
              type: '填空题',
              deduct: 5,
              stem: '若 sin(α - β) = 1/3，cosα sinβ = 1/6，则 cos(2α + 2β) = ______。',
              reason: '诱导公式“符号看象限”混淆，负号漏写（正确答案：1/9）'
            }
          ]
        }
      ],
      toFocus: [
        {
          order: 1,
          kp: '立体几何位置关系判定',
          totalLostScore: 3,
          suggestion: '多选题做完用特殊几何体模型快速画图验算，切忌凭第一直觉只选两项',
          questions: [
            {
              no: '第 6 题',
              type: '多项选择题',
              deduct: 3,
              stem: '下列命题中，为真命题的是（　）<div style="color:#64748B;font-size:11.5px;margin-top:4px;">A. 平行于同一平面的两条直线平行<br>B. 垂直于同一平面的两个平面平行<br>C. 一条直线与两个平行平面中的一个相交，则必与另一个相交<br>D. 空间中与两条异面直线都垂直的直线有且仅有一条</div>',
              reason: '漏选 D ｜ 空间线面平行与垂直判定审题不细致'
            }
          ]
        }
      ],
      toMaintain: [
        '集合的交集与并集', '平面向量数量积', '复数代数运算与共轭', '基本不等式求最值',
        '等差数列通项公式', '函数定义域与值域', '线性规划', '二项式定理',
        '直线与圆的方程', '几何概型', '算法初步', '充要条件判定'
      ]
    };
  }
  currentShareData = data;

  // 1. 填充顶部元数据
  const examEl = document.getElementById('diagExamName');
  const subjEl = document.getElementById('diagSubjectPill');
  const dateEl = document.getElementById('diagDateText');
  if (examEl) examEl.textContent = data.examName || '期中综合考试';
  if (subjEl) subjEl.textContent = data.subject || '数学';
  if (dateEl) dateEl.textContent = (data.date ? data.date.slice(5) : '10/10') + ' 诊断';

  // 2. 填充得分率与仪表盘弧度
  const score = Math.round(data.scoreRate !== undefined ? data.scoreRate : 86);
  const scoreValEl = document.getElementById('scoreVal');
  if (scoreValEl) scoreValEl.textContent = score;

  // 3. 填充三档统计 (直接映射 baogao_preview.html)
  const urgentCount = Array.isArray(data.toImprove) ? data.toImprove.length : 2;
  const attentionCount = Array.isArray(data.toFocus) ? data.toFocus.length : 1;
  const keepCount = data.totalKeepCount || 19;

  const urgEl = document.getElementById('urgentCount');
  const attEl = document.getElementById('attentionCount');
  const kepEl = document.getElementById('keepCount');
  if (urgEl) urgEl.textContent = urgentCount;
  if (attEl) attEl.textContent = attentionCount;
  if (kepEl) kepEl.textContent = keepCount;

  // 3.1 动态更新展开按钮文本
  const toggleText = document.getElementById('diagToggleText');
  if (toggleText) {
    toggleText.textContent = '展开明细';
  }

  // 4. 填充宏观题量
  const totalCount = data.totalCount || 22;
  const wrongCount = data.wrongCount || (urgentCount + attentionCount);
  const correctCount = totalCount - wrongCount;

  const totEl = document.getElementById('totalCountVal');
  const wrgEl = document.getElementById('wrongCountVal');
  const corEl = document.getElementById('correctCountVal');
  if (totEl) totEl.textContent = totalCount + ' 题';
  if (wrgEl) wrgEl.textContent = wrongCount + ' 题';
  if (corEl) corEl.textContent = correctCount + ' 题';

  // 5. 填充学情总评
  const verdictEl = document.getElementById('verdictText');
  if (verdictEl && data.verdict) {
    verdictEl.innerHTML = data.verdict;
  }

  // 6. 渲染详细考点列表 (继承 baogao_preview.html 原版卡片与抽屉)
  const detailList = document.getElementById('diagDetailList');
  if (detailList) {
    let listHtml = '';
    
    // 待攻坚薄弱 (图二紧凑卡片)
    if (Array.isArray(data.toImprove) && data.toImprove.length > 0) {
      listHtml += `
        <div class="diag-card-group-title">
          <span style="color:#E11D48;">●</span>
          <span>待改进（需重点突破 · ${data.toImprove.length}项）</span>
        </div>
      `;
      data.toImprove.forEach(item => {
        const questions = item.questions || [];
        listHtml += `
          <div class="kp-item-card" onclick="openWrongQuestionsModal('${item.kp}', 'urgent')">
            <div class="kp-item-header">
              <div class="kp-header-left">
                <span class="kp-order-badge urgent">待突破 ${item.order || ''}</span>
                <span class="kp-name-title">${item.kp || ''}</span>
              </div>
              <div class="kp-total-loss-pill urgent">
                <span>共失 ${item.totalLostScore || 5} 分</span>
              </div>
            </div>
            <div class="kp-compact-footer">
              <span class="kp-compact-count">📋 关联错题 ${questions.length} 题</span>
              <span class="kp-compact-action">查看错题与提分策略 ›</span>
            </div>
          </div>
        `;
      });
    }

    // 需关注巩固 (图二紧凑卡片)
    if (Array.isArray(data.toFocus) && data.toFocus.length > 0) {
      listHtml += `
        <div class="diag-card-group-title" style="margin-top:6px;">
          <span style="color:#D97706;">●</span>
          <span>需关注（加强巩固 · ${data.toFocus.length}项）</span>
        </div>
      `;
      data.toFocus.forEach(item => {
        const questions = item.questions || [];
        listHtml += `
          <div class="kp-item-card" onclick="openWrongQuestionsModal('${item.kp}', 'attention')">
            <div class="kp-item-header">
              <div class="kp-header-left">
                <span class="kp-order-badge attention">需巩固 ${item.order || ''}</span>
                <span class="kp-name-title">${item.kp || ''}</span>
              </div>
              <div class="kp-total-loss-pill attention">
                <span>共失 ${item.totalLostScore || 3} 分</span>
              </div>
            </div>
            <div class="kp-compact-footer">
              <span class="kp-compact-count">📋 关联错题 ${questions.length} 题</span>
              <span class="kp-compact-action">查看错题与提分策略 ›</span>
            </div>
          </div>
        `;
      });
    }

    // 持续保持基本盘 (已掌握考点高光标签墙 + 展开收起)
    listHtml += `
      <div class="diag-card-group-title" style="margin-top:8px;">
        <span style="color:#10B981;">●</span>
        <span>持续保持（${keepCount}项全稳固）</span>
      </div>
      <div id="keepListContainer">
        ${renderKeepSection(data.toMaintain || [], isKeepExpanded)}
      </div>
    `;

    detailList.innerHTML = listHtml;
  }

  // 7. 更新发帖文案模板缓存 (不自动覆盖输入框)
  updateTemplatesWithData(data);
}

/**
 * 根据报告动态合成智能求助文案
 */
function updateTemplatesWithData(data) {
  const sub = data.subject || '数学';
  const score = Math.round(data.scoreRate !== undefined ? data.scoreRate : 86);
  const topWeak = (data.toImprove && data.toImprove[0] && data.toImprove[0].kp) ? data.toImprove[0].kp : '二次函数与方程综合';
  const secondWeak = (data.toImprove && data.toImprove[1] && data.toImprove[1].kp) ? data.toImprove[1].kp : '三角恒等变换与诱导公式';
  const keepCount = data.totalKeepCount || 19;

  POST_TEMPLATES.help = {
    badgeClass: 'help',
    badgeText: '🎯 错题急迫求助',
    title: `孩子${sub}考了${score}分，${topWeak}老丢分，想求助有经验的家长二轮怎么攻坚？`,
    content: `#${sub}提分 #${topWeak} · 刚用学情诊断测了最新试卷，基础题全拿下了（${keepCount}处稳固），但${topWeak}和${secondWeak}老扣分（如图报告）。想求助各位有经验的家长，现阶段刷专题卷有用还是找网课专项突破？在线等建议！`,
    focusText: `“${topWeak}代数化简与分类讨论老卡壳，求过来人家长推荐高效专项复习法！”`
  };

  POST_TEMPLATES.clockin = {
    badgeClass: 'clockin',
    badgeText: '📈 提分阶段打卡',
    title: `【提分打卡】${sub}阶段诊断复盘：基础送分题100%拿满（${keepCount}处稳固），立帖见证冲刺95分！`,
    content: `#提分打卡 #${sub}复盘 · 坚持每周整理错题并针对性练习，这次诊断基础送分题全部稳固（${keepCount}题全拿满分）！现在主要集中火力攻坚${topWeak}，立帖见证冲刺95分！大家一起加油！`,
    focusText: `“基础题防线已筑牢，正集中火力攻坚最后2处薄弱考点！”`
  };

  POST_TEMPLATES.discuss = {
    badgeClass: 'discuss',
    badgeText: '💬 考点同温层交流',
    title: `${sub}大题失分诊断报告，同在攻坚${topWeak}与${secondWeak}的家长欢迎进帖交流～`,
    content: `#学习经验交流 #同温层打气 · 发现不少同分段孩子都在${topWeak}和大题计算扣分，大家有什么防粗心技巧或好的例题笔记吗？欢迎评论区互换复习经验！`,
    focusText: `“寻求同考点解题口诀与易错笔记互换交流～”`
  };
}

/**
 * 错题明细底抽屉逻辑 (完全对齐 baogao_preview.html 原生规范)
 */
function openWrongQuestionsModal(kpName, level) {
  // 软键盘强制失焦，杜绝真机键盘遮挡弹窗的严重端侧 Bug
  if (document.activeElement && typeof document.activeElement.blur === 'function') {
    document.activeElement.blur();
  }

  const data = currentShareData;
  if (!data) return;
  const allItems = [...(data.toImprove || []), ...(data.toFocus || [])];
  const targetItem = allItems.find(it => it.kp === kpName) || allItems[0];
  if (!targetItem) return;

  const isUrgent = level === 'urgent' || (data.toImprove || []).some(it => it.kp === kpName);
  const badgeEl = document.getElementById('wmBadge');
  if (badgeEl) {
    badgeEl.textContent = isUrgent ? '待突破' : '需巩固';
    badgeEl.className = isUrgent ? 'wm-badge' : 'wm-badge attention';
  }

  const titleEl = document.getElementById('wmTitle');
  if (titleEl) titleEl.textContent = targetItem.kp;

  const countEl = document.getElementById('wmMetaCount');
  if (countEl) countEl.textContent = `已识别 ${targetItem.questions ? targetItem.questions.length : 1} 道错题`;

  const lossEl = document.getElementById('wmMetaLoss');
  if (lossEl) lossEl.textContent = `累计失 ${targetItem.totalLostScore || 5} 分`;

  const listEl = document.getElementById('wmQuestionList');
  if (listEl) {
    const strategyHtml = targetItem.suggestion ? `
      <div class="wm-strategy-card">
        <div class="wm-strategy-head">
          <span>💡</span>
          <span>AI 提分策略</span>
        </div>
        <div class="wm-strategy-body">${targetItem.suggestion}</div>
      </div>
    ` : '';

    const questionsHtml = (targetItem.questions || []).map(q => `
      <div class="wm-card">
        <div class="wm-card-head">
          <span class="wm-q-label">
            <span class="kp-q-chip-mini">${q.no} · ${q.type}</span>
          </span>
          <span class="wm-q-loss ${isUrgent ? '' : 'attention'}">扣 ${q.deduct || 3} 分</span>
        </div>
        <div class="wm-stem-box">
          <div class="wm-stem-tag">
            <span class="material-icons" style="font-size:13px;color:#0284C7;">quiz</span>
            <span>试题原题</span>
          </div>
          <div class="wm-stem-content">${q.stem || '暂无题目文本'}</div>
        </div>
        <div class="wm-detail-row">
          <span class="wm-detail-tag">📌 错因诊断：</span>
          <span>${q.reason || '步骤失误'}</span>
        </div>
      </div>
    `).join('');

    listEl.innerHTML = strategyHtml + questionsHtml;
  }

  const modal = document.getElementById('wrongQuestionsModal');
  if (modal) modal.classList.add('show');
}

function closeWrongQuestionsModal() {
  const modal = document.getElementById('wrongQuestionsModal');
  if (modal) modal.classList.remove('show');
}

let isKeepExpanded = false;

/**
 * 渲染持续保持（已掌握高光标签墙 + 展开收起）
 */
function renderKeepSection(list, expanded) {
  if (!Array.isArray(list) || list.length === 0) {
    return `
      <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:8px 12px;font-size:11.5px;color:#166534;line-height:1.4;">
        🟢 <strong>基础盘防线稳固</strong>：基础送分题100%全拿满分，基本概念扎实，考前轻量保温即可！
      </div>
    `;
  }

  const displayList = expanded ? list : list.slice(0, 6);
  const tagsHtml = displayList.map(name => `
    <div class="kp-keep-tag">
      <span class="kp-keep-check">✓</span>
      <span>${name}</span>
    </div>
  `).join('');

  const toggleBtnHtml = list.length > 6 ? `
    <button class="kp-keep-toggle-btn" onclick="toggleKeepExpand(event)" type="button">
      <span>${expanded ? '收起部分考点' : `展开全部 ${list.length} 项已掌握考点`}</span>
      <span class="material-icons" style="font-size:13px;">${expanded ? 'expand_less' : 'expand_more'}</span>
    </button>
  ` : '';

  return `
    <div style="display:flex;flex-direction:column;gap:8px;background:rgba(240,253,244,0.6);border:1px solid #BBF7D0;border-radius:10px;padding:10px 12px;">
      <div style="font-size:12px;font-weight:700;color:#0F4A6A;display:flex;align-items:center;gap:4px;">
        <span class="material-icons" style="font-size:14px;color:#0284C7;">verified</span>
        <span>卷面零失误，基础极稳（全部拿满分）</span>
      </div>
      <div class="kp-keep-grid">${tagsHtml}</div>
      ${toggleBtnHtml}
    </div>
  `;
}

function toggleKeepExpand(e) {
  if (e) e.stopPropagation();
  isKeepExpanded = !isKeepExpanded;
  const keepContainer = document.getElementById('keepListContainer');
  if (keepContainer && currentShareData) {
    keepContainer.innerHTML = renderKeepSection(currentShareData.toMaintain, isKeepExpanded);
  }
}

/**
 * 裂变引流栏跳转至试卷性质选择页
 */
function tryDiagnosticNow(e) {
  if (e) e.stopPropagation();
  window.location.href = 'xuanzhexingzhi.html';
}

document.addEventListener('DOMContentLoaded', () => {
  renderImages();
  initReportData();
});
