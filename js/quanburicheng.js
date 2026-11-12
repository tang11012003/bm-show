const typeConfig = {
  mock_exam: { name: '考试', color: '#FF6D00', icon: 'assignment' },
  registration: { name: '招考', color: '#1565C0', icon: 'how_to_reg' },
  physical_exam: { name: '体检', color: '#43A047', icon: 'local_hospital' },
  custom: { name: '活动', color: '#9C27B0', icon: 'event' },
  gaokao: { name: '高考', color: '#E53935', icon: 'flag' }
};

let allSchedules = JSON.parse(localStorage.getItem('userScheduleEvents') || 'null') || [
  { id: 'ev-1', title: '期中综合考试', date: '2026-08-04', daysLeft: '已完成', type: 'mock_exam', subject: '全科', students: ['张小明'], hasReport: true },
  { id: 'ev-2', title: '期中考前家长会', date: '2026-11-08', daysLeft: '5天后', type: 'custom', subject: '校级', students: ['张小明', '刘小五'] },
  { id: 'ev-3', title: '新高考选科意向预填报', date: '2026-11-11', daysLeft: '8天后', type: 'registration', subject: '系统', students: ['张小明'] },
  { id: 'ev-4', title: '数学专项模考', date: '2026-11-18', daysLeft: '15天后', type: 'mock_exam', subject: '数学', students: ['张小明'] },
  { id: 'ev-5', title: '高三学业水平诊断', date: '2026-12-05', daysLeft: '32天后', type: 'mock_exam', subject: '全科', students: ['张小明'] },
  { id: 'ev-6', title: '高三期末考试', date: '2027-01-15', daysLeft: '73天后', type: 'mock_exam', subject: '全科', students: ['张小明', '刘小五'] }
];

function saveSchedules() {
  localStorage.setItem('userScheduleEvents', JSON.stringify(allSchedules));
}

let currentFilter = 'all';

function renderList() {
  const filtered = currentFilter === 'all' 
    ? allSchedules 
    : allSchedules.filter(s => s.type === currentFilter);

  const container = document.getElementById('scheduleList');
  if (!container) return;
  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:40px 0;color:var(--hint);font-size:13px">暂无相关日程</div>`;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const cfg = typeConfig[item.type] || typeConfig.custom;
    const stdStr = (item.students || ['张小明']).join(', ');
    return `
      <div class="schedule-card" onclick="openScheduleModal('${item.id}')" style="cursor:pointer">
        <div class="sc-icon-box" style="background:${cfg.color}">
          <span class="material-icons">${cfg.icon}</span>
        </div>
        <div class="sc-content">
          <div class="sc-title">${item.title} ${item.hasReport ? '<span style="font-size:10px;background:#E8F5E9;color:#2E7D32;padding:2px 6px;border-radius:4px;margin-left:4px">含报告</span>' : ''}</div>
          <div class="sc-meta">
            <span class="sc-tag">${cfg.name}</span>
            <span style="font-size:11px;color:#888">${stdStr}</span>
            ${item.subject ? `<span style="font-size:11px;color:#888">${item.subject}</span>` : ''}
          </div>
        </div>
        <div class="sc-time">
          <div class="sc-days">${item.daysLeft || '近期'}</div>
          <div class="sc-date">${item.date}</div>
        </div>
      </div>
    `;
  }).join('');
}

function filterType(type, btn) {
  currentFilter = type;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderList();
}

let activeEditId = null;

