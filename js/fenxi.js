function checkReportBanner() {
  const params = new URLSearchParams(window.location.search);
  const urlTask = params.get('task'); // 'running' | 'completed'
  let task = JSON.parse(localStorage.getItem('reportTask') || 'null');

  if (urlTask === 'running') {
    task = { status: 'generating', examName: '2026期中综合考试', subject: '全科 (已完成 3/6 科)' };
    localStorage.setItem('reportTask', JSON.stringify(task));
  } else if (urlTask === 'completed') {
    task = { status: 'completed', examName: '2026期中综合考试', subject: '全科诊断' };
    localStorage.setItem('reportTask', JSON.stringify(task));
  }

  const banner = document.getElementById('reportBanner');
  if (!banner) return;
  if (!task || task.status === 'read') {
    banner.style.display = 'none';
    return;
  }

  banner.style.display = 'flex';
  if (task.status === 'generating') {
    banner.className = 'report-banner generating';
    banner.innerHTML = `
      <div class="rb-icon" style="animation:spin 2s linear infinite"><span class="material-icons">sync</span></div>
      <div class="rb-text">
        <div class="rb-title">${task.examName || '试卷'} 分析中 (已完成 3/6 科)...</div>
        <div class="rb-sub">AI 正在进行跨学科关联建模，点击查看进度</div>
      </div>
      <span class="rb-action" style="font-weight:600">查看进度 <span class="material-icons" style="font-size:14px">chevron_right</span></span>
    `;
    // Auto complete simulation after 7s
    setTimeout(() => {
      task.status = 'completed';
      task.updatedAt = Date.now();
      localStorage.setItem('reportTask', JSON.stringify(task));
      checkReportBanner();
    }, 7000);
  } else if (task.status === 'completed') {
    banner.className = 'report-banner completed';
    banner.innerHTML = `
      <div class="rb-icon"><span class="material-icons" style="color:#2E7D32">check_circle</span></div>
      <div class="rb-text">
        <div class="rb-title" style="color:#1B5E20">🎉 ${task.examName || '期中考试'} 诊断报告已就绪！</div>
        <div class="rb-sub">已生成学科交叉诊断与提分建议，点击立即查看</div>
      </div>
      <span class="rb-action" style="color:#2E7D32;font-weight:600">立即查看 <span class="material-icons" style="font-size:14px">chevron_right</span></span>
    `;
  }
}

function handleBannerClick() {
  const task = JSON.parse(localStorage.getItem('reportTask') || 'null');
  if (!task) return;
  if (task.status === 'generating') {
    window.location.href = 'loading.html';
  } else if (task.status === 'completed') {
    task.status = 'read';
    task.updatedAt = Date.now();
    localStorage.setItem('reportTask', JSON.stringify(task));
    window.location.href = 'dancifenxixq.html';
  }
}

function switchStudent(val) {
  // Switch student logic without annoying toast
  localStorage.setItem('selectedStudentId', val);
}

checkReportBanner();
