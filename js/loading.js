const steps = [
  '正在提取错题知识点...',
  '正在匹配新课标考纲知识图谱...',
  '正在进行跨学科关联诊断...',
  '正在生成薄弱题型提分建议...',
  '正在合成完整诊断报告...'
];

let currentStep = 0;
let progress = 0;
let completed = false;
let bgMode = false;

const taskInfo = JSON.parse(localStorage.getItem('reportTask') || 'null');
const examName = taskInfo ? (taskInfo.examName || '期中综合考试') : '期中综合考试';
const subject = taskInfo ? (taskInfo.subject || '全科 (含语数英物)') : '全科 (含语数英物)';

function renderLoading() {
  document.getElementById('pageBody').innerHTML = `
    <div class="loader-ring">
      <div class="loader-icon"><span class="material-icons">psychology</span></div>
    </div>
    <div class="loading-title">${examName}</div>
    <div class="loading-step" id="stepText">${steps[0]}</div>
    <div class="loading-sub">AI 正在深度分析您的试卷，预计需要 10~30 秒</div>
    <div class="progress-wrap">
      <div class="progress-track"><div class="progress-fill" id="progressBar" style="width:0%"></div></div>
      <div class="progress-label"><span id="progressPct">0%</span><span>预计剩余 ~15s</span></div>
    </div>
    <div class="action-group">
      <button class="btn btn-outline" onclick="goUploadMore()">
        <span class="material-icons" style="font-size:18px">add_a_photo</span>继续补充其他科目
      </button>
      <button class="btn btn-ghost" onclick="goHome()" style="background:#FFF0EB;color:#E6431A;font-weight:600;border:1px solid #FFCCBC">
        <span class="material-icons" style="font-size:16px">home</span>进入后台分析，先回首页
      </button>
    </div>
  `;
  startProgress();
}

function renderComplete() {
  document.getElementById('pageBody').innerHTML = `
    <div class="done-icon"><span class="material-icons">check_circle</span></div>
    <div class="loading-title">全科诊断报告已生成</div>
    <div style="font-size:13px;color:var(--text3);margin-bottom:24px">${examName} · 覆盖4门学科</div>
    <div class="action-group">
      <button class="btn btn-primary" onclick="viewReport()">
        <span class="material-icons" style="font-size:18px">description</span>查看诊断报告
      </button>
      <button class="btn btn-outline" onclick="goUploadMore()">
        <span class="material-icons" style="font-size:18px">add_a_photo</span>补充其他学科试卷
      </button>
      <button class="btn btn-ghost" onclick="goHome()">返回首页</button>
    </div>
  `;
}

function startProgress() {
  const interval = setInterval(() => {
    if (bgMode) { clearInterval(interval); return; }
    progress += Math.random() * 9 + 5;
    if (progress >= 100) progress = 100;

    const stepIdx = Math.min(Math.floor(progress / 20), steps.length - 1);
    if (stepIdx !== currentStep) {
      currentStep = stepIdx;
      const el = document.getElementById('stepText');
      if (el) el.textContent = steps[currentStep];
    }

    const bar = document.getElementById('progressBar');
    const pct = document.getElementById('progressPct');
    if (bar) bar.style.width = progress + '%';
    if (pct) pct.textContent = Math.round(progress) + '%';

    if (progress >= 100) {
      clearInterval(interval);
      completed = true;
      updateTaskState('completed');
      setTimeout(() => renderComplete(), 500);
    }
  }, 450);
}

function goUploadMore() {
  setBgMode();
  window.location.href = 'scshijuan.html';
}

function goHome() {
  setBgMode();
  window.location.href = 'fenxi.html?task=running';
}

function viewReport() {
  updateTaskState('read');
  window.location.href = 'dancifenxixq.html';
}

function setBgMode() {
  bgMode = true;
  if (!completed) {
    updateTaskState('generating');
  }
}

function updateTaskState(status) {
  const task = JSON.parse(localStorage.getItem('reportTask') || '{}');
  task.status = status;
  task.examName = examName;
  task.subject = subject;
  task.updatedAt = Date.now();
  localStorage.setItem('reportTask', JSON.stringify(task));
}

// URL param check
const params = new URLSearchParams(window.location.search);
if (params.get('status') === 'completed' || (taskInfo && taskInfo.status === 'completed')) {
  completed = true;
  renderComplete();
} else {
  renderLoading();
}