function openScheduleModal(id) {
  activeEditId = id || null;
  const item = id ? allSchedules.find(s => s.id === id) : null;
  const isEdit = Boolean(item);

  const titleVal = item ? item.title : '';
  const dateVal = item ? item.date : new Date().toISOString().slice(0, 10);
  const typeVal = item ? item.type : 'mock_exam';
  const selectedStudents = item ? (item.students || ['张小明']) : ['张小明'];

  const modal = document.createElement('div');
  modal.id = 'scheduleModal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)';
  modal.innerHTML = `
    <div style="background:#fff;border-radius:18px;padding:22px;width:90%;max-width:360px;box-shadow:0 12px 36px rgba(0,0,0,0.18)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="font-size:17px;font-weight:700;color:#1A1A1A">${isEdit ? '编辑日程' : '新增日程'}</h3>
        <span class="material-icons" onclick="closeScheduleModal()" style="cursor:pointer;color:#999">close</span>
      </div>

      <div style="margin-bottom:12px">
        <label style="display:block;font-size:12px;font-weight:600;color:#666;margin-bottom:4px">日程名称 *</label>
        <input id="modalTitle" value="${titleVal}" style="width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:10px;font-size:14px;box-sizing:border-box" placeholder="请输入日程名称">
      </div>

      <div style="margin-bottom:12px">
        <label style="display:block;font-size:12px;font-weight:600;color:#666;margin-bottom:4px">日期 *</label>
        <input id="modalDate" type="date" value="${dateVal}" style="width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:10px;font-size:14px;box-sizing:border-box">
      </div>

      <div style="margin-bottom:12px">
        <label style="display:block;font-size:12px;font-weight:600;color:#666;margin-bottom:4px">绑定学生 (可多选)</label>
        <div style="display:flex;gap:8px;margin-top:4px" id="modalStudentChips">
          <label style="display:flex;align-items:center;gap:4px;background:${selectedStudents.includes('张小明')?'#FFF0EB':'#F5F5F5'};color:${selectedStudents.includes('张小明')?'#E6431A':'#333'};padding:6px 12px;border-radius:20px;font-size:13px;cursor:pointer;border:1px solid ${selectedStudents.includes('张小明')?'#FFCCBC':'#E0E0E0'}">
            <input type="checkbox" value="张小明" ${selectedStudents.includes('张小明')?'checked':''} onchange="toggleModalChip(this)" style="display:none">
            <span>张小明 (高三)</span>
          </label>
          <label style="display:flex;align-items:center;gap:4px;background:${selectedStudents.includes('刘小五')?'#FFF0EB':'#F5F5F5'};color:${selectedStudents.includes('刘小五')?'#E6431A':'#333'};padding:6px 12px;border-radius:20px;font-size:13px;cursor:pointer;border:1px solid ${selectedStudents.includes('刘小五')?'#FFCCBC':'#E0E0E0'}">
            <input type="checkbox" value="刘小五" ${selectedStudents.includes('刘小五')?'checked':''} onchange="toggleModalChip(this)" style="display:none">
            <span>刘小五 (高一)</span>
          </label>
        </div>
      </div>

      <div style="margin-bottom:16px">
        <label style="display:block;font-size:12px;font-weight:600;color:#666;margin-bottom:4px">日程性质</label>
        <select id="modalType" style="width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:10px;font-size:14px;box-sizing:border-box">
          <option value="mock_exam" ${typeVal==='mock_exam'?'selected':''}>模拟考试 (关联诊断报告)</option>
          <option value="custom" ${typeVal==='custom'?'selected':''}>日常活动 / 家长会</option>
          <option value="registration" ${typeVal==='registration'?'selected':''}>招考报名 / 选科填报</option>
          <option value="volunteer" ${typeVal==='volunteer'?'selected':''}>志愿填报</option>
        </select>
      </div>

      <div style="display:flex;gap:10px;justify-content:space-between;align-items:center;margin-top:20px">
        <div>
          ${isEdit ? `<button onclick="confirmDeleteSchedule('${id}')" style="padding:9px 14px;border-radius:10px;border:1px solid #FFCDD2;background:#FFEBEE;font-size:13px;color:#D32F2F;cursor:pointer;font-weight:600">删除</button>` : ''}
        </div>
        <div style="display:flex;gap:10px">
          <button onclick="closeScheduleModal()" style="padding:9px 16px;border-radius:10px;border:1px solid #ddd;background:#fff;font-size:14px;color:#666;cursor:pointer">取消</button>
          <button onclick="saveScheduleModal()" style="padding:9px 18px;border-radius:10px;border:none;background:#E6431A;color:#fff;font-size:14px;font-weight:600;cursor:pointer">保存</button>
        </div>
      </div>
    </div>
  `;
  modal.addEventListener('click', function(e) { if (e.target === modal) closeScheduleModal(); });
  document.body.appendChild(modal);
}

window.toggleModalChip = function(input) {
  const label = input.parentElement;
  if (input.checked) {
    label.style.background = '#FFF0EB';
    label.style.color = '#E6431A';
    label.style.borderColor = '#FFCCBC';
  } else {
    label.style.background = '#F5F5F5';
    label.style.color = '#333';
    label.style.borderColor = '#E0E0E0';
  }
};

function closeScheduleModal() {
  const m = document.getElementById('scheduleModal');
  if (m) m.remove();
}

function saveScheduleModal() {
  const title = document.getElementById('modalTitle').value.trim();
  const date = document.getElementById('modalDate').value.trim();
  const type = document.getElementById('modalType').value;
  const checkedBoxes = Array.from(document.querySelectorAll('#modalStudentChips input[type="checkbox"]:checked'));
  const students = checkedBoxes.map(b => b.value);

  if (!title) { alert('请输入日程名称'); return; }
  if (!date) { alert('请选择日程日期'); return; }
  if (students.length === 0) students.push('张小明');

  if (activeEditId) {
    const item = allSchedules.find(s => s.id === activeEditId);
    if (item) {
      item.title = title;
      item.date = date;
      item.type = type;
      item.students = students;
    }
  } else {
    allSchedules.unshift({
      id: 'ev-' + Date.now(),
      title,
      date,
      type,
      subject: type === 'mock_exam' ? '全科' : '',
      students,
      daysLeft: '近期',
      hasReport: false
    });
  }

  saveSchedules();
  closeScheduleModal();
  renderList();
}

function confirmDeleteSchedule(id) {
  const item = allSchedules.find(s => s.id === id);
  if (!item) return;

  const isExam = item.type === 'mock_exam' || item.title.includes('考') || item.hasReport;
  if (isExam) {
    const confirmModal = document.createElement('div');
    confirmModal.id = 'delConfirmModal';
    confirmModal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:1100;display:flex;align-items:center;justify-content:center';
    confirmModal.innerHTML = `
      <div style="background:#fff;border-radius:16px;padding:24px;width:86%;max-width:320px;text-align:center;box-shadow:0 12px 32px rgba(0,0,0,0.25)">
        <div style="width:48px;height:48px;border-radius:50%;background:#FEECEB;color:#E6431A;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">
          <span class="material-icons" style="font-size:28px">warning</span>
        </div>
        <div style="font-size:16px;font-weight:700;color:#1A1A1A;margin-bottom:8px">确定删除此考试日程吗？</div>
        <div style="font-size:13px;color:#666;line-height:1.5;margin-bottom:20px">
          「<strong>${item.title}</strong>」关联重要考试诊断与提分计划，删除后相关考前提醒将失效！
        </div>
        <div style="display:flex;gap:10px">
          <button onclick="document.getElementById('delConfirmModal').remove()" style="flex:1;padding:10px;border-radius:10px;border:1px solid #ddd;background:#fff;font-size:14px;color:#666;font-weight:500;cursor:pointer">取消</button>
          <button onclick="executeDeleteSchedule('${id}')" style="flex:1;padding:10px;border-radius:10px;border:none;background:#D32F2F;color:#fff;font-size:14px;font-weight:600;cursor:pointer">确认删除</button>
        </div>
      </div>
    `;
    document.body.appendChild(confirmModal);
  } else {
    executeDeleteSchedule(id);
  }
}

function executeDeleteSchedule(id) {
  const conf = document.getElementById('delConfirmModal');
  if (conf) conf.remove();
  allSchedules = allSchedules.filter(s => s.id !== id);
  saveSchedules();
  closeScheduleModal();
  renderList();
}

function addEvent() {
  openScheduleModal();
}

window.openScheduleModal = openScheduleModal;
window.closeScheduleModal = closeScheduleModal;
window.saveScheduleModal = saveScheduleModal;
window.confirmDeleteSchedule = confirmDeleteSchedule;
window.executeDeleteSchedule = executeDeleteSchedule;
window.filterType = filterType;
window.addEvent = addEvent;

renderList();
